// Promises: classe/funcao que permite o uso de estruturas then e catch, para trabalhar com codigo assincrono no JS
// é um evento que ocorre externamente

var myPromise = function() {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();

        // Requisição assíncrona : nao acontece no mesmo fluxo do codigo
        xhr.open('GET', 'https://api.github.com'); // busca uma informação na URL fornecida
        xhr.send(null);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if(xhr.status == 200){ //codigo de sucesso
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject('Requisition Error');

                }
                
            }
        }

    });

}

// Se executar o codigo abaixo aparecerá a seguinte mensagem: pending 
// --> ocorre pq o console.log vai mostrar a variavel result sem ter nada nela
// var result = myPromise();
// console.log(result);

myPromise()
    .then(function (response) { // invocado caso o resolve seja chamado, if deu TRUE
        console.log(response);
        console.log('Success');
    }) 
    .catch(function (error) { // xhr.status != 200 
        console.warn(error);
        
    });





