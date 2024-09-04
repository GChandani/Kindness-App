import React from 'react';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator, TransitionPresets } from "react-navigation-stack";
import LoginScreen from "../Screens/LoginScreen";
import SignUpScreen from "../Screens/SignUpScreen";
import ForgotScreen from "../Screens/ForgotScreen";
import CheckLoginScreen from "../Screens/CheckLoginScreen";
import HomeScreen from "../Screens/HomeScreen";
import AdoptionScreen from "../Screens/AdoptionScreen";
import AdoptionFormScreen from "../Screens/AdoptionFormScreen";
import OnlineForumScreen from "../Screens/OnlineForumScreen";
import OnlineFormScreen from "../Screens/OnlineFormScreen";
import EventScreen from "../Screens/EventScreen";
import EventFormScreen from "../Screens/EventFormScreen";
import SosScreen from "../Screens/SosScreen";
import SosFormScreen from "../Screens/SosFormScreen";
import LogoutScreen from "../Screens/LogoutScreen";
import AppHeader from "../components/Header";
import DrawerItem from "../components/DrawerItem";
import Menu from '../components/Menu';
import CommentScreen from "../Screens/CommentScreen";

const LoginStack = createStackNavigator({

  Login: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => ({
      header: <AppHeader back title="Kindness" navigation={navigation} />
    }),
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: ({ navigation }) => ({
      header: <AppHeader back title="Kindness" navigation={navigation} />
    }),
  },
  ForgotPassword: {
    screen: ForgotScreen,
    navigationOptions: ({ navigation }) => ({
      header: <AppHeader back title="Kindness" navigation={navigation} />
    }),
  },
}, {
  defaultNavigationOptions: { ...TransitionPresets.SlideFromRightIOS },
});

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      header: <AppHeader title="My Post" navigation={navigation} />
    })
  },
}, {
  defaultNavigationOptions: { ...TransitionPresets.SlideFromRightIOS },
});

const AdoptionStack = createStackNavigator({
  Adoption: {
    screen: AdoptionScreen,
    navigationOptions: ({ navigation }) => ({
      header: <AppHeader title="Adoption" navigation={navigation} />
    })
  },
  AdoptionFormScreen: {
    screen: AdoptionFormScreen,
    navigationOptions: ({ navigation }) => ({
      header: <AppHeader back title="Adoption" navigation={navigation} />
    })
  },
}, {
  defaultNavigationOptions: { ...TransitionPresets.SlideFromRightIOS },
});

const OnlineForumStack = createStackNavigator({
  OnlineForum: {
    screen: OnlineForumScreen,
    navigationOptions: ({ navigation }) => ({
      header: <AppHeader title="Online Forum" navigation={navigation} />
    })
  },
  OnlineFormScreen: {
    screen: OnlineFormScreen,
    navigationOptions: ({ navigation }) => ({
      header: <AppHeader back title="Online Forum" navigation={navigation} />
    })
  },
  CommentScreen: {
    screen: CommentScreen,
    navigationOptions: ({ navigation }) => ({
      header: <AppHeader back title="Comments" navigation={navigation} />
    })
  }
}, {
  defaultNavigationOptions: { ...TransitionPresets.SlideFromRightIOS },
});

const EventStack = createStackNavigator({
  Event: {
    screen: EventScreen,
    navigationOptions: ({ navigation }) => ({
      header: <AppHeader title="Event" navigation={navigation} />
    })
  },
  EventFormScreen: {
    screen: EventFormScreen,
    navigationOptions: ({ navigation }) => ({
      header: <AppHeader back title="Event" navigation={navigation} />
    })
  },
}, {
  defaultNavigationOptions: { ...TransitionPresets.SlideFromRightIOS },
});

const SOSStack = createStackNavigator({
  SOS: {
    screen: SosScreen,
    navigationOptions: ({ navigation }) => ({
      header: <AppHeader title="SOS" navigation={navigation} />
    })
  },
  SosFormScreen: {
    screen: SosFormScreen,
    navigationOptions: ({ navigation }) => ({
      header: <AppHeader back title="SOS" navigation={navigation} />
    })
  },
}, {
  defaultNavigationOptions: { ...TransitionPresets.SlideFromRightIOS },
});

const LogoutStack = createStackNavigator({
  SOS: {
    screen: LogoutScreen,
    navigationOptions: ({ navigation }) => ({
      header: <AppHeader title="Logout" navigation={navigation} />
    })
  },
}, {
  defaultNavigationOptions: { ...TransitionPresets.SlideFromRightIOS },
});

const Consultant = createDrawerNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      drawerLabel: ({ focused }) => (
        <DrawerItem focused={focused} title="Home" name="Home" iconname="home" />
      )
    }
  },
  Adoption: {
    screen: AdoptionStack,
    navigationOptions: {
      drawerLabel: ({ focused }) => (
        <DrawerItem focused={focused} title="Adoption" name="Adoption" iconname="list-ul" />
      )
    }
  },
  OnlineForum: {
    screen: OnlineForumStack,
    navigationOptions: (navOpt) => ({
      drawerLabel: ({ focused }) => (
        <DrawerItem focused={focused} title="Online Forum" name="Online Forum" iconname="envelope" />
      ),
    }),
  },
  Event: {
    screen: EventStack,
    navigationOptions: (navOpt) => ({
      drawerLabel: ({ focused }) => (
        <DrawerItem focused={focused} title="Event/Promotions" name="Event" iconname="th-large" />
      ),
    }),
  },

  SOS: {
    screen: SOSStack,
    navigationOptions: (navOpt) => ({
      drawerLabel: ({ focused }) => (
        <DrawerItem focused={focused} title="SOS" name="SOS" iconname="shopping-basket" />
      ),
    }),
  },

  Logout: {
    screen: LogoutStack,
    navigationOptions: (navOpt) => ({
      drawerLabel: ({ focused }) => (
        <DrawerItem focused={focused} title="Logout" name="Logout" iconname="logout" />
      ),
    }),
  },
}, Menu
);

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      CheckLogin: CheckLoginScreen,
      Consultant: Consultant,
      Login: LoginStack,
    },
    {
      initialRouteName: 'CheckLogin',
    }
  )
);

export default AppNavigator;