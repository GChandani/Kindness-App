import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Linking, Image } from 'react-native';
import { Card } from 'react-native-elements'
import { Constants } from "../constants/Constants";
import Icon from 'react-native-vector-icons/FontAwesome';
import LogoutIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SidebarIcon from 'react-native-vector-icons/MaterialIcons';

const window = Dimensions.get('window');

const CardItem = props => {
  return (
    props.screenName !== "adoptionScreen" ?
      <Card>
        <Card.Title style={props.toptext}>{props.title}</Card.Title>
        {props.date ?
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <Text style={props.centerText}>{props.date}</Text>
            </View>
          </View> : null}

        {props.eventDate ? <View style={{ flex: 1, flexDirection: "row" }}>
          <LogoutIcon name="calendar" size={25} color={Constants.colors.homePageBlurTextColor} /><Text style={[props.centerText, { paddingLeft: 0 }]}>{" " + props.eventDate}</Text>
        </View> : null}

        {props.address ? <View style={{ flex: 1, flexDirection: "row", paddingTop: 10 }}>
          <LogoutIcon name="map-marker" size={25} color={Constants.colors.homePageBlurTextColor} />
          <Text style={[props.centerText, { paddingLeft: 0, paddingTop: 0 }]}>{props.address}</Text>
        </View> : null}

        {props.contact ? <View style={{ flex: 1, flexDirection: "row", paddingTop: 10 }}>
          <LogoutIcon name="cellphone-iphone" size={25} color={Constants.colors.homePageBlurTextColor} />
          <Text style={[props.centerText, { paddingLeft: 0 }]}>{props.contact}</Text>
        </View> : null}

        {props.imageUrl ? <View style={props.imageContentView}>
          <Image source={{ uri: props.imageUrl }}
            style={props.imageContent} />
        </View> : props.screenName !== "eventScreen" ? <View style={props.imageContentView}>
          <Image source={require("../assets/noImageAvaliable.png")}
            style={props.imageContent} />
        </View> : null}

        <View>
          <Text style={[props.bottomtext, { textAlign: "justify", paddingLeft: 5 }]}>{props.content}</Text>
        </View>

        {props.itemId ? <View style={{ flex: 1, justifyContent: "flex-start", flexDirection: "row" }}>
          <TouchableOpacity onPress={() => props.openCommentPage(props.itemId)}>
            <Icon name="commenting" size={30} color={Constants.colors.headerColor} />
          </TouchableOpacity>
        </View> : null}

      </Card> :
      <Card>
        <View >
          <View style={styles.cardContainer}>
            <View style={styles.cardLeftView}>
              {props.imageUrl ? <View style={props.imageContentView}>
                <Image source={{ uri: props.imageUrl }}
                  style={props.imageContent} />
              </View> : <View style={props.imageContentView}>
                  <Image source={require("../assets/noImageAvaliable.png")}
                    style={props.imageContent} />
                </View>}
            </View>

            <View style={styles.cardRightView}>

              {props.title ? <View style={[styles.sideView, { paddingRight: 5 }]}>
                <LogoutIcon style={styles.iconStyle} name="dog-side" size={25} color={Constants.colors.homePageBlurTextColor} />
                <Text style={styles.title}>{props.title}</Text>
              </View> : null}

              {props.age ? <View style={styles.sideView}>
                <LogoutIcon style={styles.iconStyle} name="yoga" size={25} color={Constants.colors.homePageBlurTextColor} />
                <Text style={styles.remaningText}>{props.age}</Text>
              </View> : null}

              {props.calendar ? <View style={styles.sideView}><LogoutIcon style={styles.iconStyle} name="calendar-month" size={25} color={Constants.colors.homePageBlurTextColor} /><Text style={styles.remaningText}>{props.calendar}</Text>
              </View> : null}

              {props.address ? <View style={[styles.sideView, { paddingRight: 10 }]}><LogoutIcon style={styles.iconStyle} name="map-marker" size={25} color={Constants.colors.homePageBlurTextColor} /><Text style={styles.remaningText}>{props.address}</Text>
              </View> : null}

              {props.contact && props.helpNeeded !== "Call us" ? <TouchableOpacity style={styles.sideView}><LogoutIcon style={styles.iconStyle} name="cellphone-iphone" size={25} color={Constants.colors.homePageBlurTextColor} /><Text style={[styles.remaningText]}>{props.contact}</Text>
              </TouchableOpacity> : null}


              {props.helpNeeded ? <View style={styles.sideView}><TouchableOpacity style={styles.ButtonContainer} activeOpacity={0.6} underlayColor={Constants.colors.headerColor} onPress={() => Linking.openURL(`tel:${props.contact ? props.contact : ""}`)}>
                <View style={styles.buttonView}>
                  <Text style={styles.buttonViewText}>{props.helpNeeded}</Text>
                </View>
              </TouchableOpacity>
              </View> : null}
            </View>
          </View>

          <View>
            {props.description ? <Text style={styles.remaningText}>{props.description}</Text> : null}
          </View>

        </View>
      </Card>
  )
}


const styles = StyleSheet.create({
  sideView: {
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 7
  },
  title: {
    fontSize: Constants.colors.homeFontSize
  },
  remaningText: {
    fontSize: Constants.colors.testFontSize
  },
  cardContainer: {
    flex: 1, flexDirection: "row"
  },
  cardLeftView: {
    flex: 0.4, paddingRight: 10
  },
  cardRightView: {
    flex: 0.6
  },
  iconStyle: {
    paddingRight: 5
  },
  ButtonContainer: {
    height: Platform.OS === "ios" ? window.height / 24 : window.height / 20,
    width: Platform.OS === "ios" ? window.height / 9 : window.height / 5,
    borderRadius: 5,
    backgroundColor: Constants.colors.buttonHeighlightColor
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
  }
});

export default CardItem;
