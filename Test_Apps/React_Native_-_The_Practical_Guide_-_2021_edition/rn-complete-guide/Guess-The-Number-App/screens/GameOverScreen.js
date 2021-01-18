import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions, ScrollView, SafeAreaView} from 'react-native'; 

// SafeArea define o espaço onde se pode posicionar o conteudo. Respeita notches, detalhes fisicos da tela

import BodyText from '../components/BodyText';
import DefaultStyles from '../constants/default-styles';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
  return(
    <ScrollView>
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>The Game is Over!</Text>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../assets/success.png')}  //imagem usada localmente ==> aqui o react native sabe como determinar largura e altura da imagem e usar isso como default
            //source={{ uri: 'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg'}} // o react native não sabe como determinar a largura e altura de uma imagem obtida da web
            style={styles.image}
            resizeMode="cover" // cobre todo o espaço disponivel por padrão(opção cover)
          />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}> 
            Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the 
            number <Text style={styles.highlight}>{props.userNumber}</Text>
          </BodyText>
        </View> 
        <MainButton onPress={props.onRestart}>New Game</MainButton>
      </View>
    </ScrollView>
  )
};


const styles = StyleSheet.create({
  screen:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  imageContainer:{
    //width: 300,
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden', //tudo aquilo que sobrepuser os limites desse container é cortado
    marginVertical: Dimensions.get('window').height / 30
  },
  image:{ // estilização necessária quando a imagem vem da web ao inves de localmente
    width: '100%',
    height: '100%',

  },
  resultContainer:{
    marginHorizontal: 30, 
    marginVertical: Dimensions.get('window').height / 60,
  },
  resultText:{
    textAlign:'center',
    fontSize: Dimensions.get('window').height < 400 ? 16: 30,
  },
  highlight:{
    color: Colors.primary,
    fontFamily: 'open-sans-bold',
    
  },

});


export default GameOverScreen;