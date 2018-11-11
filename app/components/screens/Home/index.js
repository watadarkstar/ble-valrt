import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import IntentLauncher, { IntentConstant } from 'react-native-intent-launcher'

import { bleManager } from "../../common";
import styles from "./styles";

export class Home extends Component {
  openGoogleAssistant = () => {
    IntentLauncher.startActivity({
      action: IntentConstant.ACTION_VOICE_ASSIST
    });
  }

  connect = () => {
    console.log("TODO: get connect working");
  }

  render() {
    console.log("this.props.manager", this.props.manager);
    return (
      <View style={styles.container}>
        <Text>Home Screen with bleManager as this.props.manager</Text>
        <TouchableOpacity style={styles.button} onPress={this.connect}><Text style={styles.buttonText}>Press me to connect to device</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.openGoogleAssistant}><Text style={styles.buttonText}>Press me to activate Google Assistant</Text></TouchableOpacity>
      </View>
    )
  }
}

export default bleManager(Home);
