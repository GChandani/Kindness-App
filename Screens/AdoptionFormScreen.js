import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Constants, Icon, ApiRequest, ShowApiMessage, ShowAlert } from "../constants/Constants";
import { Button, Input } from "react-native-elements";
import { connect } from "react-redux";
import { setAdoptionData } from "../store/actions/AdoptionAction";
import ImagePicker from 'react-native-image-picker';

class SignUpScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: "",
      description: "",
      age: "",
      address: "",
      contact: "",
      imageEdited: false,
      imageUrl: "",
      imageName: "No File Choosen",
      imageType:""
    };
  }

  onClickListener = () => {
    if (this.state.name == "") {
      ShowAlert(Constants.alert.info, "Please Enter Name");
    } else if (this.state.age == "") {
      ShowAlert(Constants.alert.info, "Please Enter Age");
    } else if (this.state.address == "") {
      ShowAlert(Constants.alert.info, "Please Enter Address");
    } else if (this.state.contact == "") {
      ShowAlert(Constants.alert.info, "Please Enter Contact");
    } else if (this.state.description == "") {
      ShowAlert(Constants.alert.info, "Please Enter Description");
    } else {
      this.apiCall();
    }
  }

  async apiCall() {
    const { navigation } = this.props;
    this.setState({ loading: true });
    const formData = new FormData();
    formData.append('action', 'addadoption');
    formData.append('name', this.state.name);
    formData.append('description', this.state.description);
    formData.append('age', this.state.age);
    formData.append('address', this.state.address);
    formData.append('contact', this.state.contact);
    formData.append('countryId', this.props.countryId);
    formData.append('stateId', this.props.stateId);
    formData.append('userId', this.props.userId);

    var { imageUrl, imageType,imageName } = this.state;
    if (this.state.imageEdited) {
      formData.append('image', {
        uri: imageUrl,
        name: imageName,
        type: imageType
      });
    }
    var apiData = await ApiRequest(formData);
    if (apiData.RESPONSECODE) {
      ShowApiMessage(apiData.RESPONSECODE, "Adoption added successfully");
      let adoptionData = this.props.adoptionCardData;
      adoptionData.unshift(apiData.Data);
      this.props.setAdoptionData(adoptionData);
      navigation.navigate("Adoption");
      this.setState({ loading: false });
    } else {
      ShowApiMessage(apiData.status, apiData.message)
      this.setState({ loading: false })
    }

  }

  pickImage = () => {
    ImagePicker.showImagePicker(
      {
        title: "Select Adoption Image",
        storageOptions: { skipBackup: true, path: "images" },
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1
      }, (response) => {
        if (response && !response.didCancel) {
          const source = { uri: response.uri };
          this.setState({ imageUrl: source.uri, imageEdited: true, imageName: response.fileName, imageType: response.type });
        }
      })
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.adoptionFormContainer}>

          <Input
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.textStyle}
            id="dogName"
            placeholder="Enter Name"
            keyboardType="default"
            style={styles.textInput}
            required
            multiline={false}
            onChangeText={(name) => this.setState({ name })}
            initialValue="" />

          <Input
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.textStyle}
            id="dogAge"
            placeholder="Enter Age"
            keyboardType="decimal-pad"
            style={styles.textInput}
            required
            multiline={false}
            onChangeText={(age) => this.setState({ age })}
            initialValue="" />

          <Input
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.textStyle}
            id="address"
            placeholder="Enter Address"
            keyboardType="default"
            style={styles.textInput}
            required
            multiline={false}
            onChangeText={(address) => this.setState({ address })}
            initialValue="" />


          <Input
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.textStyle}
            id="contactDetail"
            placeholder="Enter Contact Detail"
            keyboardType="decimal-pad"
            style={styles.textInput}
            required
            multiline={false}
            onChangeText={(contact) => this.setState({ contact })}
            initialValue="" />

          <Input
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.textStyle}
            id="description"
            placeholder="Enter Description"
            keyboardType="default"
            style={{ ...styles.textInput, height: 100 }}
            numberOfLines={5}
            textAlignVertical='top'
            multiline={true}
            onChangeText={(description) => this.setState({ description })}
            required
            initialValue="" />

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={[styles.ButtonContainer, { marginBottom: 20, backgroundColor: "#e7e7e7", width: 150, height: 30 }]} activeOpacity={0.6} underlayColor={Constants.colors.headerColor} onPress={() => this.pickImage()} >
              <View style={styles.buttonView}>
                <Text style={[styles.buttonViewText, { color: Constants.colors.black, fontWeight: "400" }]}>Choose File</Text>
              </View>
            </TouchableOpacity>
            <Text style={{ paddingTop: 5, paddingLeft: 5 }}>{this.state.imageName}</Text>
          </View>

          <Button
            loading={this.state.loading ? true : false}
            containerStyle={[styles.button, { marginTop: 10, marginLeft: 25, marginBottom: 20 }]}
            buttonStyle={styles.buttonstyle}
            title="Submit"
            onPress={this.state.loading ? null : () => this.onClickListener('adoptionForm')}
          />

        </View>
      </ScrollView>
    )
  }
}


const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    countryId: state.auth.countryId,
    stateId: state.auth.stateId,
    adoptionCardData: state.adoption.adoptionCardData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAdoptionData: (adoptionData) => dispatch(setAdoptionData(adoptionData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpScreen);

const styles = StyleSheet.create({
  adoptionFormContainer: {
    flex: 1,
    backgroundColor: Constants.colors.loginContainerColor,
    paddingTop: 30,
  },
  inputContainerStyle: {
    borderBottomWidth: 0
  },
  textStyle: {
    fontSize: 16,
    // height: 20
  },
  textInput: {
    padding: 10,
    borderWidth: 0.5,
    marginLeft: 15,
    marginRight: 15,
  },
  ButtonContainer: {
    height: 40,
    width: 100,
    borderRadius: 5,
    marginLeft: 25,
  },
  buttonView: {
    justifyContent: "center",
    alignContent: "center",
    flex: 1
  },
  buttonViewText: {
    color: Constants.colors.white,
    fontSize: Constants.colors.testFontSize,
    textAlign: "center",
    fontWeight: Constants.colors.headerFontWeight
  },
  button: {
    width: 100,
    shadowRadius: 0,
    shadowOpacity: 0,
    borderRadius: 5,
  },
  buttonstyle: {
    borderRadius: 5,
    backgroundColor: Constants.colors.headerColor,
  },
});