import { StyleSheet, Platform, Alert, ActivityIndicator, View, Text } from 'react-native'
import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');
import Icon from 'react-native-vector-icons/FontAwesome';
const Constants = {
  api: {
    url: "http://www.jeetudyog.com/kindness/app/api/service.php?action=",
    url1: "https://prollabo.com/api/",
  },
  colors: {
    primary: "#156798",
    highlight: "#f2b029",
    screenbg: "#ffffff",
    textlight: "#ffffff",
    textdark: "#000",
    border: "#e0e0e0",
    inputicon: "#156798",
    tabactive: "#000",
    tabinactive: "#979797",
    white: '#fff',
    black: '#000',
    lightGrey: "#808080",
    drakGrey: "#545252",
    buttonColor: "#FECAC2",
    buttonHeighlightColor: "#FE9E8E",
    loginContainerColor: "#F5FCFF",
    iconColor: "#FEBDB5",
    headerColor: "#FE9E8E",
    homePageBlurTextColor: "#828282",
    headerFontWeight: "600",
    secondHeaderFontWeight: "500",
    sideDrawerFontWeight: "700",
    headerFontSize: 30,
    buttonFontSize: 20,
    homeFontSize: 20,
    testFontSize: 15,
    errorColor: "#D8000C",
    erroFontSize: 13,
    sideDrawerTextColor: "#656566",
    sideDrawerFontSize: 16,
    cardDetailLineHeight: 20,
    addButton: "#B82B27",
    emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  alert: {
    error: "Error",
    info: "Information",
    success: "Success",
    ok: "OK",
  }, message: {
    norecord: "No Records Found",
    apierror: "Something went wrong with API."
  }
};


const ShowAlert = (type, message) => {
  Alert.alert(type, message);
}

const ShowApiMessage = (status, message) => {
  ShowAlert(status ? Constants.alert.success : Constants.alert.error, message)
}


const ShowConfirm = (message, id, func, type = "") => {
  Alert.alert(
    Constants.alert.confirm,
    message,
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Yes", onPress: () => func(id, type) }
    ],
    { cancelable: false }
  );
}

const ApiRequest = (formData) => {
  return fetch(Constants.api.url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "multipart/form-data" }),
    body: formData,
  })
    .then(response => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch(error => {
      return { status: 0, message: Constants.message.apierror }
    })
}


export { Constants, Icon, ShowAlert, ApiRequest, ShowApiMessage, ShowConfirm }