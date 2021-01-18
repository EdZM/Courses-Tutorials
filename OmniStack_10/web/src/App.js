import React, { useState, useEffect } from 'react'; //Sempre que for usar HTML dentro do JS preciso importar o react
import api from './services/api';
/*
import React, { useState } from 'react'; //Sempre que for usar HTML dentro do JS preciso importar o react

useState é uma função para criar estados
*********************************3 Conceitos importantes do React
Componente:  função que retorna um conteudo HTML, CSS, JS. Pode ser repetível/replicável
             -oficialmente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação

Propriedade: é quando eu faço passagem de atributos para um componente do React 
             -oficialmente: Informações que um componente PAI passa para o componente FILHO

Estado: informação manipulada/mantida pelo componente (lembrar: imutabilidade)

// É bom ter só um componente por arquivo
// import Header from './Header';
// function App() { // primeira letra SEMPRE maiúscula
//   return ( // não posso ter um componente um embaixo do outro sem ter um componente por volta deles(por isso incluí o div, mas isso atrapalha a estilização do código)
//     // a alternativa ao div é a tag vazia
//     <> 
//       <Header title="Titulo 1" />
//       <Header title="Titulo 2" />
//       <Header title="Titulo 4" />
//     </>
//   );
// }

// função propria de um componente é criada dentro dele mesmo
function App() { // primeira letra SEMPRE maiúscula
  const [counter, setCounter] = useState(0); // retorna um vetor com duas informaçoes(necessario haver uma desestruturação para pegar esses dados)
  
  // quando a função setCounter é chamada, ela sempre cria um novo counter com base no valor anterior dessa variavel
  // o fato de um novo counter ser criado tem a ver com a ideia de imutabilidade
  function incrementCounter() {
    setCounter(counter + 1);
  }
  
  return ( // não posso ter um componente um embaixo do outro sem ter um componente por volta deles(por isso incluí o div, mas isso atrapalha a estilização do código)
    // a alternativa ao div é a tag vazia
    // {} depois de um atributo é para incluir JS no HTMl
    <>
      <h1>Contador: {counter}</h1>
      <button onClick={incrementCounter}>Incrementar</button>
    </>
  );
}

*/

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';


// navigator.geolocation.getCurrentPosition -> se puser aqui vai ser executado uma unica vez no ciclo de vida da aplicação

function App() {
  
  // quando o estado for alterado, ele irá renderizar o componente novamente
  
  const [devs, setDevs] = useState([]);
  
  
 
    
  // a busca dos devs na api deve acontecer uma unica vez dentro do ciclo de renderização do componente
  // o [](array vazio) garante a execução única 
  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs'); // devem ser armazenados dentro de algum estado para poderem ser mostrados depois em tela      
      setDevs(response.data);
    }

    loadDevs();
  }, []);


  async function handleAddDev(data) {
    const response = await api.post('/devs',data);
    //console.log(response.data);
    // adição num array em JS
    setDevs([...devs, response.data]); //garante que ao cadastrar um nome ele ja apareça na tela

  }

  return(
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>  

  );


}



export default App;
