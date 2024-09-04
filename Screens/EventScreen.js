import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions, Platform, Text } from 'react-native';
import { Constants, ApiRequest, ShowApiMessage } from "../constants/Constants";
import Card from "../components/UI/Card";
import LogoutIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CardItem from "../components/CardItem";
import { setEventData } from "../store/actions/EventAction";
import Loader from "../components/UI/Loader";
import { connect } from "react-redux";

const window = Dimensions.get('window');

class EventScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refereshLoader: false,
      eventList: [],
      count: 0
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.callEventListApi();
    this.setState({ loading: true });
    this.setState({
      eventList: this.props.eventCardData
    })
    this.focusEventListener = navigation.addListener('didFocus', () => {
      this.setState({ count: 0 });
      this.callEventListApi();
    });
  }

  componentWillUnmount() {
    this.focusEventListener.remove();
  }

  callEventListApi = async () => {
    const formData = new FormData();
    formData.append('action', 'eventlist');
    formData.append('countryId', this.props.countryId);
    formData.append('stateId', this.props.stateId);
    formData.append('userId', this.props.userId);
    console.log(formData, "formData")
    var apiData = await ApiRequest(formData)
    console.log(apiData, "apiData")
    if (apiData.RESPONSECODE) {
      // this.props.setEventData([
      //   {
      //     title: 'How much and how often does the pet eat,go outside,go to the toilet?',
      //     address: '10 Number Stop, Bhopal',
      //     contact: '1234567890',
      //     imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcThY7v1FQ_2Ujl-rDbAJ3J9Qf8kgkTRbNBJwg&usqp=CAU",
      //     content: 'Social media type (facebook, twitter, google-plus-official, pinterest, linkedin, youtube, vimeo, tumblr, instagram, quora, foursquare, wordpress, stumbleupon, github, github-alt, twitch, medium, soundcloud, gitlab, angellist, codepen)'
      //   },
      //   {
      //     title: 'How much and how often does the pet eat,go outside,go to the toilet?',
      //     address: '10 Number Stop, Bhopal',
      //     contact: '1234567890',
      //     imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcThY7v1FQ_2Ujl-rDbAJ3J9Qf8kgkTRbNBJwg&usqp=CAU",
      //     content: 'Social media type (facebook, twitter, google-plus-official, pinterest, linkedin, youtube, vimeo, tumblr, instagram, quora, foursquare, wordpress, stumbleupon, github, github-alt, twitch, medium, soundcloud, gitlab, angellist, codepen)'
      //   }]
      // )
      this.props.setEventData(apiData.RESPONSE)
      this.setState({ loading: false, refereshLoader: false });
    }
    else {
      // ShowApiMessage(apiData.RESPONSECODE, apiData.message)
      this.setState({ loading: false, refereshLoader: false });
    }
  }

  renderItem = ({ item }) => (
    <Card style={styles.cardMainContainer}><CardItem toptext={styles.cardToptext} centerText={styles.cardCentertext} centerContact={styles.cardContacttext} screenName={"eventScreen"} imageContentView={styles.imageContainerView} imageContent={styles.imageContainer} bottomtext={styles.cardBottomtext} eventDate={item.date} title={item.name} address={item.address} contact={item.contact} content={item.description} imageUrl={item.image ? item.image : ""} /></Card>
  )

  renderNoDataAvaliable = ({ item }) => (
    <View style={styles.sharePhotoVideoContainer}>
      <Text style={styles.sharePhotoVideoText}>No Events are Avaliable</Text>
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
            {this.props.eventCardData && Object.keys(this.props.eventCardData).length > 0 ?
              <FlatList
                data={this.props.eventCardData}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index}
                onRefresh={() => this.callEventListApi(this.setState({ refereshLoader: true }))}
                refreshing={this.state.loading}
              /> :
              <FlatList
                data={[{}]}
                renderItem={this.renderNoDataAvaliable}
                keyExtractor={(item, index) => index}
                onRefresh={() => this.callEventListApi(this.setState({ refereshLoader: true }))}
                refreshing={this.state.loading}
              />
            }
          </View>
          <View style={styles.addBottomContainer}>
            <TouchableOpacity style={styles.bottomContainerView}
              onPress={() => this.props.navigation.navigate("EventFormScreen")}>
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
    eventCardData: state.event.eventCardData,
    userId: state.auth.userId,
    countryId: state.auth.countryId,
    stateId: state.auth.stateId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setEventData: (eventData) => dispatch(setEventData(eventData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventScreen);

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
  cardContacttext: {
    fontSize: 15,
    paddingTop: 15,
    color: Constants.colors.homePageBlurTextColor,
  },
  imageContainerView: {
    paddingTop: 15,
  },
  imageContainer: {
    height: 150,
    width: "100%",
    borderColor: Constants.colors.homePageBlurTextColor,
    borderWidth: 6
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

