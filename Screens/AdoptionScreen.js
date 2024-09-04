import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Dimensions, Platform, Text, Image } from 'react-native';
import { Constants, ApiRequest, ShowApiMessage } from "../constants/Constants";
import Card from "../components/UI/Card";
import LogoutIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CardItem from "../components/CardItem";
import { setAdoptionData } from "../store/actions/AdoptionAction";
import Loader from "../components/UI/Loader";
import { connect } from "react-redux";
import noImageAvaliable from "../assets/noImageAvaliable.png";

const window = Dimensions.get('window');

class AdoptionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refereshLoader: false,
      adoptionList: [],
      count: 0
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.callAdoptionListApi();
    this.setState({ loading: true });
    this.setState({
      adoptionList: this.props.adoptionCardData
    })
    this.focusAdoptionListener = navigation.addListener('didFocus', () => {
      this.setState({ count: 0 });
      this.callAdoptionListApi();
    });
  }

  componentWillUnmount() {
    this.focusAdoptionListener.remove();
  }

  callAdoptionListApi = async () => {
    const formData = new FormData();
    formData.append('action', 'adoptionlist');
    formData.append('countryId', this.props.countryId);
    formData.append('stateId', this.props.stateId);
    formData.append('userId', this.props.userId);
    var apiData = await ApiRequest(formData)
    if (apiData.RESPONSECODE) {
      // this.props.setAdoptionData([
      //   {
      //     title: 'Charlie',
      //     calendar: '2 Year',
      //     contact: '1234567890',
      //     address: '10 Number Stop, Bhopal, MP India',
      //     imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTtjXZl7__K2KBO7r9lOc5n2yd3tUk36snfjQ&usqp=CAU",
      //   },
      //   {
      //     title: 'Oscar',
      //     calendar: '2 Year',
      //     contact: '1234567890',
      //     address: '10 Number Stop, Bhopal, MP India',
      //     imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTtjXZl7__K2KBO7r9lOc5n2yd3tUk36snfjQ&usqp=CAU",
      //   }])
      this.props.setAdoptionData(apiData.RESPONSE)
      this.setState({ loading: false, refereshLoader: false });
    }
    else {
      // ShowApiMessage(apiData.RESPONSECODE, apiData.message)
      this.setState({ loading: false, refereshLoader: false });
    }
  }

  renderItem = ({ item }) => (
    <Card style={styles.cardMainContainer}><CardItem screenName={"adoptionScreen"} imageContentView={styles.imageContainerView} imageContent={styles.imageContainer} bottomtext={styles.cardBottomtext} description={item.description} age={item.age} title={item.name} calendar={item.date} contact={item.contact} address={item.address} imageUrl={item.image ? item.image : ""} helpNeeded="Call us" /></Card>
  )

  renderNoDataAvaliable = ({ item }) => (
    <View style={styles.sharePhotoVideoContainer}>
      <Text style={styles.sharePhotoVideoText}>No Adoption are Avaliable</Text>
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
            {this.props.adoptionCardData && Object.keys(this.props.adoptionCardData).length > 0 ?
              <FlatList
                data={this.props.adoptionCardData}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => index}
                onRefresh={() => this.callAdoptionListApi(this.setState({ refereshLoader: true }))}
                refreshing={this.state.loading}
              />
              : <FlatList
                data={[{}]}
                renderItem={this.renderNoDataAvaliable}
                keyExtractor={(item, index) => index}
                onRefresh={() => this.callAdoptionListApi(this.setState({ refereshLoader: true }))}
                refreshing={this.state.loading}
              />}
          </View>
          <View style={styles.addBottomContainer}>
            <TouchableOpacity style={styles.bottomContainerView}
              onPress={() => this.props.navigation.navigate("AdoptionFormScreen")}>
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
    adoptionCardData: state.adoption.adoptionCardData,
    userId: state.auth.userId,
    countryId: state.auth.countryId,
    stateId: state.auth.stateId,
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
)(AdoptionScreen);

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
    width: 125,
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
