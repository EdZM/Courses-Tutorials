/*  ANOTAÇÕES NEXT LEVEL WEEK 2:
    
DIA 1:

        ***3 pilares do método de aprendizado: 
        foco    ==> ver qual das tecnologias estão sendo mais usadas e priorizá-las, espelhando-se em quem já tem mais experiencia com elas;
                ==> o quanto sou bom com determinada tecnologia?


        prática ==> me fornece mais segurança para saber como e quando usar a teoria que eu aprendi de forma eficiente

        grupo ==> compartilhar de aprendizado, pedir ajuda é parte fundamental desse método

        *** ReactJS ==> ferramenta/biblioteca para a construção e controle/manipulação de interfaces (ex.: interface do notion) usando a ideia de SPA, que melhora a UX
                ==> envolve html, css, JS
                ==> usa metodologia SPA (single page application): quando o user precisa trocar de tela, a UNICA coisa que precisa 
                                                                mudar na pagina são as coisas que sao diferentes de uma tela para outra
                                                                (é por isso que tudo o que muda tem a ver com estados e coisas assim ???)

                ==> subdividido em pacotes: React, ReactNative, ReactTV(OSs de TVs), ReactVR

                ==> A dependencia React: 
                        - parte principal da lib do react, que contem a logica de como montar a interface
                        - usado em TODOS os ambientes (web, mobile, ios, android, tv,...)
                        - *OBS: No React JS, há a React DOM, lib que diz ao React para criar interfaces usando HTML.
                        - *OBS: No React Native, há a React Native, lib que diz ao React para construir interfaces usando a propria interface NATIVA do dispositivo(IOS, android).


        ==> inicializando a aplicação web com yarn e npx:
                yarn create react-app web --template typescript ==> usaremos TS, util para fazer a tipagem do codigo e aumentar a produtividade, em conjunto com o editor de codigo

                npx create-react-app web --template typescript

                
        ==> Mobile first: 
                - metodologia na qual uma aplicação é desenvolvida inicialmente pensando como ela seria para mobile e depois adaptá-la para web
                (isso me força a inserir responsividade, bem como outras coisas importantes)

        OBS.: Normalmente os nomes das funções e das variaveis são escritas em CamelCase

        ==> Instalação router dom: (módulo mais usado para se fazer navegação e que controla qual componente está ativo na tela baseado no endereço acessado):
                yarn add react-router-dom
                
                depois instale com a tipagem: yarn add @types/react-router-dom -D


DIA 2:

        OBS.: lembre-se que http tem cabeçalho e corpo 

        -> unica coisa capaz de entender html é o NAVEGADOR. Coisas como react, swift, flutter, nao conseguem

        -> API REST: - aqui o backend retorna apenas os dados na forma de JSON, ao contrario do modelo full MVC, 
                        que retorna um HTML completo.
                     - o JSON é uma estrutura compreensivel por todas as linguagens e tecnologias, sendo que serão elas que irão montar o HTML
                     - vai ser o front que ira determinar como a interface sera contruida   


        -> node.js tem arquitetura Non-blocking-IO: permite assincronismo, realizar uma ação sem precisar esperar uma anterior finalizar 
                -> pesquisar +caracteristicas do NODE.js
                        streams: permite o consumo de dados gradualmente(ex: ler um arquivo linha a linha e processá-lo sem precisar esperar o fim da leitura)
                        worker-threads: permite o uso dos cores do processador para fazer operações distintas
  

        DEPENDENCIAS INSTALADAS
                -> iniciar o server (cria o package.json)
                        yarn init -y ou npm init -y

                -> instalar o typescript e inicializa-lo
                        yarn add typescript -D

                        yarn tsc --init

                        *mudança no arquivo tsconfig.json, target:"es2017" <== especifica o suporte e converte as funcionalidades que sao aceitas ate 2017(até o JS 2017)

                -> yarn add ts-node-dev -D: cria um servidor e observa se houve mudanças nele. Se houver, ele o reseta

                -> yarn add express : microframework traz algumas funcionalidades prontas
                -> yarn add @types/express -D
                -> yarn add cors: permite que aplicações em diferentes endereços acessem a minha API 
                        nao esqueça de instalar: yarn add @types/cors -D


        -> package.json => start: tsnd --transpile-only --ignore-watch node_modules --respawn src/server.ts                
                                        -> transpile-only: converte o codigo de TS para JS ==> acelera o processo de execução
                                        -> ignore watch: impede conversão de codigos presentes na pasta node_modules
                                        -> respawn: toda vez que o codigo mudar a aplicação reseta de forma automática

        -> usaremos o banco de dados SQLite
                instalação: yarn add knex sqlite3

        -> Knex roda em JS nao em TS, por isso cria-se o arquivo knexfile.ts


        -> migrations: controlam a versão do banco de dados


        -> o modo mais rapido de fazer alterações acidentais no banco é deletar o database.sqlite e recriá-lo com a alteração desejada
        -> se a base de dados nao abrir tente dar reload window no vscode
        -> se mesmo assim continuar nao abrindo outras tabelas, faça:
                - va no sqlite explorer e clique com o botao direito em database.sqlite e selecione New query
                - digite no arquivo que abrir SELECT * FROM 'nome_da_tabela'
                - CTRL + SHIFT + P e selecione run query

DIA 3:

        DEPENDENCIAS INSTALADAS:
                yarn add axios ==> permite consumir APIs externas, fazendo requisições de forma semelhante ao insomnia

DIA 4:

    -> async storage: será usado o banco de dados do celular para funcionalidades como a de favoritos.
    -> inicializando o expo: 
          expo init mobile e escolha o template blank typescript
          yarn start => abrirá uma aba no navegador onde é possivel ver os logs da aplicação 

          obs.: o celular e desktop devem estar conectados a mesma rede

    -> particularidades do RNative com R: 
        - reaproveitamento de 90% da base de conhecimento do React
        
        - semelhanças: 
              -componentes escritos das mesma forma que na web 

        -diferenças:
              - nao posso usar componentes do HTML como div, section, main, mas sim os pre criados pelo RNative, como view, text,...


*/