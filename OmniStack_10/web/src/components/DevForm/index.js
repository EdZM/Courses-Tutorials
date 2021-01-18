import React , { useState, useEffect } from 'react';

import './styles.css';

function DevForm({ onSubmit }) {
    const [github_username, setGithub_username] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState(''); // [] é vetor
    const [longitude, setLongitude] = useState('');
    // quando algo for digitado em um dos campos eu terei acesso em tempo real desses dados

    useEffect(() => {
        navigator.geolocation.getCurrentPosition( // Em algum momento, o navegador vai me perguntar se eu permito que ele pegue minha localização. A permissão só precisa ser dada uma vez
            (position) => {
                const { latitude, longitude } = position.coords;

                // cada vez que eu chamo essas funções abaixo, os estados são atualizados e o HTML é processado novamente com as alterações
                setLatitude(latitude);
                setLongitude(longitude);

                console.log(position);
            },

            (err) => {
                console.log(err)
            },

            {
                timeout: 30000,
            }

        )
    }, []);
    
    async function handleSubmit(e) {
        e.preventDefault();
        
        await onSubmit({ // como handleAddDev é assincrona pode-se aguardar sua finalização usando o await
            github_username,
            techs,
            latitude,
            longitude,
        });

        // os valores o usuario do git e tecnologias é zerado 
        // isso só ocorre depois que onSubmit, finalizar
        setGithub_username('');
        setTechs('');


    }


    return(
        <form onSubmit={handleSubmit/* função disparada quando o usuario aperta para salvar*/}>
            <div className="input-block">
            <label htmlFor="github_username" >Usuário do Github</label>
            <input
                name="github_username"
                id="github_username"
                required
                value={github_username}
                onChange={e => setGithub_username(e.target.value)}// e é de evento
            />
            </div>

            <div className="input-block">
            <label htmlFor="techs" >Tecnologias</label>
            <input
                name="techs"
                id="techs"
                required
                value={techs}
                onChange={e => setTechs(e.target.value)}
            />
            </div>

            <div className="input-group">
                <div className="input-block">
                <label htmlFor="latitude" >Latitude</label>
                <input
                    type="number"
                    name="latitude"
                    id="latitude"
                    required value={latitude}
                    onChange={e => setLatitude(e.target.value)}   // armazena o valor de um input digitado pelo usuário em um valor do estado
                />
                </div>

                <div className="input-block">
                <label htmlFor="longitude" >Longitude</label>
                <input
                    type="number"
                    name="longitude"
                    id="longitude"
                    required value={longitude}
                    onChange={e => setLongitude(e.target.value)}
                />
                </div>
            </div>
            <button type="submit">Salvar</button>
        </form>
    );

};

export default DevForm;
