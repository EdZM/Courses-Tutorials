import React from 'react';
import './assets/styles/global.css';
import Routes from './routes'; // escrever Routes dentro de App, já faz a auto inclusão desse import

// JSX == JavaScript + XML(o html é escrito usando XML)
// JSX == html dentro do JS

function App() {
  return (
    <Routes />
  );
}

export default App;
