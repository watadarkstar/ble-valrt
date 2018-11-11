import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import { bleManager } from "../../common";
import styles from "./styles";

export class Home extends Component {
  openGoogleAssistant = () => {
    console.log("TODO: get openGoogleAssistant working");
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
