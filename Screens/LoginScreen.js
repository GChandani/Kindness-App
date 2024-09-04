import React from 'react';
import { Text, View, TouchableOpacity, AsyncStorage, StyleSheet } from 'react-native';
import { Button, Input } from "react-native-elements";
import { Constants, ShowAlert, ApiRequest, ShowApiMessage } from "../constants/Constants";
import { connect } from "react-redux";
import Loader from "../components/UI/Loader";
import { login, stateList, countryList } from "../store/actions/loginAction"

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.storeData = this.storeData.bind(this);
    this.state = {
      loading: false,
      apiResponse: [],
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    this.callCountryApi();
    this.callStateApi();
  }

  callCountryApi = async () => {
    const formData = new FormData();
    formData.append('action', 'countrylist');
    var apiData = await ApiRequest(formData)
    if (apiData.RESPONSECODE) {
      this.props.countryList(apiData.RESPONSE)
    }
  }

  callStateApi = async () => {
    const formData = new FormData();
    formData.append('action', 'statelist');
    var apiData = await ApiRequest(formData)
    if (apiData.RESPONSECODE) {
      this.props.stateList(apiData.RESPONSE)
    }
  }

  onClickListener = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.email == "" || reg.test(this.state.email) === false) {
      ShowAlert(Constants.alert.info, "Please Enter Email");
    } else if (this.state.password == "") {
      ShowAlert(Constants.alert.info, "Please Enter Password.");
    } else {
      this.apiCall();
    }
  }

  async apiCall() {
    const { navigation } = this.props;
    this.setState({ loading: true });
    const formData = new FormData();
    formData.append('action', 'login');
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    console.log(formData,"formData")
    var apiData = await ApiRequest(formData)

    console.log(apiData,"apiData")
    if (apiData.RESPONSECODE) {
      this.storeData(navigation, apiData);
      this.props.login(apiData)
    }
    else {
      ShowApiMessage(apiData.RESPONSECODE, apiData.message)
      this.setState({ loading: false });
    }
  }

  storeData = async (navigation, apiData) => {
    await AsyncStorage.clear();
    await AsyncStorage.setItem('userId', apiData.userID);
    await AsyncStorage.setItem('emailId', apiData.Email);
    await AsyncStorage.setItem('userName', apiData.Name);
    await AsyncStorage.setItem('countryId', apiData.countryId);
    await AsyncStorage.setItem('stateId', apiData.stateId);
    this.setState({ loading: false });
    navigation.navigate('CheckLogin');
  };

  render() {
    if(this.state.loading){
      return (
        <Loader/>
      )
    }else{
      return (
        <View style={styles.loginContainer}>
  
          <View style={styles.loginHeadingView}>
            <Text style={styles.loginText}>{"Login"}</Text>
          </View>
  
  
          <Input
            id="email"
            placeholder="Enter Email"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            multiline={false}
            onChangeText={(email) => this.setState({ email })}
            style={[styles.simpleText]}
          />
  
          <Input
            id="password"
            placeholder="Enter Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            multiline={false}
            autoCapitalize="none"
            errorText="Please enter a valid password"
            onChangeText={(password) => this.setState({ password })}
            style={styles.simpleText}
          />
  
          <Button
            loading={this.state.loading ? true : false}
            containerStyle={[styles.button, { marginTop: 20 }]}
            buttonStyle={styles.buttonstyle}
            title="Login"
            onPress={this.state.loading ? null : () => this.onClickListener('login')}
          />
  
  
          <View style={styles.bottomtext}>
            <Text style={[styles.simpleText, { color: Constants.colors.lightGrey }]}>Not Registered? </Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("SignUp")}><Text style={[styles.simpleText]}>Create an Account</Text></TouchableOpacity>
          </View>
  
          <View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("ForgotPassword")}><Text style={[styles.simpleText]}>Forgot Password</Text></TouchableOpacity>
          </View>
        </View>
      )
    }
   
  }
}


const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (apiData) => dispatch(login(apiData)),
    stateList: (apiData) => dispatch(stateList(apiData)),
    countryList: (apiData) => dispatch(countryList(apiData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Constants.colors.white,
    padding: 10
  },
  loginHeadingView: {
    paddingBottom: 30
  },
  loginText: {
    fontSize: Constants.colors.headerFontSize,
    fontWeight: Constants.colors.secondHeaderFontWeight,
    color: Constants.colors.drakGrey,
    lineHeight: 60
  },
  simpleText: {
    fontSize: Constants.colors.testFontSize,
    fontWeight: Constants.colors.secondHeaderFontWeight,
    color: Constants.colors.black,
    lineHeight: 20,
    paddingBottom: 0,
  },
  bottomtext: {
    flexDirection: "row",
    paddingTop: 20
  },
  buttonView: {
    justifyContent: "center",
    alignContent: "center",
    flex: 1
  },
  button: {
    width: 210,
    marginTop: 30,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 5,
  },
  buttonstyle: {
    borderRadius: 5,
    backgroundColor: Constants.colors.headerColor,
  }
});
