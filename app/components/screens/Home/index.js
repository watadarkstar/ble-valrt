import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import IntentLauncher, { IntentConstant } from "react-native-intent-launcher";

import { bleManager } from "../../common";
import styles from "./styles";

export class Home extends Component {
  openGoogleAssistant = () => {
    IntentLauncher.startActivity({
      action: IntentConstant.ACTION_VOICE_ASSIST
    });
  };

  connect = () => {
    console.log("TODO: get connect working");
  };

  onDevicePress = () => {
    console.log("TODO: onDevicePress");
  };

  renderListItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this.onDevicePress(item.device)}
        style={styles.listItem}
      >
        <Text>Device ID: {item.key}</Text>
        <Text>Device Name: {item.device.name || "Unknown"}</Text>
      </TouchableOpacity>
    );
  };

  renderList = () => {
    if (this.props.devices.length === 0)
      return (
        <View>
          <ActivityIndicator size="large" color="#337AB7" />
          <Text>Scanning...</Text>
        </View>
      );

    return (
      <FlatList data={this.props.devices} renderItem={this.renderListItem} />
    );
  };

  render() {
    console.log("this.props.manager", this.props.manager);
    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>{this.renderList()}</View>
        <TouchableOpacity style={styles.button} onPress={this.connect}>
          <Text style={styles.buttonText}>Press me to connect to device</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.openGoogleAssistant}
        >
          <Text style={styles.buttonText}>
            Press me to activate Google Assistant
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default bleManager(Home);
