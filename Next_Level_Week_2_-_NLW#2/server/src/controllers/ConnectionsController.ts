import {Request, Response} from 'express';
import dbase from '../database/connection';

export default class ConnectionsController {
    

    async index(request: Request, response: Response){
        const totalConnections = await dbase('connections').count('* as total'); //total é uma coluna no retorno 
    
        const { total } = totalConnections[0]; // primeira linha dos registros

        return response.json({total});
    }
    
    async create(request: Request, response: Response){
        const {user_id} = request.body;

        await dbase('connections').insert({
            user_id

        });

        return response.status(201).send();

    }




}  