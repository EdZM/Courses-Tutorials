// a lib em TS precisa vir com a definição de tipos
// ao usar npm install @types/express eu já habilito a inteligencia da IDE, ou seja:
//      por exemplo, ao digitar app. irá aparecer todos os métodos disponíveis a serem usados.

import express from 'express';
import routes from './routes';
import path from 'path';
import cors from 'cors';

const app = express();
app.use(cors()); // sem incluir nada como parametro, ele permite que todas as urls acessem essa aplicação
app.use(express.json()); // inclui o "plugin" que permite que o corpo das requisições recebidas pelo express sejam entendidas em JSON
app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads') )) // a função static é usada para servir arquivos de forma direta, com pdfs, imagens, word, ...


app.listen(3333);


// ANOTAÇÕES INICIAIS DA AULA 2:

//import express from 'express';
//import routes from './routes';

//const app = express();
//app.use(express.json()); // inclui o "plugin" que permite que o corpo das requisições recebidas pelo express sejam entendidas em JSON

// // rota == endereço completo da requisição, costumam ser muito semanticas(é simples entender o que está escrito nelas)
// // recurso == qual entidade estamos acessando do sistema. ex.: /users

// // métodos http:
// //  GET: buscar uma ou mais informações do back-end
// //  POST: criar nova informação no back end
// //  PUT: atualizar uma informação existente no back end
// //  DELETE: apagar uma informação do back end

// // Exemplo de uso metodos http:
// // POST http://localhost/users ==> criando um novo usuário 
// // GET http://localhost/users ==> buscando todos os usuários 
// // GET http://localhost/users/<id> ==> buscando um usuário com id de <id> 


// const users = [
//     'Talion',
//     'Karist',
//     'Ignist',
//     'Ulver'
// ];


// // Toda vez que o navegador acessa uma rota ele sempre usa uma requisição do tipo get, já que é a única que ele pé capaz de fazer
// app.get('/users', (request, response) => {  // a função é acessada logo ao entrar na rota localhost:3333/users. o /users é o recurso.
//     //console.log('shurables');               // request obtem dados da requisição que esta ocorrendo na aplicação
      
//     const search = String(request.query.search1); // parametro search1 pode aparecer varias vezes na url, o que pode fazer com que isso seja interpretado como ARRAY

//     // caso o search1 exista, search existirá e daí a função filter é chamada. Caso contrario filteredUsers só recebe o array de usuários
//     // do jeito abaixo não estou considerando case sensitive, então buscar com letra maiuscula ou minuscula terá diferença
//     //  const filteredUsers = search ? users.filter(user => user.includes(search)): users; //filter retorna true ou false

//     // Da forma case insensitive fica assim: 
//     const filteredUsers = search ? users.filter(user =>         
//         user.toUpperCase().includes(search.toUpperCase())

//     ) : users; //filter retorna true ou false
    
//     // response devolve uma resposta a requisição no formato JSON
//     return response.json(filteredUsers);                                        
// });


// // TIPOS de parametros:
// //  request params: parametros que vem na própria rota que identifica um recurso
// //                 é usado quando desejo listar/criar/deletar um elemento em específico
// //  query param: parametros opcionais usados para filtros, paginação
// //  request body: parametros para criação/atualização de informações. Eles devem estar no request body

// app.get('/users/:user_id', (request, response) => { // o : indica que a seguir virá um argumento
    
//     const id = Number(request.params.user_id); // id vem como string entao preciso transformá-lo em numero 
//     const user = users[id];

//     return response.json(user);
// });


// app.post('/users', (request, response) =>{

//     const data = request.body;
//     console.log(data); // não funciona se nao disser pro express que eu quero que ele entenda o corpo da requisição como JSON

//     const user = {
//         name: data.name,
//         email: data.email,
//     };
    
//     return response.json(user);

// });



// app.listen(3333);