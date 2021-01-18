import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// injeta o elemento <App /> dentro do elemento do html cuja id é root 
// react.strictmode sinaliza potenciais problemas na aplicação. Ele ativa verificações e avisos adicionais para os seus descendentes
// O React DOM é o responsável por atualizar o DOM para exibir os elementos React.
ReactDOM.render(
  <React.StrictMode> 
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


