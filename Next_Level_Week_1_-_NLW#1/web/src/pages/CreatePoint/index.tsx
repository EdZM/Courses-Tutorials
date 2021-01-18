import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react'; //ChangeEvent é para quando houver mudança de valores em formularios, por exemplo
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';
import api from '../../services/api';
import axios from 'axios';


import './styles.css';
import logo from '../../assets/logo.svg';


// fieldset util para criar campos de formularios
// field-group faz com que dois ou mais campos dividam um determinado espaço

// a chamada a api pertence ao componente, portanto preciso fazê-la dentro dele,
// Como desejo fazer isso apenas uma vez, não posso usar api.get diretamente
// Para garantir isso devo usar o useEffect()
// OBS.:    não posso usar async dentro de um useEffect()
//          Ao inves disso, usa-se o then()            

// Array ou object como variavel de estado: manualmente informar o tipo da variavel 
// para isso usa-se o interface

interface Item {  // faz a representação do formato que um objeto terá
    id: number;
    title: string;
    image_url: string;

} 

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECICityResponse {
    nome: string;
}


const CreatePoint = () => {
    
    const [items, setItems] = useState<Item[]>([]); // Toda vez que quero armazenar informações de um componente, uso estados.
                                                    // o Item[] é um array de itens e parametro para o useState();   
                                                    // setItems é uma função que altera a variavel de estado items que é um array 
                                                    // a variavel items é iniciada como um array vazio

    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState('0'); // 0 porque value é 0
    const [selectedCity, setSelectedCity] = useState('0'); // 0 porque value é 0 
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',

    });

    const history = useHistory();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;
            
            setInitialPosition([latitude, longitude]);

        }) //retorna a posição do usuario assim que ele abre a aplicação

    }, []);

    useEffect(() => {
        api.get('items').then(response =>{
            setItems(response.data); // os dados vindos da api estão na variavel response e são atribuídos á variavel de estado items

        })
    }, []); // primeiro parametro: qual função executar
            // segundo parametro: Quando executar a função? (Quando alguma informação mudar)
 

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados/').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
        
            setUfs(ufInitials);
        });
    }, []);


    useEffect( () => {
        // carregar Cidades sempre que a uf mudar
        axios.get<IBGECICityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const cityNames = response.data.map(city => city.nome);

            setCities(cityNames);
        })


    }, [selectedUf]); //essa função é chamada toda vez que selectedUf mudar 
    
    // chamada toda vez que o usuario escolher uma UF
    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) { // é preciso informar o tipo do evento e ainda, no argumento de tipagem, de onde isso vem 
        const uf = event.target.value; // é exatamente o valor(UF) que o usuario selecionou

        setSelectedUf(uf);
    };

    // chamada toda vez que o usuario escolher uma cidade
    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) { 
        const city = event.target.value;

        setSelectedCity(city);
    };

    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng,
        ])
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        //console.log(event.target);
        const { name, value } = event.target; // retorna o nome do input preenchido pelo usuario e com o dado que ele digitou

        setFormData({...formData, [name]: value}) // mantem os dados já existentes 
    }

    function handleSelectItem(id: number) { // acionada toda vez que o usuario clica em um item
        // trata
        const alreadySelected = selectedItems.findIndex(item => item === id); // se encontrar o numero retorna uma posição >= 0 
        
        if(alreadySelected >= 0){
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);

        } else {
            // não faça assim: setSelectedItems([id]) porque isso limpar informações anteriormente existentes
            setSelectedItems([...selectedItems, id]); // aproveita o que já tem em selectedItems e acrescenta o novo id
        }
        
        
        
    }

    async function handleSubmit(event: FormEvent){
        event.preventDefault(); // evita de sair da pagina do formulario ao apertar enter

        // passando todos os dados armazenados para a api
        const {name, email, whatsapp } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const items = selectedItems;
        const [latitude, longitude] = selectedPosition;

        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            items,
        };

        await api.post('points', data); // passa os dados para api
        
        history.push('/point-created'); //manda o usuario de volta para a home s

    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>
                <Link to="/">
                    <FiArrowLeft    />
                    Voltar para home
                </Link>
            </header>
            
            <form onSubmit={handleSubmit} >
                <h1>Cadastro do <br  /> ponto de coleta </h1>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                </fieldset>
                
                <div className="field">
                    <label htmlFor="name">Nome da entidade</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleInputChange}
                    />
                </div>

                <div className="field-group">
                    <div className="field">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="whatsapp">Whatsapp</label>
                        <input
                            type="text"
                            name="whatsapp"
                            id="whatsapp"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedPosition}/>
                    </Map> 


                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select 
                                name="uf" 
                                id="uf" 
                                value={selectedUf} 
                                onChange={handleSelectUf} >
                                
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => ( // parenteses pq quero retornar algo
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            
                            </select>
                        </div>
                    
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select 
                                name="city" 
                                id="city" 
                                value={selectedCity}
                                onChange={handleSelectCity}>
                                
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => ( // parenteses pq quero retornar algo
                                    <option key={city} value={city}>{city}</option>
                                ))}    
                        
                            </select>
                        </div>                    
                    </div>
                
                </fieldset>
                
                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>
                
                    <ul className="items-grid">
                        {items.map(item => (    // o map faz uma varredura no array items
                                                // incluir o ( é o mesmo que usar o return (<elementos HTML>)
                                                // todo primeiro item listado no li precisa de uma key única para que o React consiga achar o item de forma mais rápida
                                                // SEMPRE que for necessario passar uma função como referencia/parametro use arrow Functions
                            <li 
                                key={item.id} 
                                onClick={() => handleSelectItem(item.id)} 
                                className={selectedItems.includes(item.id)? 'selected' : ''}    
                            >  
                                <img src={item.image_url} alt={item.title} />
                                <span>{item.title}</span>
                            </li>                    
                        ))}
                    </ul>
                
                </fieldset>
                <button type="submit">
                    Cadastrar ponto de coleta  
                </button>
            </form>
        </div>

    );

}

export default CreatePoint;