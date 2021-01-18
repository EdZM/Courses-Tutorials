// Requisição AJAX == forma de consumir informações de um servidor pelo JS
// https://api.github.com: os dados enviados/recebidos são no formato/notação JSON == > JavaScript Object Notation
var xhr = new XMLHttpRequest();

// Requisição assíncrona : nao acontece no mesmo fluxo do codigo
xhr.open('GET', 'https://api.github.com'); // busca uma informação na URL fornecida
xhr.send(null);

xhr.onreadystatechange = function () {
    if(xhr.readyState === 4){
        console.log(JSON.parse(xhr.responseText));
    }
}

