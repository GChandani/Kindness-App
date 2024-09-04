import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions, Platform, Text } from 'react-native';
import { Constants, ApiRequest, ShowApiMessage, ShowAlert } from "../constants/Constants";
import Card from "../components/UI/Card";
import LogoutIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CardItem from "../components/CardItem";
import { setHomeData } from "../store/actions/HomeAction";
import Loader from "../components/UI/Loader";
import { connect } from "react-redux";
import { Button, Input } from "react-native-elements";

const window = Dimensions.get('window');

class CommentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refereshLoader: false,
      isRefreshing: false,
      count: 0,
      buttonLoading: false,
      inboxId: props.navigation.getParam('inboxId'),
      apiResponse: [],
      message: ""
    };
  }

  componentDidMount() {
    this.reloadData();
  }

  async reloadData() {
    const formData = new FormData();
    formData.append('action', 'commentlist');
    formData.append('countryId', this.props.countryId);
    formData.append('stateId', this.props.stateId);
    formData.append('userId', this.props.userId);
    formData.append('postId', this.state.inboxId)
    var apiData = await ApiRequest(formData);
    console.log(apiData, "apiData", formData)
    if (apiData.RESPONSECODE) {
      this.setState({ apiResponse: apiData.RESPONSE.reverse(), loading: false })
    } else {
      ShowApiMessage(apiData.RESPONSECODE, apiData.message)
    }
  }

  onClickListener = (viewId) => {
    if (this.state.message == "") {
      ShowAlert(Constants.alert.info, "Message Required.");
    }
    else {
      this.addMessage();
    }
  }

  async addMessage() {
    this.setState({ buttonLoading: true });
    const formData = new FormData();
    formData.append('action', 'addcomment');
    formData.append('countryId', this.props.countryId);
    formData.append('stateId', this.props.stateId);
    formData.append('userId', this.props.userId);
    formData.append('postId', this.state.inboxId)
    formData.append('description', this.state.message);
    var apiData = await ApiRequest(formData);
    if (apiData.RESPONSECODE) {
      this.reloadData();
      this.setState({ buttonLoading: false, message: '' });
    } else {
      ShowApiMessage(apiData.RESPONSECODE, apiData.message)
      this.setState({ buttonLoading: false, message: '' });
    }
  }

  renderItem = (data) => {
    return (
      <TouchableOpacity style={styles.recordcontainer}  >
        <View style={{ flexDirection: "row" }}>
          {/* <View style={{ width: "25%" }}>
              <Image style={[Styles.avatar,]} source={{ uri: data.item.image }} />
           </View> */}
          <View style={{ width: "75%" }}>
            {/* <Text style={Styles.dark}  >{data.item.name} </Text> */}
            <Text style={{
              lineHeight: 22,
              fontSize: 11,
            }}>{data.item.description}</Text>
            <Text style={{
              lineHeight: 22,
              fontSize: 11,
            }}>{data.item.date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }


  render() {
    const { navigation } = this.props;
    if (this.state.loading) {
      return (
        <Loader />
      )
    } else {
      return (
        <View style={styles.homeContainer}>
          <View style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingTop: 10
          }}>
            <FlatList
              data={this.state.apiResponse}
              renderItem={item => this.renderItem(item, navigation)}
              onRefresh={this.reloadData}
              refreshing={this.state.isRefreshing}
              keyExtractor={item => item.id.toString()}
            />

            <View style={{ paddingHorizontal: 10, flexDirection: 'row' }}>
              <View style={{ width: '70%' }}>

                <Input
                  inputContainerStyle={styles.inputContainerStyle}
                  inputStyle={styles.textStyle}
                  id="title"
                  placeholder="Enter your comment"
                  keyboardType="default"
                  style={{ ...styles.textInput }}
                  required
                  multiline={false}
                  onChangeText={(message) => this.setState({ message })}
                  initialValue="" />
              </View>

              <View style={{ width: '30%' }}>
                <Button
                  loading={this.state.buttonLoading ? true : false}
                  buttonStyle={[{
                    paddingVertical: 5, borderRadius: 5,
                    backgroundColor: Constants.colors.headerColor
                  }]}
                  title="Send"
                  onPress={this.state.buttonLoading ? null : () => this.onClickListener('message')}
                />
              </View>
            </View>

          </View>
        </View>
      )
    }
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
)(CommentScreen);

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Constants.colors.white
  },
  inputContainerStyle: {
    borderBottomWidth: 0
  },
  textStyle: {
    fontSize: 16,
    // height: 10
  },
  recordcontainer: {
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Constants.colors.border,
    padding: 10
  },
  textInput: {
    padding: 8,
    borderWidth: 0.5,
    marginLeft: 0,
    marginRight: 0,
  }
});
