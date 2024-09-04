import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions, Platform, Text } from 'react-native';
import { Constants, ApiRequest, ShowApiMessage } from "../constants/Constants";
import Card from "../components/UI/Card";
import LogoutIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CardItem from "../components/CardItem";
import { setHomeData } from "../store/actions/HomeAction";
import Loader from "../components/UI/Loader";
import { connect } from "react-redux";

const window = Dimensions.get('window');

class OnlineForumScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refereshLoader: false,
      onlineForumList: [],
      count: 0
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.callOnlineListApi();
    this.setState({
      onlineForumList: this.props.homeCardData
    })
    this.focusPostListener = navigation.addListener('didFocus', () => {
      this.setState({ count: 0 });
      this.callOnlineListApi();
    });
  }

  componentWillUnmount() {
    this.focusPostListener.remove();
  }

  callOnlineListApi = async () => {
    const formData = new FormData();
    formData.append('action', 'postlist');
    formData.append('countryId', this.props.countryId);
    formData.append('stateId', this.props.stateId);
    formData.append('userId', this.props.userId);
    var apiData = await ApiRequest(formData)
    if (apiData.RESPONSECODE) {
      // this.props.setHomeData([
      //   {
      //     title: 'How much and how often does the pet eat,go outside,go to the toilet?',
      //     date: '29 Dec 2020',
      //     content: 'Social media type (facebook, twitter, google-plus-official, pinterest, linkedin, youtube, vimeo, tumblr, instagram, quora, foursquare, wordpress, stumbleupon, github, github-alt, twitch, medium, soundcloud, gitlab, angellist, codepen)'
      //   },
      //   {
      //     title: 'How much and how often does the pet eat,go outside,go to the toilet?',
      //     date: '29 Dec 2020',
      //     content: 'Social media type (facebook, twitter, google-plus-official, pinterest, linkedin, youtube, vimeo, tumblr, instagram, quora, foursquare, wordpress, stumbleupon, github, github-alt, twitch, medium, soundcloud, gitlab, angellist, codepen)'
      //   }])
      this.props.setHomeData(apiData.RESPONSE)
      this.setState({ loading: false, refereshLoader: false });
    }
    else {
      ShowApiMessage(apiData.RESPONSECODE, apiData.message)
      this.setState({ loading: false, refereshLoader: false });
    }
  }

  callCommentPage = (id) => {
    this.props.navigation.navigate("CommentScreen", { inboxId: id })
  }

  renderItem = ({ item }) => {
    return (
      <Card style={styles.cardMainContainer}><CardItem toptext={styles.cardToptext} centerText={styles.cardCentertext} moduleName={"OnlineForumList"} bottomtext={styles.cardBottomtext} title={item.title} date={item.date} content={item.description} itemId={item.id} openCommentPage={(id) => this.callCommentPage(id)} /></Card>
    )

  }

  renderNoDataAvaliable = ({ item }) => (
    <View style={styles.sharePhotoVideoContainer}>
      <Text style={styles.sharePhotoVideoText}>No Online Forum are Avaliable</Text>
    </View>
  )

  render() {
    if (this.state.loading) {
      return (
        <Loader />
      )
    } else {
      return (
        <View style={styles.homeContainer}>
          <View style={styles.cardContainer}>
            {this.props.homeCardData && Object.keys(this.props.homeCardData).length > 0 ?
              <FlatList
                data={this.props.homeCardData}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index}
                onRefresh={() => this.callOnlineListApi(this.setState({ refereshLoader: true }))}
                refreshing={this.state.loading}
              /> : <FlatList
                data={[{}]}
                renderItem={this.renderNoDataAvaliable}
                keyExtractor={(item, index) => index}
                onRefresh={() => this.callOnlineListApi(this.setState({ refereshLoader: true }))}
                refreshing={this.state.loading}
              />
            }
          </View>
          <View style={styles.addBottomContainer}>
            <TouchableOpacity style={styles.bottomContainerView}
              onPress={() => this.props.navigation.navigate("OnlineFormScreen")}>
              <LogoutIcon name="plus-thick" size={25} color={Constants.colors.white} />
            </TouchableOpacity>
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
)(OnlineForumScreen);

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Constants.colors.white
  },
  cardContainer: {
    paddingBottom: 20,
    paddingTop: 20
  },
  cardMainContainer: {
    width: Platform.OS === "ios" ? window.width - 10 : window.width - 10,
  },
  cardToptext: {
    fontSize: 20,
    fontWeight: "400",
    color: "#373737",
    textAlign: "left"
  },
  cardCentertext: {
    fontSize: 15,
    paddingTop: 0,
    color: Constants.colors.homePageBlurTextColor,
  },
  cardBottomtext: {
    fontSize: 15,
    paddingTop: 10,
    color: Constants.colors.homePageBlurTextColor,
    lineHeight: Constants.colors.cardDetailLineHeight
  },
  sharePhotoContainer: {
    paddingTop: 10
  },
  sharePhotoVideoContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: window.height / 1.5
  },
  shareFirstPhotoContainer: {
    paddingTop: 40,
    paddingBottom: 5
  },
  sharePhotoText: {
    fontSize: 20,
    color: Constants.colors.homePageBlurTextColor,
  },
  sharePhotoVideoText: {
    fontSize: 15,
    color: Constants.colors.homePageBlurTextColor,
  },
  shareFirstPhotoText: {
    fontSize: 15,
    color: "#6ECCDD",
  },
  addBottomContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'flex-end',
    paddingRight: 20,
    paddingBottom: 20
  },
  bottomContainerView: {
    borderRadius: 30,
    width: 55,
    height: 55,
    borderColor: Constants.colors.headerColor,
    backgroundColor: Constants.colors.headerColor,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
