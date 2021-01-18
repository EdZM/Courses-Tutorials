
import React, { Component } from 'react';
import TouchID from 'react-native-touch-id';
import BiometricService from '../../services/biometricService';
import KeychainService from '../../services/keychainService';

let isFingerPrintSupported = BiometricService.checkBiometricSupportednEnrolled; 


import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  SafeAreaView
} from 'react-native';





class TouchIDExample extends React.Component {
  



  _pressHandler() {
    
    const optionalConfigObject = {
      title: 'Authentication Required', // Android
      imageErrorColor: '#ff0000', // Android
      sensorDescription: 'Touch sensor', // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: 'Cancel', // Android
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };
    
    
    TouchID.authenticate('to demo this react-native component', optionalConfigObject)
      .then(success => {
        Alert.alert('Authenticated Successfully');
      })
      .catch(error => {
        Alert.alert('Authentication Failed');
      });
  }
  _testSupport() {
    TouchID.isSupported()
      .then(supported => {
        //this._pressHandler();
        // Success code
        Alert.alert('Touch ID supported');
        //resolve(true);
      })
      .catch(error => {
        // Failure code
        Alert.alert('Touch ID not support');
        
      });
  }
  render() {
    
    
    return (
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#444"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#444"
        />
        <TouchableOpacity style={styles.button}>
          <Text>Entrar</Text>
        </TouchableOpacity>
        
        <TouchableHighlight style={styles.button} onPress={this._pressHandler}>
          <Text>Authenticate with Touch ID</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this._testSupport}>
          <Text> Test Support </Text>
        </TouchableHighlight>
        
      </SafeAreaView>
    
    );
  }
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#19181f',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 45,
    borderWidth: 2,
    borderColor: '#7159c1',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    width: 200,
    height: 45,
    borderWidth: 2,
    borderColor: '#7159c1',
    backgroundColor: '#7159c1',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default TouchIDExample ;