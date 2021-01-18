import React from 'react';
import ReactDOM from 'react-dom'; // integra o react com a DOM (árvore de elementos do HTML)
import App from './App';

// JSX: sintaxe de XML dentro do JS 


// Renderiza o componente App dentro do documento html, 
// mais especificamente na div, que tem como id, root.
ReactDOM.render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>,
  document.getElementById('root')
);

