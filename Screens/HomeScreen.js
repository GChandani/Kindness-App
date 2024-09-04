import React from 'react';
import { View, StyleSheet, Text, FlatList, Dimensions, Platform } from 'react-native';
import { Constants, ApiRequest, ShowApiMessage } from "../constants/Constants";
import Card from "../components/UI/Card";
import SidebarIcon from 'react-native-vector-icons/MaterialIcons';
import CardItem from "../components/CardItem";
import { setHomeData } from "../store/actions/HomeAction";
import Loader from "../components/UI/Loader";
import { connect } from "react-redux";
import { TouchableOpacity } from 'react-native-gesture-handler';

const window = Dimensions.get('window');

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refereshLoader: false,
      homeList: []
    };
  }

  componentDidMount() {
    this.callHomeListApi();
    this.setState({ loading: true });
    this.setState({
      homeList: this.props.homeCardData
    })
  }

  callHomeListApi = async () => {
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
      // ShowApiMessage(apiData.RESPONSECODE, apiData.message)
      this.setState({ loading: false, refereshLoader: false });
    }
  }

  renderItem = ({ item }) => (
    <Card style={styles.cardMainContainer}><CardItem toptext={styles.cardToptext} centerText={styles.cardCentertext} bottomtext={styles.cardBottomtext} title={item.title} date={item.date} content={item.description} /></Card>
  )

  renderNoDataAvaliable = ({ item }) => (
    <View style={styles.sharePhotoVideoContainer}>
      <Text style={styles.sharePhotoVideoText}>No Posts are Avaliable</Text>
    </View>
  )

  FlatListHeader = () => (
    <View>
      <View style={{ paddingTop: 20, paddingBottom: 20, justifyContent: "center", flexDirection: "row" }}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("OnlineFormScreen")}>
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle}>
              <SidebarIcon name="add" size={50} color={Constants.colors.white} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.sharePhotoContainer}>
        <Text style={styles.sharePhotoText}>Share Uploads</Text>
      </View>
      <View style={styles.sharePhotoVideoContainer}>
        <Text style={[styles.sharePhotoVideoText, { paddingHorizontal: 8 }]}>when you share Uploads or questions, they'll appear on your profile</Text>
      </View>
      <TouchableOpacity onPress={() => this.props.navigation.navigate("OnlineFormScreen")}>
        <View style={styles.shareFirstPhotoContainer}>
          <Text style={styles.shareFirstPhotoText}>Share your first upload</Text>
        </View>
      </TouchableOpacity>
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
                ListHeaderComponent={this.FlatListHeader}
                onRefresh={() => this.callHomeListApi(this.setState({ refereshLoader: true }))}
                refreshing={this.state.loading}
              /> :
              <FlatList
                data={[{}]}
                renderItem={this.renderNoDataAvaliable}
                keyExtractor={(item, index) => index}
                ListHeaderComponent={this.FlatListHeader}
                onRefresh={() => this.callHomeListApi(this.setState({ refereshLoader: true }))}
                refreshing={this.state.loading}
              />
            }
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
)(HomeScreen);


const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Constants.colors.white
  },
  cardContainer: {
    paddingBottom: 20
  },
  outerCircle: {
    borderRadius: 40,
    width: 80,
    height: 80,
    borderColor: "#464C54",
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerCircle: {
    borderRadius: 30,
    width: 60,
    height: 60,
    backgroundColor: "#6ECCDD",
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardMainContainer: {
    // width:Platform.OS === "ios"? window.height / 2.2 :  window.height / 1.8
    width: Platform.OS === "ios" ? window.width - 10 : window.width - 10,
  },
  cardToptext: {
    fontSize: 20,
    fontWeight: "400",
    color: "#373737"
  },
  cardCentertext: {
    fontSize: 15,
    paddingTop: 0,
    color: Constants.colors.homePageBlurTextColor,
    textAlign: "center"
  },
  cardBottomtext: {
    fontSize: 15,
    paddingTop: 10,
    color: Constants.colors.homePageBlurTextColor,
    textAlign: "center",
    lineHeight: Constants.colors.cardDetailLineHeight
  },
  sharePhotoContainer: {
    paddingTop: 10
  },
  sharePhotoVideoContainer: {
    paddingTop: 30
  },
  shareFirstPhotoContainer: {
    paddingTop: 40,
    paddingBottom: 5
  },
  sharePhotoText: {
    fontSize: 20,
    color: Constants.colors.homePageBlurTextColor,
    textAlign: "center",
  },
  sharePhotoVideoText: {
    fontSize: 15,
    color: Constants.colors.homePageBlurTextColor,
    textAlign: "center",
  },
  shareFirstPhotoText: {
    fontSize: 15,
    color: "#6ECCDD",
    textAlign: "center",
  }
});
