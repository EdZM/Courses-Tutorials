//o TS NÃO permite a sintaxe export.default 

import path from 'path';

module.exports = {
    client: 'sqlite3',
    connection: { // faz a conexão com o banco de dados
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite') // padroniza o acesso ao arquivo(varia conforme os SOs)
    },

    migrations:{ // migrations funcionam como um controle de versão do banco de dados
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')

    }, 
    
    seeds: { // seeds populam o banco de dados inicialmente
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')

    },


    useNullAsDefault: true,
};