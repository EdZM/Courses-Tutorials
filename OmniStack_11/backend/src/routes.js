const express = require('express');
const OngController = require('./controllers/Ongcontroller');
const IncidentController = require('./controllers/IncidentController');

const routes = express.Router(); // desacopla o módulo router do express e o atribui a routes

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create); 

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);


module.exports = routes;