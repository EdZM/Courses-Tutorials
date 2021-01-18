// Arquivo de conexao com o banco
import knex from 'knex';
import path from 'path';


// cria a conexão com o banco(ainda é necessario criar suas tabelas)
const dbase = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true, // quando nao conseguir definir um campo do banco de dados atribua NULL a ele


});

export default dbase;

