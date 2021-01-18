const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require('http'); // esse módulo já é usado pelo express por baixo dos panos, para fazer com que a aplicação ouça requisições http
                              // Importei isso porque a aplicação terá de entender tanto o protocolo http quanto do protocolo WebSocket
const { setupWebSocket } = require('./websocket'); // Extrai a função setupWebSocket do arquivo websocket.js

const app = express(); //criação da aplicação

// instanciação do servidor.
const server = http.Server(app); // server recebe a extração de um servidor http. Agora tenho um servidor http fora do express

setupWebSocket(server);


// conexao com a base de dados Mongo
mongoose.connect('mongodb+srv://EdZM:edzm@cluster0-uqrxz.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Parte essencial 
// app.use(cors({ origin: 'https://localhost:3000' })); // vai retirar o bloqueio originado pelo fato de as portas do front end e da api serem diferentes
app.use(cors()); // libera o acesso externo para todo tipo de aplicação
app.use(express.json()); // agora todas as requisições que tem o corpo no formato JSON serão entendidas
app.use(routes); //agora todas as rotas da minha aplicação estão cadastradas novamente. Deve vir após o express.json() acima


// Métodos HTTP get, post, put, delete
// - Get: receber uma informação(acessado nativamente pelo browser) ==> uso para listar usuarios por exemplo 
// - Post: criar uma informação ==> adicionar um produto por exemplo
// - Put: editar uma informação
// - Delete: apagar uma informação


// Tipos de parametros
// - Query params: request.query (Filtros, ordenação, paginação, ...) ==> usados na maior parte das vezes com o metodo GET
// - Route params: request.params (Identificar um recurso na alteração ou remoção) ==> usados no metodos delete
// - Body(corpo da requisição): dados para criação ou alteração de um registro (quando crio usuarios por exemplo preciso enviar seus dados pelo corpo da requisicao) ==> mais usado nos metodos post e put


// Buscando uma informação na rota '\' . Entao temos: http://localhost:3333/ 
// app.get('/users', (request, response) => {           // usando arrow function, nao preciso escrever function() {}
//     // return response.send('Hello world');     // retorna uma resposta do servidor na forma de texto    
//     console.log(request.query);
//     return response.json( {message: 'HELLO WORLD FELAS'} ); // objetos podem ser representados por {}
// } ); 


// app.delete('/users/:id', (request, response) => {           // usando arrow function, nao preciso escrever function() {}
//     // return response.send('Hello world');     // retorna uma resposta do servidor na forma de texto
//     //console.log(request.params.id);
//     console.log(request.params);
//     return response.json({ message: 'HELLO WORLD FELAS' }); // objetos podem ser representados por {}
// }); 





//app.listen(3333); // acesso a porta de acesso 3333
server.listen(3333);


// Para executar o servidor digite: node index.js e depois acesse no navegador localhost:3333
// Caso a mensagem de resposta do servidor seja alterada é necessario reiniciar o servidor, pq o node nao fica observando as alterações feitas no codigo
// Dai a necessidade de instalar outra dependencia usando yarn add nodemon -D(dependencia de desenvolvimento, usada somente durante o desenvolvimento da aplicação)
// Agora use yarn nodemon index.js --> para evitar esse trabalho de digitar, foi incluido um script no package.json
// Agora só precisa digitar yarn dev 