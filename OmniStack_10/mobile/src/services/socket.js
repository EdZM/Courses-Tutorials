import socketio from 'socket.io-client'; 

const socket = socketio('http://192.168.0.16:3333' ,{
    autoConnect: false,
});

function subscribeToNewDevs(subscribeFunction){
    socket.on('new-dev', subscribeFunction);


}

function connect(latitude, longitude, techs){
    socket.io.opts.query = {// forma de enviar os parametros para o backend.
        latitude, 
        longitude,
        techs,

    };
    
    
    
    socket.connect();

    // Para testar o recebimento de uma mensagem do front end pelo back end descomente as linhas abaixo e as linhas de codigo do back end
    // socket.on('message', text => { // o front end deve receber a mensagem sem precisar fazer qualquer tipo de requisição
    //     console.log(text); 
    // })

}

function disconnect() {
    if(socket.connected){
        socket.disconnect();
    }
}

export{
    connect,
    disconnect,
    subscribeToNewDevs,
};