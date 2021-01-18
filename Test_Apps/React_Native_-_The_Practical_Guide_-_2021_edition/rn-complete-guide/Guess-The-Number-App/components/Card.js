import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card = props => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View> // rever!!
  );

};

const styles = StyleSheet.create({
  card: {
    // shadow só funciona no iOS
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,

    // elevation só funciona no android
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },



});

export default Card;