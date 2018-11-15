import React, { Component, Fragment } from "react";
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

  renderListItem = ({ item }) => {
    const { connectedDevice } = this.props;
    const isConnectedDevice = connectedDevice.id === item.device.id;

    return (
      <TouchableOpacity
        onPress={() => this.props.connect(item.device)}
        style={styles.listItem}
      >
        <Text style={styles.deviceName}>
          {item.device.name || "Unknown Device Name"}
        </Text>
        <Text style={styles.text}>{item.key}</Text>
        {isConnectedDevice && <Text style={styles.greenText}>Connected</Text>}
      </TouchableOpacity>
    );
  };

  renderList = () => {
    const { devices, connecting } = this.props;

    if (connecting) {
      return (
        <Fragment>
          <ActivityIndicator size="large" color="#337AB7" />
          <Text style={styles.text}>Connecting...</Text>
        </Fragment>
      );
    }

    if (devices.length === 0)
      return (
        <Fragment>
          <ActivityIndicator size="large" color="#337AB7" />
          <Text style={styles.text}>Scanning...</Text>
        </Fragment>
      );

    return (
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <FlatList
          data={this.props.devices}
          renderItem={this.renderListItem}
          style={styles.listContainer}
        />
        {this.renderOnOffButton()}
        {/* {this.renderGoogleAssistantButton()} */}
      </View>
    );
  };

  renderOnOffButton = () => (
    <TouchableOpacity style={[styles.button, styles.greenButton]}>
      <Text style={styles.buttonText}>ON</Text>
    </TouchableOpacity>
  );

  renderGoogleAssistantButton = () => (
    <TouchableOpacity style={styles.button} onPress={this.openGoogleAssistant}>
      <Text style={styles.buttonText}>Activate Google Assistant</Text>
    </TouchableOpacity>
  );

  render() {
    return <View style={styles.container}>{this.renderList()}</View>;
  }
}

export default bleManager(Home);
