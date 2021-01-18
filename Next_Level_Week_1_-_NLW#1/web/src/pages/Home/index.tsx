import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link }from 'react-router-dom'; // faz a troca de páginas de forma mais rápida sem precisar recarregar a página inteira(seguindo a ideia de SPA)
                                        // alternativa mais rapida do que usar o <a></a>
import './styles.css';

import logo from '../../assets/logo.svg';



const Home = () => {
    return(    
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="Ecoleta" /> 
                </header> 
                <main>
                    <h1>Seu marketplace de coleta de resíduos</h1>
                    <p>Ajudamos pessoas a encotrarem pontos de coleta de forma eficiente.</p>
                    
                    <Link to="/create-point">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Cadastre um ponto de coleta</strong>
                    </Link>
                </main>
            </div>
        </div>
    );

}

export default Home;