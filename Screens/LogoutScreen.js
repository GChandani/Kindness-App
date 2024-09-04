import React from 'react';
import { AsyncStorage } from 'react-native';
import Loader from "../components/UI/Loader";

class LogoutScreen extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.checkLogin();
  }

  checkLogin = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('CheckLogin');
  };

  render() {
    return (
      <Loader />
    );
  }
}
export default LogoutScreen;
