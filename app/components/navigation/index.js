import React from "react";
import { createStackNavigator } from "react-navigation";

import {
  Home,
} from "../screens/";

const navigationOptions = {
  headerTitleAllowFontScaling: false
};

const appNavigatorConfig = {
  Home: {
    screen: Home,
    navigationOptions: {
      ...navigationOptions,
      header: null
    }
  },
};
const AppNavigator = createStackNavigator(appNavigatorConfig);

export default AppNavigator;
