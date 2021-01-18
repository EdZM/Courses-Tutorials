const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development); // carrega a conexão de desenvolvimento presente no knexfile

module.exports = connection;