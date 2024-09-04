import React from 'react';
import { AsyncStorage } from 'react-native';
import Loader from "../components/UI/Loader";
import { setHomeData } from "../store/actions/HomeAction";
import { ApiRequest } from "../constants/Constants";
import { connect } from "react-redux";
import { login } from "../store/actions/loginAction"

class CheckLoginScreen extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.checkLogin();
  }

  checkLogin = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const countryId = await AsyncStorage.getItem('countryId');
    const stateId = await AsyncStorage.getItem('stateId');
    const emailId =await AsyncStorage.getItem('emailId');
    const userName =await AsyncStorage.getItem('userName');

    if ((userId !== null)) {
      const formData = new FormData();
      formData.append('action', 'postlist');
      formData.append('countryId', countryId);
      formData.append('stateId', stateId);
      formData.append('userId', userId);
      var apiData = await ApiRequest(formData)
      if (apiData.RESPONSECODE) {
        this.props.setHomeData([
          {
            title: 'How much and how often does the pet eat,go outside,go to the toilet?',
            date: '29 Dec 2020',
            content: 'Social media type (facebook, twitter, google-plus-official, pinterest, linkedin, youtube, vimeo, tumblr, instagram, quora, foursquare, wordpress, stumbleupon, github, github-alt, twitch, medium, soundcloud, gitlab, angellist, codepen)'
          },
          {
            title: 'How much and how often does the pet eat,go outside,go to the toilet?',
            date: '29 Dec 2020',
            content: 'Social media type (facebook, twitter, google-plus-official, pinterest, linkedin, youtube, vimeo, tumblr, instagram, quora, foursquare, wordpress, stumbleupon, github, github-alt, twitch, medium, soundcloud, gitlab, angellist, codepen)'
          }])
      }
      this.props.login({userID:userId,Email:emailId,Name:userName,countryId:countryId,stateId:stateId})
      this.props.navigation.navigate('Consultant');
    }
    else {
      this.props.navigation.navigate('Login');
    }
  };

  render() {
    return (<Loader />);
  }
}
const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    countryId: state.auth.countryId,
    stateId: state.auth.stateId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (apiData) => dispatch(login(apiData)),
    setHomeData: (homeData) => dispatch(setHomeData(homeData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckLoginScreen);

