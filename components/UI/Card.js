import React, { Text } from 'react';
import { View, StyleSheet } from 'react-native';
import { Constants } from "../../constants/Constants";

const Card = props => {

  return (
    <View style={{ ...props.card, ...props.style }}>
      {props.children}
    </View>
  );
};


const styles = StyleSheet.create({
  card: {

  }
});

export default Card;
