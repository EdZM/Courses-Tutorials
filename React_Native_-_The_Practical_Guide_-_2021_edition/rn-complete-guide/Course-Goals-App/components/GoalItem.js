import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// props são as propriedades passadas dentro de um componente, como por exemplo o title
// Touchable lida com partes que podem ser tocadas na tela, registrando eventos de toque
// TouchableOpacity dá um feedback visual quando ocorre um toque na tela
// TouchableNativeFeedback dá outro tipo de feedback visual, mas que só funciona no android


const GoalItem = props => {
  return (
    
    <TouchableOpacity activeOpacity={0.8} onPress={props.onDelete.bind(this, props.id)}>
      <View style={styles.listItem}>
        <Text>Goal: {props.title}</Text>
      </View>
    </TouchableOpacity>
  );


};

const styles = StyleSheet.create({

  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1
  },

});


export default GoalItem;