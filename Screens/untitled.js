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
      image_attachment: null,
      imageName: "No File Choosen",
    };
  }

  onClickListener = () => {
    // if (this.state.name == "") {
    //   ShowAlert(Constants.alert.info, "Please Enter Name");
    // } else if (this.state.age == "") {
    //   ShowAlert(Constants.alert.info, "Please Enter Age");
    // } else if (this.state.address == "") {
    //   ShowAlert(Constants.alert.info, "Please Enter Address");
    // } else if (this.state.contact == "") {
    //   ShowAlert(Constants.alert.info, "Please Enter Contact");
    // } else if (this.state.description == "") {
    //   ShowAlert(Constants.alert.info, "Please Enter Description");
    // } else {
    //   this.apiCall();
    // }
    this.apiCall();
  }

  async apiCall(path) {
    const { navigation } = this.props;
    this.setState({ loading: true });
    const formData = new FormData();
    formData.append('action', 'upload_files');
    formData.append('project_id', 270);
    // formData.append('name', this.state.name);
    // formData.append('description', this.state.description);
    // formData.append('age', this.state.age);
    // formData.append('address', this.state.address);
    // formData.append('contact', this.state.contact);
    // formData.append('countryId', this.props.countryId);
    // formData.append('stateId', this.props.stateId);
    // formData.append('userId', this.props.userId);

    // var { image_attachment } = this.state;
    // console.log(this.state.imageEdited,"this.state.imageEdited")
    // // formData.append('imageTest', imageUrl);
    // if (this.state.imageEdited) {
    //   let uriPart = imageUrl.split('.');
    //   let uriSlashPart = uriPart[1].split('/');
    //   let fileExtension = uriPart[uriPart.length - 1];
    //   let fileName = uriSlashPart[uriSlashPart.length - 1];
    //   formData.append('image', {
    //     uri: imageUrl,
    //     name: fileName + '.' + fileExtension,
    //     type: 'image/${fileExtension}'
    //   });
    //   // formData.append('image', imageUrl)
    // }
    // formData.append('image', {
    //   uri: this.state.image[0]
    // });
    // console.log(formData,"formData")

    // this.state.image_attachment.map((item, key) => {

    //   const uriPart = item.split('.');
    //   const uriSlashPart = uriPart[1].split('/');
    //   const fileExtension = uriPart[uriPart.length - 1];
    //   const fileName = uriSlashPart[uriSlashPart.length - 1];

    //   formData.append('file_attachment',{
    //     uri: item,
    //     name: fileName + '.' + fileExtension,
    //     type: 'image/${fileExtension}'
    //   });
    // })

    // if (this.state.imageEdited) {
    //   formData.append('avatarimage',
    //   { uri: path, name: 'ayush.jpg', type: 'image/jpeg' }
    //   );
    //  }

    const { avatarSource } = this.state;
    const uriPart = avatarSource.split('.');
    const fileExtension = uriPart[uriPart.length - 1];

    formData.append('image', {
      uri: avatarSource,
      name: uriPart[0] + '.' + fileExtension,
      type: 'image/' + fileExtension
    });

    console.log(formData, "formData")
    // var apiData = await ApiRequest(formData)

    var apiData = await ApiRequest(formData);
    if (apiData.status) {
      console.log(apiData, "apiData")
    } else {
      ShowApiMessage(apiData.status, apiData.message)
      this.setState({ loading: false })
    }


    // if (apiData.RESPONSECODE) {
    //   ShowApiMessage(apiData.RESPONSECODE, "Adoption added successfully");
    //   let adoptionList = this.props.adoptionCardData;
    //   adoptionList.unshift(apiData.DATA);
    //   this.props.setAdoptionData(adoptionList);
    //   navigation.navigate("Adoption");
    //   this.setState({ loading: false });
    // }
    // else {
    //   ShowApiMessage(apiData.RESPONSECODE, apiData.message)
    //   this.setState({ loading: false });
    // }
  }

  pickImage = () => {
    // ImagePicker.showImagePicker(
    //   {
    //     title: "Select Adoption Image",
    //     noData:true,mediaType:'photo'
    //     // storageOptions: { skipBackup: true, path: "images" },
    //     // allowsEditing: false,
    //     // aspect: [4, 3],
    //     // quality: 1
    //   }, (response) => {
    //     // console.log(response, "response")
    //     if (response && !response.didCancel) {
    //       // const source = { uri: response.uri };
    //       // var temp = this.state.image.concat(source.uri)
    //       this.setState({ image_attachment: response.uri, imageEdited: true, imageName: response.fileName }); //temp
    //     }
    // })

    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        //console.log('User cancelled photo picker');
      } else if (response.error) {
        //console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        //console.log('User tapped custom button: ', response.customButton);
      } else {
        // let source = { uri: response.uri };

        // Call Upload Function


        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        const source = { uri: response.uri };
        this.setState({ avatarSource: source.uri, imageEdited: true });
        this.apiCall(response.uri);

        // this.imageUpload(source);
      }
    });

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












