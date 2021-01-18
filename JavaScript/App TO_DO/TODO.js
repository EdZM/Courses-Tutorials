// Guardando as referencias dos elementos a serem usados
var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var BtnElement = document.querySelector('#app button');

// deverá retornar um array vindo da local storage. Se nao houver nada la ele so inicializa com vazio.
var tasks = JSON.parse(localStorage.getItem('list_task')) || [];

function renderTasks(){
    listElement.innerHTML = '';

    for(task of tasks){
        var taskElement = document.createElement('li'); // cria o elemento <li>
        var taskText = document.createTextNode(task);   // cria o texto que vai no <li>
        
        var linkElement = document.createElement('a');  // cria o elemento <a>
        var linkText = document.createTextNode('Delete Task'); // cria o texto do link
        
        linkElement.setAttribute('href','#'); // atribui o # ao atributo href da tag <a> 
        
        var pos = tasks.indexOf(task); // retorna um indice
        linkElement.setAttribute('onclick','deleteTask(' + pos + ')');
        
        
        linkElement.appendChild(linkText); // o filho de <a> é o texto do link

        taskElement.appendChild(taskText);    // o filho de <li> passa a ser o texto da tarefa
        taskElement.appendChild(linkElement); // o filho de <li> passa a ser a tag <a>, cujo filho é o texto do link
        
        listElement.appendChild(taskElement); //  <ul> --> <li> --> texto da tarefa
                                              //             |----> <a> --> texto do link
    }
}

renderTasks();

function addTasks(){
    var taskText = inputElement.value;
    console.log(taskText);
    tasks.push(taskText);
    inputElement.value = '';
    renderTasks();
    saveToStorage();
}

BtnElement.onclick = addTasks;

function deleteTask(pos){
    tasks.splice(pos,1); //vai na posicao pos e remova apenas 1 elemento
    renderTasks();
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('list_task', JSON.stringify(tasks)); // local storage nao consegue guardar vetores, objetos dentro dele, mas só valores no formato string(dai o uso do JSON)
}