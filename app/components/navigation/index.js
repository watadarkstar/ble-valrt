import React from "react";
import { StackNavigator } from "react-navigation";

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
const AppNavigator = StackNavigator(appNavigatorConfig);

export default AppNavigator;
