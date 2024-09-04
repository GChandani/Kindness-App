import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Constants, ApiRequest, ShowApiMessage, ShowAlert } from "../constants/Constants";
import { Button, Input } from "react-native-elements";

class ForgotScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      emailId: '',
    };
  }

  onClickListener = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.emailId == "" || reg.test(this.state.emailId) === false) {
      ShowAlert(Constants.alert.info, "Please Enter Email");
    } else {
      this.apiCall();
    }
  }

  async apiCall() {
    const { navigation } = this.props;
    this.setState({ loading: true });

    const formData = new FormData();
    formData.append('action', 'forgot');
    formData.append('email', this.state.emailId);
    var apiData = await ApiRequest(formData)
    if (apiData.RESPONSECODE) {
      ShowApiMessage(apiData.RESPONSECODE, "Forgot Successfull");
      navigation.navigate("Login")
    }
    else {
      ShowApiMessage(apiData.RESPONSECODE, apiData.message)
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.loginContainer}>

          <View style={styles.loginHeadingView}>
            <Text style={styles.loginText}>Forgot Password</Text>
          </View>

          <Input id="emailId"
            placeholder="Enter Email"
            keyboardType="email-address"
            required
            email
            multiline={false}
            errorText="Please enter a valid email address"
            style={[styles.simpleText]}
            onChangeText={(emailId) => this.setState({ emailId })}
            initialValue="" />

          <Button
            loading={this.state.loading ? true : false}
            containerStyle={[styles.button, { marginTop: 20 }]}
            buttonStyle={styles.buttonstyle}
            title="Submit"
            onPress={this.state.loading ? null : () => this.onClickListener('signUp')}
          />

          <View style={styles.bottomtext}>
            <Text style={[styles.simpleText, { color: Constants.colors.lightGrey }]}>Not Register? </Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("SignUp")}><Text style={[styles.simpleText]}>Create an account</Text></TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}><Text style={[styles.simpleText]}>Login here</Text></TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    )
  }
}


export default ForgotScreen

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
    marginBottom: 0
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

