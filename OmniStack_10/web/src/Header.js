import React from 'react';

function Header(props) { //props são todas as propriedades passadas para o componente
    return <h1>{props.title}</h1>
}

export default Header;