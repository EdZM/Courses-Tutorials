import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


// a tag view servirá para apresentar todo bloco visual
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Helloooo</Text>
      <StatusBar style="auto" />
    </View>
  );
}

// O native nao lida com herança de estilos, ou seja, os filhos de uma tag nao herdam o estilo da tag pai, por isso é preciso criar estilos especificos para os filhos
const styles = StyleSheet.create({
  
  // TODOS os estilos são escritos em JS e nao CSS
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
