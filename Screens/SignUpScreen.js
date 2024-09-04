import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Constants, Icon, ApiRequest, ShowApiMessage, ShowAlert } from "../constants/Constants";
import { Button, Input } from "react-native-elements";
import { connect } from "react-redux";
import { stateList, countryList } from "../store/actions/loginAction";
import RNPickerSelect from 'react-native-picker-select';

class SignUpScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      apiResponse: [],
      fullName: '',
      mobileNumber: '',
      emailId: '',
      password: '',
      country: [],
      state: [],
      countryId: '',
      stateId: '',
    };
  }

  componentDidMount() {
    this.callCountryApi();
    this.callStateApi();
    this.setState({ country: this.props.countryName, state: [] });
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
    if (this.state.fullName == "") {
      ShowAlert(Constants.alert.info, "Please Enter Name");
    } else if (this.state.mobileNumber == "") {
      ShowAlert(Constants.alert.info, "Please Enter Mobile Number");
    } else if (this.state.emailId == "" || reg.test(this.state.emailId) === false) {
      ShowAlert(Constants.alert.info, "Please Enter Email");
    } else if (this.state.password == "") {
      ShowAlert(Constants.alert.info, "Please Enter Password");
    } else if (this.state.countryId == "") {
      ShowAlert(Constants.alert.info, "Please Select Country");
    } else if (this.state.stateId == "") {
      ShowAlert(Constants.alert.info, "Please Select State");
    } else {
      this.apiCall();
    }
  }

  async apiCall() {
    const { navigation } = this.props;
    this.setState({ loading: true });

    const formData = new FormData();
    formData.append('action', 'signup');
    formData.append('name', this.state.fullName);
    formData.append('mobile', this.state.mobileNumber);
    formData.append('email', this.state.emailId);
    formData.append('password', this.state.password);
    formData.append('countryId', this.state.countryId);
    formData.append('stateId', this.state.stateId);
    var apiData = await ApiRequest(formData)
    if (apiData.RESPONSECODE) {
      ShowApiMessage(apiData.RESPONSECODE, "SignUp Successfull");
      navigation.navigate("Login")
    }
    else {
      ShowApiMessage(apiData.RESPONSECODE, apiData.message)
      this.setState({ loading: false });
    }
  }

  setStateArray = (countryId) => {
    let stateList = this.props.stateName;
    stateList = stateList.filter(e => e.countryId === countryId);
    this.setState({ state: stateList, stateId: 0 })
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.loginContainer}>

          <View style={styles.loginHeadingView}>
            <Text style={styles.loginText}>Signup</Text>
          </View>

          <Input
            id="fullName"
            placeholder="Enter Full Name"
            keyboardType="default"
            required
            multiline={false}
            errorText="Please enter a full name"
            style={[styles.simpleText]}
            onChangeText={(fullName) => this.setState({ fullName })}
            initialValue="" />

          <Input id="mobileNumber"
            placeholder="Enter Mobile Number"
            keyboardType="decimal-pad"
            required
            multiline={false}
            errorText="Please enter a Mobile Number"
            style={[styles.simpleText]}
            onChangeText={(mobileNumber) => this.setState({ mobileNumber })}
            initialValue="" />

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

          <Input id="password"
            placeholder="Enter Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            multiline={false}
            autoCapitalize="none"
            errorText="Please enter a valid password"
            style={[styles.simpleText]}
            onChangeText={(password) => this.setState({ password })}
            initialValue="" />

          <View style={styles.pickercontainer}>
            <RNPickerSelect
              onValueChange={(itemValue, itemIndex) => {
                if (itemIndex > 0) {
                  this.setStateArray(itemValue)
                  this.setState({ countryId: itemValue })
                }
              }}
              value={this.state.countryId}
              textInputProps={{ fontSize: 16 }}
              placeholder={{ label: 'Select Country', value: 0 }}
              Icon={() => { return <Icon style={styles.pickericon} name={"sort-desc"} size={16} type="font-awesome" color={`#86939e`} />; }}
              items={this.state.country.map((item, key) => ({ label: item.label, value: item.value }))} />
          </View>

          <View style={styles.pickercontainer}>
            <RNPickerSelect
              onValueChange={(itemValue, itemIndex) => {
                if (itemIndex > 0) {
                  this.setState({ stateId: itemValue })
                }
              }}
              value={this.state.stateId}
              textInputProps={{ fontSize: 16 }}
              placeholder={{ label: 'Select State', value: 0 }}
              Icon={() => { return <Icon style={styles.pickericon} name={"sort-desc"} size={16} type="font-awesome" color={`#86939e`} />; }}
              items={this.state.state.map((item, key) => ({ label: item.label, value: item.value }))} />
          </View>

          <Button
            loading={this.state.loading ? true : false}
            containerStyle={[styles.button, { marginTop: 20 }]}
            buttonStyle={styles.buttonstyle}
            title="Register"
            onPress={this.state.loading ? null : () => this.onClickListener('signUp')}
          />

          <View style={styles.bottomtext}>
            <Text style={[styles.simpleText, { color: Constants.colors.lightGrey }]}>Existing User? </Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}><Text style={[styles.simpleText]}>Login Here</Text></TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    )
  }
}


const mapStateToProps = state => {
  return {
    countryName: state.auth.country,
    stateName: state.auth.states,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    stateList: (apiData) => dispatch(stateList(apiData)),
    countryList: (apiData) => dispatch(countryList(apiData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpScreen);

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
  },
  pickercontainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#86939e",
    width: "95%",
    height: 50,
    paddingVertical: Platform.OS === 'ios' ? 12 : 6,
    paddingHorizontal: Platform.OS === 'ios' ? 10 : 0,
  },
  pickericon: {
    marginTop: Platform.OS === 'ios' ? 0 : 12,
  }
});

