import React from 'react';
import './App.css';
import Routes from './routes';


function App() {
  
  return ( 
    <Routes />
  );
}

export default App;


/* Versão antiga com anotações

import React, { useState } from 'react';
import './App.css';
import Header from './Header';

function App() {

  const [counter, setCounter] = useState(0); // counter nao pode ser alterada diretamente
                              // o que pode ser feito é criar um novo estado com as informações que eu quero
                              // 0 é o valor inicial da variavel de estado counter
                              // os valores são acessiveis em tempo real
                              // retorna um array: [valor do estado, função para atualizar o valor do estado]

  function handleButtonClick() {
    setCounter(counter + 1);
  }



  // return React.createElement('h1', {children: 'Hello world'});
  return ( // usa parenteses se houver mais de um retorno
    // <h1>React é legal. Show</h1>
    // div#app>ul>li*5 cria uma div com 5 itens de uma lista automaticamente
    // antes, o return desse h1 era feito da seguinte forma:
    <div>
      <Header title={`Contador: ${counter}` }/>
      <h1>{counter}</h1>
      <button type="button" onClick={handleButtonClick} >Aumentar</button>
    </div>

  );
}



*/