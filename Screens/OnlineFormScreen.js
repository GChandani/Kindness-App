import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Constants, Icon, ApiRequest, ShowApiMessage, ShowAlert } from "../constants/Constants";
import { Button, Input } from "react-native-elements";
import { setHomeData } from "../store/actions/HomeAction";
import { connect } from "react-redux";
import ImagePicker from 'react-native-image-picker';

var RNFS = require('react-native-fs')

class OnlineForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      title: "",
      description: "",
      imageEdited: false,
      imageUrl: "",
      imageName: "No File Choosen",
      imageType: ""
    };
  }

  onClickListener = () => {
    if (this.state.title == "") {
      ShowAlert(Constants.alert.info, "Please Enter Title");
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
    formData.append('action', 'addpost');
    formData.append('title', this.state.title);
    formData.append('description', this.state.description);
    formData.append('countryId', this.props.countryId);
    formData.append('stateId', this.props.stateId);
    formData.append('userId', this.props.userId);

    var { imageUrl, imageType, imageName } = this.state;
    if (this.state.imageEdited) {
      formData.append('image', {
        uri: imageUrl,
        name: imageName,
        type: imageType
      });
    }
    var apiData = await ApiRequest(formData)
    if (apiData.RESPONSECODE) {
      ShowApiMessage(apiData.RESPONSECODE, "Post added successfully");
      let postList = this.props.homeCardData;
      postList.unshift(apiData.Data);
      this.props.setHomeData(postList);
      navigation.navigate("OnlineForum")
      this.setState({ loading: false });
    }
    else {
      ShowApiMessage(apiData.RESPONSECODE, apiData.message)
      this.setState({ loading: false });
    }
  }

  pickImage = async () => {
    ImagePicker.showImagePicker(
      {
        title: "Select Online Forum Image",
        storageOptions: { skipBackup: true, path: "images" },
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1
      }, (response) => {
        if (response && !response.didCancel) {
          const source = { uri: response.uri };
          this.setState({ imageUrl: source.uri, imageEdited: true, imageName: response.fileName, imageType: response.type  });
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
            id="title"
            placeholder="Enter Title / Your Question"
            keyboardType="default"
            style={styles.textInput}
            required
            multiline={false}
            onChangeText={(title) => this.setState({ title })}
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
            containerStyle={[styles.button, { marginTop: 0, marginLeft: 25 }]}
            buttonStyle={styles.buttonstyle}
            title="Submit"
            onPress={this.state.loading ? null : () => this.onClickListener('onlineForm')}
          />

        </View>
      </ScrollView>
    )
  }
}


const mapStateToProps = state => {
  return {
    homeCardData: state.home.homeCardData,
    userId: state.auth.userId,
    countryId: state.auth.countryId,
    stateId: state.auth.stateId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setHomeData: (homeData) => dispatch(setHomeData(homeData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnlineForm);

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

