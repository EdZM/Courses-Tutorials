import express from "express";
import cors from 'cors';
import routes from "./routes";



const app = express(); 

app.use(cors());
app.use(express.json()); // converte para JSON
app.use(routes);


// porta 80 é a padrão por isso ela normalmente nao aparece na URL
app.listen(3333); // localhost:3333



/* metodos http:
    get: buscar infos ==> o browser sempre acessa um endereço usando nas requisições o metodo get 
    put: atualizar infos
    post: criar info nova
    delete: deletar infos existentes
*/

// rotas:endereço ou URL e recursos: parte final do endereço (ex.: /users, /contacts)
// um mesmo recurso pode estar em metodos diferentes

/* parametros: 
    corpo da requisição: request body, dados para criação ou atualização de um registro
    route params: identifica qual recurso eu desejo atualizar ou deletar
    query params(request.query): uso para paginação, filtros e ordenação

*/





