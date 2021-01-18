import { Request, Response } from 'express'; // importando a conexão com o banco 
import knex from '../database/connection';

class ItemsController {
    async index(request: Request, response: Response) { // o metodo index é usado para listagem, no caso dos itens

        const items = await knex('items').select('*');  // pega todos os itens da tabela items e atribui a variavel
        // processo demorado, por isso o uso do await
        // igual usar SELECT *(tudo) FROM items

        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`
            };
        });

        return response.json(serializedItems);

    }

}

export default ItemsController;