import { BleManager } from "react-native-ble-plx";
import { PermissionsAndroid, Alert } from "react-native";

import React, { Component } from "react";

const bleManager = WrappedComponent =>
  class Ble extends Component {
    constructor() {
      super();
      this.manager = new BleManager();
      this.state = {
        devices: [],
        connectedDevice: {},
        connecting: false,
        disabled: false
      };
      this.devices = {};
    }

    async componentDidMount() {
      await this.requestLocationPermission();
      const subscription = this.manager.onStateChange(state => {
        if (state === "PoweredOn") {
          this.scan();
          subscription.remove();
        }
      }, true);
    }

    scan() {
      this.manager.startDeviceScan(null, null, (e, device) => {
        if (e) {
          // Handle error (scanning will be stopped automatically)
          console.error(e);
          return;
        }

        if (!device) {
          return;
        }

        // ensure device is unique
        if (!this.devices[device.id]) {
          this.devices[device.id] = device.id;
          const item = { device, key: device.id };
          this.setState({ devices: [...this.state.devices, item] });
        }

        // Check if it is a device you are looking for based on advertisement data
        // or other criteria.
        if (
          device.name &&
          device.name.toLowerCase().includes("v.alrt") &&
          this.state.disabled === false
        ) {
          // Proceed with connection.
          this.connect(device);
        }
      });
    }

    disconnect = async () => {
      if (!this.state.connectedDevice) {
        return;
      }

      try {
        this.setState({
          connectedDevice: {},
          connecting: false,
          disabled: true
        });
        await this.manager.cancelDeviceConnection(
          this.state.connectedDevice.id
        );
      } catch (e) {
        console.error(e);
      }
    };

    connect = async device => {
      if (!device.name) {
        Alert.alert(
          "Cannot Connect",
          "It is not possible to connect to this device. Try another device with a device name."
        );
        return;
      }

      try {
        this.setState({ connecting: true });
        await this.manager.connectToDevice(device.id);
        this.setState({ connectedDevice: device, connecting: false });
      } catch (e) {
        this.setState({ connecting: false });
        console.warn(e);
      }
    };

    async requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use bluetooth");
        } else {
          console.log("Bluetooth permission denied");
        }
      } catch (e) {
        console.error(e);
      }
    }

    render() {
      return (
        <WrappedComponent
          disabled={this.state.disabled}
          devices={this.state.devices}
          manager={this.manager}
          connect={this.connect}
          connectedDevice={this.state.connectedDevice}
          connecting={this.state.connecting}
          disconnect={this.disconnect}
          {...this.props}
        />
      );
    }
  };

export default bleManager;
