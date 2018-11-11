import React from "react";
import { createStackNavigator } from "react-navigation";

import {
  BluetoothList,
} from "../screens/";

const navigationOptions = {
  headerTitleAllowFontScaling: false
};

const appNavigatorConfig = {
  BluetoothList: {
    screen: BluetoothList,
    navigationOptions: {
      ...navigationOptions,
      header: null
    }
  },
};
const AppNavigator = createStackNavigator(appNavigatorConfig);

export default AppNavigator;
