import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Constants, Icon } from "../constants/Constants";
import LogoutIcon from 'react-native-vector-icons/MaterialCommunityIcons';

class DrawerItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { focused, title, iconname } = this.props;
    return (
      <View
        style={[styles.defaultStyle, focused ? [styles.activeStyle, styles.shadow] : null]}><View>
          {title !== "Logout" ? <LogoutIcon  //Icon
            color={focused ? Constants.colors.textlight : Constants.colors.headerColor}
            size={16}
            style={{ width: 25 }}
            name={"brightness-1"}
          /> : <LogoutIcon
              color={focused ? Constants.colors.textlight : Constants.colors.headerColor}
              size={16}
              style={{ width: 25 }}
              name={"brightness-1"}
            />}</View>
        <Text style={[styles.defaultLabel, focused ? [styles.activeLabel] : null]}>{title}</Text>
      </View>
    );
  }
}
export default DrawerItem;


const styles = StyleSheet.create({
  defaultStyle: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  activeStyle: {
    backgroundColor: "#f4cfcb",
    color: Constants.colors.textlight,
    alignItems: "center",
  }, defaultLabel: {
    color: Constants.colors.black,
    paddingHorizontal: 10,
    fontWeight: "bold"
  }, activeLabel: {
    color: Constants.colors.textlight,
  },
  shadow: {
    shadowColor: Constants.colors.textdark,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2
  }
})
