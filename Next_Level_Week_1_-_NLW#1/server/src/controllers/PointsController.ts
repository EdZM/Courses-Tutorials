import knex from '../database/connection';
import { Request, Response } from 'express';


class PointsController {
    
    async index(request: Request, response: Response){
        // 3 filtros: cidade, uf, itens. De onde vou pegar esses filtros? Query params
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',') // separa a string em strings por vírgula
            .map(item => Number(item.trim()));  // retira eventuais espaços a direita ou esquerda das vírgulas
                                                // o number() garante que parsed items seja um array de números
        
        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id',)
            .whereIn('point_items.item_id', parsedItems)  // dentre todos os pontos estou selecionando aqueles que tem point_items.item_id igual a pelo menos um dos elementos de parsedItems
            .where('city', String(city)) 
            .where('uf', String(uf)) 
            .distinct() // garante que os pontos retornados sejam distintos               
            .select('points.*') // seleciona apenas todos os dados da tabela points e não da tabela em que o join foi feito


        return response.json(points);
    }
        
    async show (request: Request, response: Response){
        const { id } = request.params;  // desestruturação equivalente a fazer const id = request.params.id
        const point = await knex('points').where('id', id).first();

        if(!point){
            return response.status(400).json({ message: 'Point not found.'});
        }


        /*
            -> a operação na variavel items é semelhante ao que ocorre logo abaixo
            a query abaixo retorna todos os itens que estão relacionados a um único ponto
            
            SELECT * FROM items
            JOIN point_items ON items.id = point_items.item_id
            WHERE point_items.point_id = {id}
        */
        
        const items = await knex('items')
            .join('point_items', 'items.id', '=','point_items.item_id')
            .where('point_items.point_id', id)
            .select('title');

        return response.json({point, items});
    }
   
    async create(request: Request, response: Response) { //criação de um novo ponto de coleta
        const { // desestruturação usada para quando eu já sei o que quero extrair
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items, // não é um campo da tabela points
        } = request.body;


        const trx = await knex.transaction();

        const point = {
            image: 'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,   // name é igual à propriedade name do objeto, por isso posso colocar name, 
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        };

        const insertedIds = await trx('points').insert(point); //retorna os ids dos registros que foram inseridos

        const point_id = insertedIds[0];

        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id,
            };
        });


        await trx('point_items').insert(pointItems); //com a transaction se essa query falhar a anterior deve falhar tambem


        await trx.commit(); //garante que os inserts sejam feitos no banco de dados

        return response.json({ 
            id: point_id,
            ...point  //spread operator: pega todas as informações do objeto point e retorna em outro
        
        });


    }
}

export default PointsController;