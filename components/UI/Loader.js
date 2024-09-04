import React from 'react';
import { StyleSheet, ActivityIndicator, View, Text } from "react-native";

const Loadder = props => {
  return (
    <View style={styles.spinnerTextStyle}>
      <ActivityIndicator size="large" color="#156798" />
      <Text>Loading</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: 'center'
  }
});

export default Loadder;