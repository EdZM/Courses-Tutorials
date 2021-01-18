import React, {useState} from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo'; // prolonga a tela padrao de carregamento até que uma tarefa seja cumprida

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';


const fetchFonts = () => { //retorna uma promise por causa do loadAsync
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded){
    return (
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      /> 
    );//fica ouvido a promise ser resolvida e ao final o dataLoaded é setado para true
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }


  const startGameHandler = (selectedNumber) => { // para passar para a proxima tela é necessario que o user tenha digitado um numero, para fazer o jogo iniciar
    setUserNumber(selectedNumber);
  };
  
  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };


  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if(userNumber && guessRounds <= 0){
    content = (
      <GameScreen 
        userChoice={userNumber}   
        onGameOver={gameOverHandler}
      />
    );
  
  } else if (guessRounds > 0){
    content = (
      <GameOverScreen 
        roundsNumber={guessRounds} 
        userNumber={userNumber} 
        onRestart={configureNewGameHandler}
      />
    );
  }


  return ( 
    <SafeAreaView style={styles.screen}/* o SafeArea deve ser colocado no top most view para funcionar corretamente */> 
      <Header title="Guess a Number" />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
