import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg'; // necessario para fazer o react entender o caminho da imagem a ser usada em src
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css'; // sempre que for usar um arquivo que eu mesmo criei e nao faz parte de alguma dependencia, usa-se o ./ ( é o caminho relativo)
import api from '../../services/api';


// nao posso usar class como atributo de um elemento, pois ela eh uma palavra reservada do JS
// ao inves disso usa-se className

// ***OBS.: ao incluir algo em href, ocorre de a pagina recarregar recursos toda vez que aquele href for acessado, o que não é preferivel numa abordagem SPA 
//          Para resolver isso, basta trocar a tag <a> por <Link> e trocar 'href' por 'to'

function Landing() {
    const [totalConnections, setTotalConnections] = useState(0); // inicializa com o valor 0


    useEffect(()=>{
        api.get('connections').then(response => { // o then garante a espera pela resposta da api. Depois disso, ele usa o que foi colocado em response
            const {total} = response.data;

            setTotalConnections(total);
        }) 


    }, []);  // toda vez que o que estiver entre [] ocorrer/mudar, a função (primeiro parametro) é disparada
                            // se nao houver nada entre [] a função é chamada uma UNICA vez
    
    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy"/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>
                <img src={landingImg} alt="Plataforma de estudos" className="hero-image"/>

                <div className="buttons-container">
                    <Link to="/study" className="study"> 
                        <img src={studyIcon} alt="Estudar"/>
                        Estudar
                    </Link>
                    
                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Dar aulas" />
                        Dar Aulas
                    </Link>
                </div>
                <span className="total-connections">
                    Total de {totalConnections} conexões já realizadas <img src={purpleHeartIcon} alt="Coração roxo" />
                </span>
            </div>
        </div>
    
    )
}

export default Landing;