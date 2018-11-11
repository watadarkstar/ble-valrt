import React, { Component } from 'react'
import { Text, View } from 'react-native'

import { bleManager } from "../../common";

export class BluetoothList extends Component {
  render() {
    console.log("this.props.manager", this.props.manager);
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}

export default bleManager(BluetoothList);
