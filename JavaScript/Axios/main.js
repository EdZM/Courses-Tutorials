// Axios nada mais é do que um encapsulamento do XMLHttpRequest
// ele vai fazer algo semelhante ao que foi feito no codigo contidos na pasta AJAX e PROMISES
// Ele retorna os valores de forma mais facil
// opcao de repositorio para pegar o axios: <script src="https://github.com/axios/axios/tree/master/dist/axios.min.js"></script>

axios.get('https://api.github.com')
    .then(function(response) { // invocado caso o resolve seja chamado, if deu TRUE
        console.log(response);
        //console.log('Success');
    }) 
    .catch(function(error) { // xhr.status != 200 
        console.warn(error);
        
    });



