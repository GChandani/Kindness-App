import React, { useEffect, useState } from "react";
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { StyleSheet, Dimensions, SafeAreaView, View, Text, AsyncStorage } from "react-native";
import { Constants, Icon } from "../constants/Constants";

const { width } = Dimensions.get('screen');




const Drawer = (props) => {

  const [name, setName] = useState("");

  useEffect(() => {
    getName();
  }, [])

  const getName = async () => {
    let username = await AsyncStorage.getItem('userName');
    setName(username)
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <View style={{ paddingBottom: 5 }}>
              <Text style={{ fontSize: Constants.colors.buttonFontSize, fontWeight: Constants.colors.headerFontWeight }}>{name ? name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : ""}</Text>
            </View>
            <View style={styles.emailcontainer}>
              <Text>Manage Kindness:- The Universal Language of</Text>
            </View>
          </View>
        </View>
        <DrawerNavigatorItems {...props} />
      </SafeAreaView>
    </View>
  )


};

const Menu = {
  headerMode: 'none',
  contentComponent: props => <Drawer {...props} />,
  drawerBackgroundColor: 'white',
  drawerWidth: width * 0.8,
  contentOptions: {
    activeTintColor: 'white',
    inactiveTintColor: '#000',
    activeBackgroundColor: 'transparent',
    itemStyle: {
      width: width * 0.75,
      backgroundColor: 'transparent',
    },
    labelStyle: {
      fontSize: 18,
      marginLeft: 12,
      fontWeight: 'normal',
    },
    itemsContainerStyle: {
      paddingVertical: 16,
      paddingHorizonal: 12,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: Constants.colors.white,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 50,
    flexDirection: 'row',
    color: "#fff",
  },
  emailicon: {
    paddingRight: 5,
  },
  profileContainer: {
    paddingLeft: 10,
    marginTop: 10,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
  }, emailcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    color: "#fff",
  }, username: {
    fontWeight: "bold",
    color: "#fff",
  },
  email: {
    color: "#fff",

  }
});

export default Menu;
