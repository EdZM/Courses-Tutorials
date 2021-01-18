import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

// No react Native não há tag com significado semantico, como aquelas do HTML, como h1, div,... .Além disso, elas nao tem estilização propria
// Em vez disso há tags especificas do react native
// Nao ha herança de estilização

import Routes from './src/routes';


YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);


export default function App() {
  return (
    <> 
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Routes />
    </>
  );
}

