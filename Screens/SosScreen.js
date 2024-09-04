import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions, Platform, Text } from 'react-native';
import { Constants, ApiRequest, ShowApiMessage } from "../constants/Constants";
import Card from "../components/UI/Card";
import LogoutIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CardItem from "../components/CardItem";
import { setSosData } from "../store/actions/SosAction";
import Loader from "../components/UI/Loader";
import { connect } from "react-redux";

const window = Dimensions.get('window');

class SosScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refereshLoader: false,
      sosList: [],
      count: 0
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.callSosListApi();
    this.setState({ loading: true });
    this.setState({
      sosList: this.props.sosCardData
    })
    this.focusSosListener = navigation.addListener('didFocus', () => {
      this.setState({ count: 0 });
      this.callSosListApi();
    });
  }

  componentWillUnmount() {
    this.focusSosListener.remove();
  }

  callSosListApi = async () => {
    const formData = new FormData();
    formData.append('action', 'soslist');
    formData.append('countryId', this.props.countryId);
    formData.append('stateId', this.props.stateId);
    formData.append('userId', this.props.userId);
    var apiData = await ApiRequest(formData)
    console.log(apiData, "apiData")
    if (apiData.RESPONSECODE) {
      // this.props.setSosData([
      //   {
      //     title: 'Charlie',
      //     contact: '1234567890',
      //     address: '10 Number Stop, Bhopal, MP India',
      //     imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTtjXZl7__K2KBO7r9lOc5n2yd3tUk36snfjQ&usqp=CAU",
      //   },
      //   {
      //     title: 'Oscar',
      //     contact: '1234567890',
      //     address: '10 Number Stop, Bhopal, MP India',
      //     imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTtjXZl7__K2KBO7r9lOc5n2yd3tUk36snfjQ&usqp=CAU",
      //   }]
      // )
      this.props.setSosData(apiData.RESPONSE)
      this.setState({ loading: false, refereshLoader: false });
    }
    else {
      // ShowApiMessage(apiData.RESPONSECODE, apiData.message)
      this.setState({ loading: false, refereshLoader: false });
    }
  }

  renderItem = ({ item }) => (
    <Card style={styles.cardMainContainer}><CardItem screenName={"adoptionScreen"} imageContentView={styles.imageContainerView} imageContent={styles.imageContainer} bottomtext={styles.cardBottomtext} title={item.name} contact={item.mobile} calendar={item.calendar} address={item.location + " " + item.city} description={item.description} imageUrl={item.image ? item.image : ""} helpNeeded="Help Needed" /></Card>
  )

  renderNoDataAvaliable = ({ item }) => (
    <View style={styles.sharePhotoVideoContainer}>
      <Text style={styles.sharePhotoVideoText}>No SOS are Avaliable</Text>
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
            {this.props.sosCardData && Object.keys(this.props.sosCardData).length > 0 ?
              <FlatList
                data={this.props.sosCardData}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index}
                onRefresh={() => this.callSosListApi(this.setState({ refereshLoader: true }))}
                refreshing={this.state.loading}
              /> :
              <FlatList
                data={[{}]}
                renderItem={this.renderNoDataAvaliable}
                keyExtractor={(item, index) => index}
                onRefresh={() => this.callSosListApi(this.setState({ refereshLoader: true }))}
                refreshing={this.state.loading}
              />
            }
          </View>
          <View style={styles.addBottomContainer}>
            <TouchableOpacity style={styles.bottomContainerView}
              onPress={() => this.props.navigation.navigate("SosFormScreen")}>
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
    sosCardData: state.sos.sosCardData,
    userId: state.auth.userId,
    countryId: state.auth.countryId,
    stateId: state.auth.stateId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSosData: (sosData) => dispatch(setSosData(sosData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SosScreen);

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
    textAlign: "left",
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
  },
  imageContainer: {
    height: 150,
    width: 125
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
