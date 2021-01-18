/*

Aula 2 - 
    rota: conjunto completo envolvendo a url + recurso;
    recurso: tudo que vem após a / da url. Geralmente associado a alguma tabela do banco.

    **tipos de parametros:
        - query params: parametros nomeados enviados na rota apos "?" usados para filtros e paginação (Ex.: no insomnia insira depois da url: /users?name=Eduardo ou /users?page=2&name=Eduardo&idade=24)
        - route params: usados para identificar recursos (Ex.: /users/:id ==> uso: /users/1). OBS.: nao devo mandar mais parametros do que esta sendo esperado
        - request body: corpo da requisição, usado para criar ou alterar recursos.

    - instalação nodemon: npm install nodemon -D (o -D coloca o nodemon como depencia de desenvolvimento(devdependency), que só será usada durante a implementação,
      ao inves de uma dependencia geral, já que quando a aplicação estiver rodando no navegador não será necessario o monitoramento de mudanças feito pelo nodemon

    - bancos de dados:
        - SQL(formato usado para se comunicar com o banco de dados): 
            - MySQL, SQlite(usaremos esse), PostgreSQL, Microsoft SQL server
            - relacional
            - mais usado
            - permite um controle maior da estrutura do banco
            - linguagem universal
            - Ex.: Driver: query sql ==> SELECT * FROM users (seleciona todos os campos da tabela users)
                    -> usaremos o driver sqlite3

                   Query Builder ==> table('users').select('*').where(); (mesma função do comando acima)
                    -> a forma acima é aceita por qualquer banco sql
                    -> usaremos o query builder: knex.js 
                    -> depois de instalado npx knex init (npx executa um pacote e nao instala ele): cria um knexfile.js
                       que armazena as configurações de acesso ao banco de dados para cada ambiente da aplicação como o de desenvolvimento(só usaremos esse aqui), de produção e de staging

        - noSQL: 
            -MongoDB, CouchDB, ...
            -não relacional
            -baixa estruturação dos dados


    - possíveis entidades: 
        - ONGs;  ==> npx knex migrate:make create_ongs -> cria a tabela ongs
        - casos(incident)
    
    - funcionalidades:
        - login da ONG
        - logout da ONG
        - cadastro da ONG
        - cadastro de casos 
        - deletar casos
        - listar casos específicos de uma ONG
        - listar todos os casos
        - entrar em contato com a ONG

    - migrations: pasta que basicamente faz o controle de versão do banco de dados. Util para o caso uma nova tabela seja adicionada em algum momento
        criação das ongs -> comando: npx migrate:make create_ongs
        para criar de fato a tabela: npx migrate:latest

        criação dos incidentes -> comando: npx knex migrate:make create_incidents

*/