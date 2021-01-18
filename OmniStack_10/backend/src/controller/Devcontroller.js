const axios = require('axios'); // faz chamadas para outras apis
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');


// Funções básicas: 
// -index: mostra uma lista de devs
// -show: mostrar um unico dev
// -store: salvar um dev
// -update: editar um dev
// -destroy: apagar um dev


module.exports = {

    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) { // valido apenas para rotas que começam com POST. O async indica que essa função pode demorar a responder    
        const { github_username, techs, latitude, longitude } = request.body; // desestruturação dos dados para colocar o user do github e as tecnologias, ambos contidos no corpo da requisição, nas variaveis github_user e techs
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`); // crase me permite colocar variaveis dentro da string usando template strings
        // a chamada a api do github pode demorar pra responder 
        // O await faz que com que se espere o resultado da api do github. Depois disso posso continuar


        let dev = await Dev.findOne({github_username}); // para tratar cadastros repetidos
        
        if(!dev){
            // mostrar os resultados da api do github
            // console.log(apiResponse.data); 

            // Esse jeito abaixo é mais facil de fazer do que usando if
            const { name = login, avatar_url, bio } = apiResponse.data;

            // Alternativa a linha acima
            // let { name, avatar_url, bio } = apiResponse.data;
            // // Em caso de nao haver um nome cadastrado no git, usaremos o seu login no lugar
            // if(!name){
            //     name = apiResponse.data.login;
            // }

            //console.log(name, avatar_url, bio, github_user);

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],

            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        
        
            // Filtrar as conexões que estão há no máximo 10KM de distancia
            // e que o novo dev tenha pelo menos uma das tecnologias filtradas
        
            const sendSocketMessageTo = findConnections(
                {latitude, longitude},
                techsArray,
            );
            
            // para testar descomente a linha abaixo
            // console.log(sendSocketMessageTo);

            sendMessage(sendSocketMessageTo, 'new-dev', dev );
        
        }

        return response.json(dev); // objetos podem ser representados por {}
    }
}