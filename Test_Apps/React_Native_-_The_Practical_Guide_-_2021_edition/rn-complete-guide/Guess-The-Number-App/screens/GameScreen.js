import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, FlatList, Dimensions} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { ScreenOrientation } from 'expo';


import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import BodyText from '../components/BodyText';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';  //importe só como MainButton, não como MainButton.android ou MainButton.ios
                                                    // o react native ira renomear esse arquivo dependendo da plataforma em que o app estiver rodando


// useRef permite que um dado valor sobreviva/permaneça guardado, após as eventuais re-renderizações do componente
// useEffect permite rodar uma lógica apos(sempre após) cada ciclo de renderização
// Dimensions só permitem descobrir quais as dimensões do smartphone que está rodando o app. Para descobrir a orientação, uma logica adicional é necessaria 



const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max-min)) + min;
  
  if(rndNum === exclude){
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }

};


const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = props => {
  
  //ScreenOrientation.lockAsync(ScreenOrientation.OritationLock.PORTRAIT);

  const initialGuess = generateRandomBetween(1, 100, props.userChoice); //userChoice é o número inserido inicialmente, que é excluido da geracao aleatoria para deixar o jogo mais justo  
  const [currentGuess, setCurrentGuess] = useState(initialGuess); 
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]); // armazenando uma lista com todos os palpites do oponente
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);
  const currentLow = useRef(1); 
  const currentHigh = useRef(100); 

  const {userChoice, onGameOver} = props; // desestruturação. Com isso não preciso ficar usando props.userChoice, por exemplo, mas só userChoice, o que será util para o array de dependencias do useEffect

  useEffect(()=>{ //será util para reavaliar e recalcular as dimensões quando a orientação mudar
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      removeEventListener('change', updateLayout);
    };

  });



  useEffect(() => {  //a função sempre roda após o ciclo de renderização
    if(currentGuess === props.userChoice){ //condição para o game over
      onGameOver(pastGuesses.length); // a função passada como propriedade é chamada
    }
  }, [currentGuess, userChoice, onGameOver]); // primeiro argumento é a função chamada apos cada fim de ciclo de renderização e o segundo argumento é array de dependencias da funcao. Se nenhum de seus elementos mudar, o useEffect não será rodado de novo


  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < props.userChoice) || 
      (direction === 'greater' && currentGuess > props.userChoice)
    ) { // indica que dei o hint errado para o oponente
      Alert.alert('Don\'t lie!', 'You know that this is wrong, right?...', [{text:'Sorry!', style:'cancel'}]);
      return;
    }

    if(direction === 'lower'){
      currentHigh.current = currentGuess; // .current é onde o valor está armazenado
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess); // exclude === currentGuess evita que o guess feito seja sempre diferente do anterior
    setCurrentGuess(nextNumber);
    //setRounds(curRounds => curRounds + 1); // incrementa o numero de rounds usando uma função anonima
    setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]); // adiciona no inicio do array
    
  };

  let listContainerStyle = styles.listContainer;

  if(availableDeviceWidth < 350){
    listContainerStyle = styles.listContainerBig;
  }

  if(availableDeviceHeight < 500){
    return (
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>Opponent's Guess</Text>
          <View style={styles.controls}>
            <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Ionicons name="md-remove" size={24} color="white" />
            </MainButton>
            <NumberContainer>{currentGuess}</NumberContainer>
            <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Ionicons name="md-add" size={24} color="white" />
            </MainButton>
          </View>
        
        <View style={listContainerStyle}>
          {/*<ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
          </ScrollView>*/}
          <FlatList
            keyExtractor={item => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>



    );
  }

  return(
    <View style={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Ionicons name="md-remove" size={24} color="white"/>
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
          <Ionicons name="md-add" size={24} color="white"/>
        </MainButton>
      </Card>
      <View style={listContainerStyle}>
        {/*<ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
          </ScrollView>*/}
        <FlatList 
          keyExtractor={item=> item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />  
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5 ,
    width: 400,
    maxWidth: '90%'
  },
  controls:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%'
  },  
  listContainer: {
    flex: 1,
    width: '60%',
    //width: Dimensions.get('window').width > 350 ? '60%': '80%',
    
  },
  listContainerBig:{
    flex: 1,
    width: '80%',
  },
  list: {
    flexGrow: 1,
    //alignItems: 'center',
    justifyContent: 'flex-end'
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
});

export default GameScreen;