import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, AsyncStorage, Linking } from 'react-native';
import { Constants, Styles, ShowAlert, ApiRequest, ShowApiMessage, Icon, ShowConfirm } from "../constants/Constants";
import ImagePicker from 'react-native-image-picker';

export default class Default extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      projectId: 270,
      apiResponse: [],
      image: '',
    };
  }

  async componentDidMount() {
    this.setState({
      userId: await AsyncStorage.getItem('userId'),
      userType: 2,
    })
    // this.reloadData();
  }


  // async reloadData() {
  //   const formData = new FormData();
  //   formData.append('action', 'get_files');
  //   formData.append('project_id', this.state.projectId);
  //   formData.append('user_id', this.state.userId);
  //   formData.append('user_type', this.state.user_type);
  //   var apiData = await ApiRequest(formData);
  //   if (apiData.status) {
  //     this.setState({ apiResponse: apiData, loading: false })
  //   }
  //   else {
  //     ShowApiMessage(apiData.status, apiData.message)
  //     this.setState({ loading: false })
  //   }
  // }

  // deleteFiles = async (id, type) => {
  //   this.setState({ loading: true })
  //   const formData = new FormData();
  //   formData.append('action', type);
  //   formData.append('image_id', id);
  //   var apiData = await ApiRequest(formData);
  //   if (apiData.status)
  //     this.reloadData();

  //   ShowApiMessage(apiData.status, apiData.message)
  //   this.setState({ loading: false })
  // }


  uploadFiles = async (response) => {
    this.setState({ loading: true })
    const formData = new FormData();
    formData.append('action', 'upload_files');
    formData.append('project_id', 295);

    // const { image } = this.state;
    // const uriPart = image.split('.');
    // const fileExtension = uriPart[uriPart.length - 1];

    formData.append('image', {
      // uri: image,
      // name: uriPart[0] + '.' + fileExtension,
      // type: 'image/' + fileExtension,
      uri: response.uri,
      type: response.type,
      name: response.fileName,
      // data: response.data
    });
    console.log(formData, "formData")
    var apiData = await ApiRequest(formData);
    console.log(apiData, "apiData")
    if (apiData.status) {
      this.reloadData();
    } else {
      ShowApiMessage(apiData.status, apiData.message)
      this.setState({ loading: false })
    }
  }

  pickImage = async () => {
    ImagePicker.showImagePicker({ title: "Select Avatar", aspect: [4, 3], quality: 1 }, (response) => {
      if (response && !response.didCancel) {
        console.log("ImagePicker", response);
        const source = { uri: response.uri };
        this.setState({ image: source.uri, imageEdited: true }, () => {
          this.uploadFiles(response)
        }
        )
      }
    })
  };

  renderItem = (data) =>

    <View style={[Styles.recordcontainer, {
      width: "25%", height: 100, marginHorizontal: 10,
      marginBottom: 10, padding: 10, flexWrap: "wrap", flexGrow: 1
    }]} >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <TouchableOpacity onPress={() => Linking.openURL(data.item.attachment)} >
            <Text style={Styles.dark} >{data.item.original_filename ? data.item.original_filename : 'File name not defined'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  render() {
    const { apiResponse } = this.state;



    return (
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10
      }}>
        {this.state.userType == 2 ?
          <TouchableOpacity onPress={this.pickImage} style={{ padding: 20, flexDirection: "row" }} >
            <Icon type="font-awesome" name={"plus"} size={16} color={Constants.colors.highlight} />
            <Text> {' '}Add New</Text>

          </TouchableOpacity> : null}
      </View>
    )


  }
}