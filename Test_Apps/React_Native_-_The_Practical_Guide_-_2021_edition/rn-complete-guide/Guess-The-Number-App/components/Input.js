import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

const Input = props => {
  return <TextInput {...props} style={{...styles.input, ...props.style}}/> // adiciona todos os estilos do input, mais aqueles passados como propriedade
                                                                           // ...props adiciona todas as propriedades que o textInput pode ter para o novo componente       
};

const styles = StyleSheet.create({
  input:{
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});


export default Input;