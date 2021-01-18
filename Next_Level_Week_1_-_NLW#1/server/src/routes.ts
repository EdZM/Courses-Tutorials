import express, { request, response } from 'express';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';


const routes = express.Router(); // desacopla as rotas do arquivo server
const pointsController = new PointsController();
const itemsController = new ItemsController();


routes.get('/items', itemsController.index );

routes.post('/points', pointsController.create);
routes.get('/points/', pointsController.index); // index para listar varios itens
routes.get('/points/:id', pointsController.show); // request params



export default routes;

// Controllers geralmente tem as seguintes funções: index(listagem), show(exibir um unico registro), create/store, update, delete/destroy
// para deixar ainda mais organizado podia usar ainda:
//  Service Pattern
//  Repository Pattern