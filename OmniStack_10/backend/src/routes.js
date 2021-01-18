const { Router } = require('express'); // importando módulos de roteamento

const devController = require('./controller/Devcontroller');
const searchController = require('./controller/SearchController');

const routes = Router();

// rota para cadastrar devs
routes.get('/devs', devController.index);
routes.post('/devs', devController.store); 
routes.get('/search', searchController.index); 

module.exports = routes; //exportando as rotas para que a minha aplicação as conheça