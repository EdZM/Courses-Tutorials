import {Request, Response} from 'express'; //usado para especificar os tipos das variaveis request e response

import dbase from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {
    
    // listagem de aulas (sempre chamada de index)
    async index(request: Request, response: Response){ 
        const filters = request.query;

        const week_day = filters.week_day as string;
        const subject = filters.subject as string;
        const time = filters.time as string;

        if (!filters.week_day || !filters.subject|| !filters.time){ // Caso nenhum dos tres seja informado uma mensagem de erro é apresentada
            return response.status(400).json({
                error: 'Missing filters to search classes'
            });
        }

        const timeInMinutes = convertHourToMinutes(time);

        // query para buscar no banco de dados
        const classes = await dbase('classes') 
            .whereExists(function(){ // verifica se existe um horario disponivel que bate com a variavel timeInMinutes(age como um FILTRO)
                this.select('class_schedule.*')                                    
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`') // mais indicado quando usado dentro do whereExists
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes]) // é esperado que o prof inicie a aula no seu horario minimo pelo menos
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes]) // nao se pode marcar um horario que seja o de termino do prof
            })
            .where('classes.subject','=', subject) // busca por campos onde classes.subject == subject
            .join('users', 'classes.user_id', '=', 'users.id' ) // inner join que junta com a tabela users e nela busca campos onde classes.user_id == users.id
            .select(['classes.*','users.*']) // seleciona TODOS os dados de ambas as tabelas para serem retornados na query do banco de dado

        return response.json(classes);    

    };
    
    
    // request: obtem infos sobre a requisição como cabeçalho e corpo  
    // criação de uma aula
    async create(request: Request, response: Response) { // precisa ser assincrona porque cada operação feita no banco demora um tempo para ocorrer

        const {
            name,       // desestruturação
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;

        const trx = await dbase.transaction();// uma transaction garante que as operações sejam feitas ao mesmo tempo e no caso
        // de haver erro em uma delas, todas as demais serem desfeitas.

        try {
            // query para criar um usuario no banco
            const insertedUsersIds = await trx('users').insert({ // inserção na tabela de usuarios do banco(pode inserir mais de um usuario ao mesmo tempo)

                // colunas a serem inseridas na tabela dos users
                name,  // short sintax: o nome da propriedade do objeto == valor (forma resumida de name:name)
                avatar,
                whatsapp,
                bio,
            }); // retorna a lista ids dos usuarios inseridos


            const user_id = insertedUsersIds[0];


            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id,
            });

            const class_id = insertedClassesIds[0];

            // para armazenar os valores de from e to na tabela vou converter eles para minutos antes
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => { // o map percorre uma lista e faz alguma operação nela
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                };
            })

            await trx('class_schedule').insert(classSchedule);

            await trx.commit(); // valida e faz as operações de fato no banco de dados

            return response.status(201).send(); // 201 == criado com sucesso

        } catch (error) {

            console.log(error);

            await trx.rollback(); // em caso de erro TODAS as alterações no banco são desfeitas
            return response.status(400).json({ // 400 == Bad Request
                error: 'Unexpected error while creating new class'
            })
        }
    }
}