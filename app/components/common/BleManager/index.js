import { BleManager } from "react-native-ble-plx";
import { PermissionsAndroid } from "react-native";

import React, { Component } from "react";

const bleManager = WrappedComponent =>
  class Ble extends Component {
    constructor() {
      super();
      this.manager = new BleManager();
      this.state = { devices: [] };
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

        if (!this.devices[device.id]) {
          this.devices[device.id] = device.id;
          const item = { device, key: device.id };
          this.setState({ devices: [...this.state.devices, item] });
        }

        // // Check if it is a device you are looking for based on advertisement data
        // // or other criteria.
        // if (device.name === 'TI BLE Sensor Tag' ||
        //   device.name === 'SensorTag') {

        //   // Stop scanning as it's not necessary if you are scanning for one device.
        //   this.manager.stopDeviceScan();

        //   // Proceed with connection.
        // }
      });
    }

    async requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          {
            title: "App Location Permission",
            message:
              "App needs access to your location " +
              "so you can access bluetooth."
          }
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
          devices={this.state.devices}
          manager={this.manager}
          {...this.props}
        />
      );
    }
  };

export default bleManager;
