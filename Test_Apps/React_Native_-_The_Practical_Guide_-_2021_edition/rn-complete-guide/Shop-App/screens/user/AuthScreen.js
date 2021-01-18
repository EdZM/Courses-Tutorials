import React from 'react';
import {Button, ScrollView, View, KeyboardAvoidingView, StyleSheet} from 'react-native';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import {LinearGradient} from 'expo-linear-gradient';

const AuthScreen = prop => {
  return (
    <KeyboardAvoidingView
      behavior= "padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input 
              id="email" 
              label="E-Mail" 
              keyboardType="email-address" 
              required 
              email
              autoCapitalize="none"
              errorMessage="Please enter a valid email address."
              onValueChange={() => {}}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry // omite o que está sendo digitado
              required
              minLength={5}
              autoCapitalize="none"
              errorMessage="Please enter a valid password."
              onInputChange={() => { }}
              initialValue=""
            />
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button title="Login" color={Colors.primary} onPress={ } />
          </View>  
          
          <View style={styles.buttonContainer}>
            <Button title="Switch to Sign up" color={Colors.accent} onPress={ } />
          </View>
          
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
)};


AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate',
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContainer: {
    width:'80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,    
  },
  gradient:{
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer:{
    margin: 10,

  },

});

export default AuthScreen;