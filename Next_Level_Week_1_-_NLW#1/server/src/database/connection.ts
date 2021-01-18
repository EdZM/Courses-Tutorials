import knex from 'knex';
import path from 'path';

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite') // padroniza o acesso ao arquivo(varia conforme os SOs)
    },
    useNullAsDefault: true,
});

export default connection; // com isso consigo fazer a conexão com o banco de dados


// Migrations = historico do banco de dados

// O knex usa as migrations para facilitar o trabalho em cima de um mesmo banco de dados por mais de uma pessoa