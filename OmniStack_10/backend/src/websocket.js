const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

const connections = []; // É preciso salvar as conexões feitas. Elas podem ser salvas em bancos de dados também.
let io;

exports.setupWebSocket = (server) => {
    io = socketio(server);

    // executa só quando o usuario inicia a conexão com a aplicação
    io.on('connection', socket => { 
        //console.log(socket.id);
        //console.log(socket.handshake.query);// mostra os parametros recebidos do front end
                                            // No início pode mostrar valores errados.
                                            // Ao salvar, o servidor reinicia, e o front end vai ficar tentando conectar com o servidor sozinho
                                            // toda vez que o servidor cai o socket.io fica tentando reconectar

        // Para testar o envio de mensagens do back end para o front end descomente as linhas abaixo e as linhas correspondentes no arquivo socket.js do front end(pasta mobile)
        // setTimeout(() => { // depois de um tempo o backend deve mandar uma messagem ao front end
        //     socket.emit('message', 'Hello');
        // }, 3000);

        const {latitude, longitude, techs} = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude), // por padrão são sempre enviadas como string, por isso a conversão para numero
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs), // as techs são passadas em formato de strings de tecnologias e por isso transformá-las em vetor de tecnologias
        });
    });
};


// Se por exemplo o usuario novo trabalha com react e react Native, eu estarei percorrendo as minhas conexões de webSocket e verifico, por exemplo, que estou filtrando por react 
// entao esse dev satisfaz a condição da função abaixo.

// verifica se o dev novo está a num raio de 10km e se ele tem trabalha com a tecnologia digitada no input do app
// Ele acaba fazendo um filtro para que nao retorne todas as conexões
exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => {
        // compara as distancias entre o dev cadastrado com as coordenadas armazenadas em cada uma das conexões de websocket
        return calculateDistance(coordinates, connection.coordinates) < 10 // menor que 10km 
            && connection.techs.some(item => techs.includes(item)); 
            // avalia dentre as conexões, se pelo menos uma das tecnologias dessas conexões (usa-se o some() para isso) bate com alguma tecnologia do usuario recem cadastrado.
    
        })
};

exports.sendMessage = (to, message, data ) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    });


};