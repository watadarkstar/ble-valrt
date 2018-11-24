import React, { Component, Fragment } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import { bleManager } from "../../common";
import styles from "./styles";

export class Home extends Component {
  renderListItem = ({ item }) => {
    const { connectedDevice } = this.props;
    const isConnectedDevice =
      connectedDevice && connectedDevice.id === item.device.id;

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
    const { devices, loading } = this.props;

    if (loading) {
      return (
        <Fragment>
          <ActivityIndicator size="large" color="#337AB7" />
          <Text style={styles.text}>Loading...</Text>
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
          extraData={this.props.connectedDevice}
          data={this.props.devices}
          renderItem={this.renderListItem}
          style={styles.listContainer}
        />
        {this.renderOnOffButton()}
        {/* {this.renderGoogleAssistantButton()} */}
      </View>
    );
  };

  renderOnOffButton = () => {
    const { disabled } = this.props;

    if (!disabled) {
      return (
        <TouchableOpacity
          style={[styles.button, styles.greenButton]}
          onPress={() => this.props.disconnect()}
        >
          <Text style={styles.buttonText}>ON</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={[styles.button, styles.redButton]}
        onPress={this.props.enable}
      >
        <Text style={styles.buttonText}>OFF</Text>
      </TouchableOpacity>
    );
  };

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
