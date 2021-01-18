import React from 'react';
import {Link} from 'react-router-dom';
import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';
import './styles.css';



// definição da tipagem de um objeto (uso do interface)
interface PageHeaderProps {
    title: string; // a prop title é obrigatoria. Caso contrario estaria title?: string
    description?: string   ; //description nao é obrigatoria
}

// react.FC<propriedades> == React.FunctionComponent<propriedades>: componente do react escrito em forma de função
const PageHeader: React.FunctionComponent<PageHeaderProps> = (props) => {
    return(
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="Voltar" />
                </Link>
                <img src={logoImg} alt="Proffy" />
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>
                {props.description && <p>{props.description}</p> /* uso do operador &&(AND): forma de fazer if sem else (só coloca uma descrição se ela existir de fato)*/}  
                
                {props.children}



            </div> 
        
        </header>
    );
}

export default PageHeader;