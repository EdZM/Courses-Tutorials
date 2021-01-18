import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router(); // modulo de roteamento do express
const classesControllers = new ClassesController();
const connectionsControllers = new ConnectionsController();



routes.post('/classes', classesControllers.create);
routes.get('/classes', classesControllers.index);
routes.post('/connections', connectionsControllers.create);
routes.get('/connections', connectionsControllers.index);

export default routes;