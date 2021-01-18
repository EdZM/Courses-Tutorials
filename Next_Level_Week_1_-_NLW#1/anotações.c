/* Anotações Next Level Week:

    - Pilares do metodo: Foco, Prática e Grupo

    -TypeScript:    javascript com "super poderes", permite incluir tipagens no código, algo que facilita reconhecer 
                    o formato das variáveis, argumentos de funções que eu esteja usando.
        OBS.: pesquise intelliSense

        - usa inferência de tipos, o que indica que na maior parte dos casos o TS reconhece o tipo de dado que estou usando. 
        - pode diminuir a produtividade no começo
        - usar TS NÃO significa transformar o código JS em JAVA ou C#
        - TS é bastante usado sim.
        - TS é baseado em JS, um não substitui o outro.
        - Node só entende JS 

    Aula 1: 
        - criando o server: crie a pasta server e usando o terminal digite: npm init -y (o y evita de perguntar as infos do server)
        - instalação express, que lida com rotas
        - instalação npm install @types/express -D(dependencia de desenvolvimento, que só é usada enquanto estiver desenvolvendo) 
               (a definição de tipos do express não será mais necessária quando a aplicação entrar em produção)     
        - instalação npm install ts-node: node para typescript         
        - instalação npm install typescript -D
        - execução do script: npx ts-node <caminho do server>
        - execução do npx tsc(typescript) --init: cria o arquivo de configurações do TS, que define quais features do TS eu desejo usar
        - instalação npm install ts-node-dev -D (para que cada alteração no código não necessite uma interrupção e ativação do server)
        - inclusão do comando npx ts-node-dev src/server.ts no package.json na parte de scripts(não precisa incluir o npx)
            == use npm run <nome_script> para rodar o script

        - React =   biblioteca(ou até framework, por vezes) para construção de interfaces,
                    que é usada para construção de SPAs(single page applications),
                    o elimina a necessidade de refresh da página toda, e permite 
                    incluir somente o que for necessário a pagina.
            
            > dividido em react, reactJS, react native;
            > nele, TUDO fica dentro do JavaScript
            > faz live reload. A cada alteração no código a página sofre um refresh  
            > fornece: 
                > maior organização do código por componentização da aplicação(retorna componentes para ela que podem ser elementos HTML).
                > divisão de responsabilidades: back end fica com a regra de négocio e o front com a interface
                > uma API, múltiplos clientes

        - criação do projeto em react com template para TS: npx create-react-app web --template=typescript    


    Aula 2: 

        - instalação npm install knex(para o banco de dados)
        knex:
            - cuidado com a ordem das tabelas contidas na pasta migrations,
            porque nao posso criar a tabela 02 sem antes ter a 00 e 01.
            - para usar/testar as tabelas criadas use o knexfile:
                - npx knex --knexfile knexfile.ts migrate:latest
                - instale a extensão sqlite no vs code digite crtl+shift+p e digite sqlite e selecione SQLite: Open Database
            
            - seeds: servem para popular as bases de dados com dados iniciais
                - criação da pasta seeds e adição do arquivo create_items.ts;
                - npx knex --knexfile knexfile.ts seed:run

        - CORS: define quais urls/endereços externos tem acesso a minha aplicação
            - instalação npm install cors
            - para resolver a questao de tipos com cors: npm install @types/cors -D
        
        - acesse o unsplash para pegar uma imagem com o tema market


        - caso precise fazer uma query:
            - clique com o botão direito em uma tabela e selecione new query e depois no arquivo que abrir use:
                DELETE FROM point_items;
                DELETE FROM points;
            - ctrl+shift+p : selecione run query   

    Aula 3: 

        - limpeza dos arquivos
        - React pode ser usado para fazer quase qualquer tipo de interface
        - React é feito a partir do JS, então tudo que é mostrado/montado na tela é feito atraves do JS
        - o index.tsx é o primeiro arquivo carregado pelo React
        - Na maioria das vezes o conteudo do projeto está todo dentro da única div do index.html
        - exemplo de uso do emmet no vs code:
            digite: div#app>ul>li*5 e uma div com id=app e uma lista com 5 elementos será criada 
        - JSX: possibilita escrever HTML dentro do JS ou TS
        - arquivos .jsx ou .tsx contem tanto html quanto js ou ts
        
        -* COMPONENTIZAÇÃO: ato de separar a aplicação em partes/blocos menores reutilizáveis e replicáveis
        - Criação de componentes no react: arquivo Header.tsx
        - Propriedades no react: infos que vao dentro dos componentes
        
        - Estados: informações mantidas pelo proprio componente

        - Imutabilidade:    
                        - variavel de estado não pode ser alterada diretamente. 
                            o que pode ser feito é criar um novo estado com as informações que eu quero
                        - gera melhorias de performance da aplicação
        - instalação npm install react-icons
        - instalação npm install react-router-dom
        - instalação npm install @types/react-router-dom -D (durante a produção tudo é convertido para JS, que nao tem tipagem)

        - para os mapas será usado o leaflet que é uma biblioteca opensource de mapas interativos que usa JS
        - instalação npm install react-leaflet 
        - instalação npm install leaflet 

        - instalação npm install axios ==> faz as requisições a api


        - opcionais: 
            - instalação extensão react dev tool: reconhece os sites que usam react
            - instalação extensão wapplyzer
            - fonte fira code (para simbolos no vs code):
                - executar powershell como admin e digitar chocolatey install firacode-ttf
                - ctrl+shift+p -> preferencias e acrescente: 
                        "editor.fontFamily": "Fira Code",
                        "editor.fontLigatures": true,
            
            - pesquise typescript react cheat sheet ==> principais formas de integrar typescript com react

            - criar uma página que mostra que o cadastro foi bem sucedido: FEITO


    Aula 4:



    

*/