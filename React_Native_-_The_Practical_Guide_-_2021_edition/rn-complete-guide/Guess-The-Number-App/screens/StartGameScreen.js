import React , {useState, useEffect} from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert, 
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,

} from 'react-native';

import Colors from '../constants/colors';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';

const StartGameScreen = props => {
  
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false); // usado para verificar com o user se esse é mesmo o numero que ele quer inserir
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, '')); // troca tudo que não um numero de 0 a 9 globalmente(g - por todo o texto) por uma string vazia
  };
  
  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    }

    Dimensions.addEventListener('change', updateLayout); //sempre que a dimensão mudar a função será apontada. listeners são necessários sempre que forem necessarias dimensões recalculadas ou quando as dimensões puderem mudar
    return () => {
      Dimensions.removeEventListener('change', updateLayout); // remove o listener e seta um novo sempre que o componente re-renderiza
    };

  });

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue); // converte string em numero

    if(isNaN(chosenNumber)|| chosenNumber <= 0 || chosenNumber > 99){
      Alert.alert(
        'Invalid Number!', 
        'Number has to be a number between 1 and 99.', 
        [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]);
      return;
    }
    
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if(confirmed){
    confirmedOutput = (
      <Card style= {styles.summaryContainer}>
        <BodyText>You selected</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber) /* a funcao colocada dentro da propriedade é acionada usando selectedNumber como parametro */}>
          Start Game
        </MainButton> 
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback 
          onPress={() => {
            Keyboard.dismiss(); // no iOS ou Android, ao apertar em qualquer lugar fora do teclado, ele desaparece
          }}
        >
          <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
              <BodyText>Select a Number</BodyText>
              <Input 
                style={styles.input} 
                blurOnSubmit // garante no android que apos o botao de confirmação for apertado o teclado some(no iOS isso nao funciona)
                autoCapitalize='none' 
                autoCorrect={false} 
                keyboardType="number-pad" 
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />        
              <View style={styles.buttonContainer}>
                <View style={{width: buttonWidth}}>
                  <Button 
                    title="Reset" 
                    onPress={resetInputHandler} 
                    color={Colors.accent} 
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button 
                    title="Confirm" 
                    onPress={confirmInputHandler} 
                    color={Colors.primary} 
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'open-sans-bold',

  },
  inputContainer: {
    width: '80%',
    //maxWidth: '80%',
    maxWidth: '95%',
    minWidth: 300,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button: {
    //width: 100
    width: Dimensions.get('window').width / 4, // get the REAL room you have available e isso só é calculado uma vez
  },
  input:{
    width: 50,
    textAlign: 'center'
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'
  },  
  text: {
    fontFamily: 'open-sans',
  },  

});

export default StartGameScreen;
