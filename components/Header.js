import React from "react";
import { Header } from "react-native-elements";
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, View, StyleSheet, Text, Platform } from "react-native";
import { Constants } from "../constants/Constants";

class AppHeader extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (back ? navigation.goBack() : navigation.openDrawer());
  }
  renderRight = (props) => {
    const { title, navigation } = this.props;
    const { routeName } = navigation.state;
    switch (routeName) {
      case 'Login':
        return (
          <View></View>
        )
      case 'SignUp':
        return (
          <View style={{ paddingRight: 18 }}></View>
        )
      case 'ForgotPassword':
        return (
          <View style={{ paddingRight: 18 }}></View>
        )
        break;
      default:
        return (
          <View style={{ paddingRight: 18 }}></View>
        );
        break;
    }
  }
  render() {
    const { back, title, navigation } = this.props;
    return (
      <Header
        placement="left"
        leftComponent={
          navigation.state.routeName !== "Login" ? <TouchableOpacity style={styles.navigationIcon} onPress={() => back ? navigation.goBack() : navigation.openDrawer()} >
            <Icon
              name={back ? 'chevron-left' : "bars"}
              type="font-awesome"
              size={18}
              color={Constants.colors.black} />
          </TouchableOpacity> : null}
        centerComponent={<Text style={styles.headerTitle}>{title.toUpperCase()}</Text>}
        rightComponent={this.renderRight}
        containerStyle={{
          backgroundColor: Constants.colors.headerColor,
          justifyContent: 'center',
          marginTop: Platform.OS === 'ios' ? 0 : 0 //-24
        }}
      />
    );
  }
};

export default withNavigation(AppHeader);
const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 8,
    paddingVertical: Platform.OS === 'ios' ? 2 : 6,
    position: 'relative',
    marginTop: 12
  }, headerTitle: {
    color: Constants.colors.black,
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: 20,
    width: '100%'
  }, navigationIcon: {
    padding: 8,
  }, ncount: {
    backgroundColor: "#f00",
    paddingHorizontal: 5,
    paddingVertical: 0,
    borderRadius: 10,
    marginTop: -25,
    marginLeft: 5
  },
  notificationIconColor: {
    color: "#fff",
    fontSize: 14
  }
});