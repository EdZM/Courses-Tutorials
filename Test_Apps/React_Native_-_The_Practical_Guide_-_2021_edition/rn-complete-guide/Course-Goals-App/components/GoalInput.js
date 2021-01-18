import React, {useState} from 'react';
import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';

// Modal serve para fazer uma nova tela surja por cima da atual
// View ajuda a organizar outros componentes

const GoalInput = props => { // pode-se usar o function tambem 
  const [enteredGoal, setEnteredGoal] = useState(''); // setEnteredGoals serve para atualizar o estado do objeto enteredGoal
                                                      // é melhor que esse controle dos estados fique nesse arquivo  
  
  const goalInputHandler = (enteredText) => { // arrow function
    setEnteredGoal(enteredText);
  }


  const addGoalHandler = () => {
    props.onAddGoal(enteredGoal); // use o parenteses aqui pq a funcao realmente deve ser executada aqui
    setEnteredGoal('');
  
  }

  return (
    <Modal visible={props.visible} animationType="slide"> 
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Course Goal" 
          style={styles.input}
          onChangeText={goalInputHandler /* sem parenteses, para nao executá-la durante a primeira renderização */}
          value={enteredGoal}
        />        
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Add" onPress={addGoalHandler /* obs1: ao clicar no botão uma função é disparada obs2: bind preconfigura os argumentos que devem ser passados quando a funcao for chamada  */} />
          </View>
          
          <View style={styles.button}>
            <Button title="Cancel" color="red" onPress={props.onCancel}/>
          </View>
          
        </View>
      </View>
    </Modal>
  );


};


const styles = StyleSheet.create({
  
  inputContainer: {
    flex: 1, // garante que esse container use todo o espaço disponivel
    flexDirection: 'column', // por padrao esse valor é column
    justifyContent: 'center',
    alignItems: 'center'

  },


  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%'// permite que a estilização acima crie um espaço entre os botoes    

  },

  button:{
    width: '40%',

  }


});


export default GoalInput;