// Esse arquivo não é utilizado, mas contem anotações sobre componentes
// Esse componente não será usado, mas terá anotações de como criar componentes
import React from 'react';

// o nome dos componentes sempre devem estar com uppercase para nao bater com 
// tags já existentes do HTML
// React.FC == Function Component,
//  tipo generico do TS que pode receber parametros


interface HeaderProps {// define a tipagem de um objeto
    title: String; // sem acrescentar o ? antes do : torna essa propriedade como NAO obrigatoria

}

const Header: React.FC<HeaderProps> = (props) => { // props é uma variavel JS 
    return (
        <header>
            <h1>{ props.title }</h1> 
        </header>

    );
}

export default Header; 