import React, { useState, useEffect } from 'react'; // useEffect -> usado para executar alguma coisa assim que o componente é montado em tela, uma única vez  
                                                    // useState serve para informar que tem uma informação que vai ser manipulada pelo componente        
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location'; // para duvidas consulte docs.expo.io , documentação do expo
import { MaterialIcons } from '@expo/vector-icons'; // permite o uso de alguns ícones

import { connect, disconnect, subscribeToNewDevs } from '../services/socket';
import api from '../services/api';
import mapStyle from './map';



function Main( {navigation} ) {
    
    // SEMPRE É NECESSARIO SALVAR ALGUMA INFORMAÇÃO DA API EM ALGUM ESTADO. (padrão no react)
    const [devs, setDevs] = useState([]); // como sao varios devs, inicio com um array vazio
    const [currentRegion, setCurrentRegion] = useState(null); // nao havera regiao de inicio
    const [techs, setTechs] = useState('');

    useEffect( () => {
        async function loadInitialPosition() {
            const { granted } = await  requestPermissionsAsync();
        
            if(granted){
                const { coords } = await getCurrentPositionAsync({
                enableHighAccuracy: true, //o GPS deve estar habilitado no celular 

                });
                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.08, // ambas as informaçoes sao calculos navais para obter o zoom dentro do mapa
                    longitudeDelta: 0.08,

                })
            }
        }
        loadInitialPosition();
    
    
    },  []); // o array é um array de dependencias, quando essa funcao deve executar. Se ficar vazio executa uma só vez
             // dentro do {} vai a função que eu quero executar


    useEffect(() => {
        subscribeToNewDevs(dev => setDevs([...devs, dev])); // acrescenta um dev no final

    }, [devs] ); // toda vez que devs for alterada a função subscribeToNewDevs é chamada


    function setupWebSocket() {
        disconnect();
        
        const  {latitude, longitude} = currentRegion;
       
        connect(
            latitude,
            longitude,
            techs,
        );


    }

    async function loadDevs() {
        const {latitude, longitude} = currentRegion;
        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                //techs: 'ReactJS' // busca de forma estatica
                techs
            }
        });
        
        setDevs(response.data.devs); // dados vindos da resposta da api
        setupWebSocket();
        
    
    }

    // quando o usuario muda a posição do mapa
    // executa quando o usuario para de mover o mapa
    function handleRegionsChanged(region) {
        setCurrentRegion(region);
    }


    if(!currentRegion){ // só mostra o mapa quando carregar a informação de localização do usuario
        return null;

    }


    return (
            // as chaves duplas sao pra incluir um codigo JS e um objeto JS como atributo do coordenate
        <>
            
            <MapView 
                customMapStyle={mapStyle}
                onRegionChangeComplete={handleRegionsChanged}
                initialRegion={currentRegion} 
                style={styles.map}
            >
                {devs.map(dev => ( // o map esta sendo usado para listar os devs. Sempre que uso o map devo incluir a key do primeiro elemento logo depois do map
                    <Marker 
                        key={dev._id}
                        coordinate={{ 
                            longitude: dev.location.coordinates[0],
                            latitude: dev.location.coordinates[1],                            
                        }}
                    >
                        <Image 
                            style={styles.avatar} 
                            source={{ uri: dev.avatar_url }} 
                        />
                        
                        <Callout onPress={() => {
                            // navegação
                            navigation.navigate('Profile', { github_username: dev.github_username })

                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.devName}>{dev.name}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
                
                
                <View style={styles.searchForm} >                          
                    <TextInput 
                        style={styles.searchInput} 
                        placeholder='Buscar devs por techs...'
                        placeholderTextColor='#999'
                        autoCapitalize='words' //primeira letra em caixa alta
                        autoCorrect={false}
                        value={techs}
                        onChangeText={ text => setTechs(text) }
                    />   
                    
                    <TouchableOpacity onPress={ loadDevs } style={styles.loadButton}>
                        <MaterialIcons name='my-location' size={25} color='#FFF'/>
                    </TouchableOpacity>
                
                </View>
            
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1 // o flex faz ocupar a tela toda
        
    },
    
    avatar: { // a imagem nao aparece se eu nao fizer sua estilização antes
        width: 30,
        height: 30,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#1ed760'

    },

    callout: {
        width: 260,
        borderRadius: 15,
        
    },
    
    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    
    devTechs: {
        marginTop: 5,
    },

    searchForm: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row',
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#393940',
        color: '#FFF',
        borderRadius: 25,
        paddingHorizontal: 20,        
        fontSize: 16,

        // sombra para IOS
        shadowColor:'#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        
        // sombra para o Android
        elevation: 2, 

    },

    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#1ed760',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
        elevation:2,
    }

})

export default Main;