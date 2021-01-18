import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft,  FiCheckCircle } from 'react-icons/fi'

import './styles.css';
import logo from '../../assets/logo.svg';

const SuccessPage = () => {
    return (
        <div id="success-page">
            <div className="content">
                <header>
                    <img src={logo} alt="Ecoleta"/>
                </header>
                <main>                    
                    <h1>
                        <FiCheckCircle />
                        Ponto de Coleta Cadastrado !
                    </h1>
                    <Link to="/">
                        <span>
                            <FiArrowLeft />
                        </span>
                        <strong>Voltar para home</strong>                        
                    </Link>    
                </main>    
            </div>
        </div>
    );
}


export default SuccessPage;