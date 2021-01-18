import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; //route é cada rota da aplicação
import Landing from './pages/Landing'; // Landing é um componente
import TeacherList from './pages/TeacherList';
import TeacherForm from './pages/TeacherForm';

// pela documentação o BrowserRouter é necessario para cada rota da aplicação

// Propriedades no react: atributos passados para uma tag html
// o "/" é o path da landing page
// OBS.: o react-router-dom nao faz uma verificação de igualdade, mas sim de conteudo.
//      Significa que ao digitar /study ele mostrará dois componentes na mesma pagina, / e /study
//      E isso é resolvido se incluir como propriedade do Route o atributo 'exact'


function Routes() {
    return(
        <BrowserRouter> 
            <Route path="/" exact component={Landing}/>            
            <Route path="/study" component={TeacherList} />
            <Route path="/give-classes" component={TeacherForm} />
        </BrowserRouter>
    );
}

export default Routes;