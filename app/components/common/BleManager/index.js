import { BleManager } from "react-native-ble-plx";
import { PermissionsAndroid, Alert } from "react-native";
import IntentLauncher, { IntentConstant } from "react-native-intent-launcher";

import React, { Component } from "react";

const SERVICE = "ffffffe0-00f7-4000-b000-000000000000";
const CHARACTERISTIC = "ffffffe1-00f7-4000-b000-000000000000";

const bleManager = WrappedComponent =>
  class Ble extends Component {
    constructor() {
      super();
      this.manager = new BleManager();
      this.state = {
        devices: [],
        connectedDevice: {},
        loading: false,
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
          // this.connect(device);
        }
      });
    }

    openGoogleAssistant = () => {
      IntentLauncher.startActivity({
        action: IntentConstant.ACTION_VOICE_ASSIST
      });
    };

    monitor = async device => {
      await device.discoverAllServicesAndCharacteristics();
      device.monitorCharacteristicForService(
        SERVICE,
        CHARACTERISTIC,
        (e, data) => {
          if (e) {
            console.error(e);
            return;
          }
          console.log("test", e, data);
          if (data.value === "AA==") {
            this.openGoogleAssistant();
          }
        }
      );
    };

    disconnect = async () => {
      if (!this.state.connectedDevice.id) {
        this.setState({
          disabled: true
        });
        return;
      }

      try {
        this.setState({ loading: true });
        await this.manager.cancelDeviceConnection(
          this.state.connectedDevice.id
        );
        this.setState({
          connectedDevice: {},
          loading: false,
          disabled: true
        });
      } catch (e) {
        console.error(e);
      }
    };

    enable = () => {
      this.setState({
        disabled: false
      });
    };

    connect = async device => {
      if (this.state.disabled) {
        Alert.alert("Cannot Connect", "Service is disabled.");
        return;
      }

      if (this.state.connectedDevice.id === device.id) {
        Alert.alert("Cannot Connect", "Device is already connected.");
        return;
      }

      if (!device.name) {
        Alert.alert(
          "Cannot Connect",
          "It is not possible to connect to this device. Try another device with a device name."
        );
        return;
      }

      try {
        this.setState({ loading: true });
        await this.manager.connectToDevice(device.id);
        this.setState({ connectedDevice: device, loading: false });
        this.monitor(device);
      } catch (e) {
        this.setState({ loading: false });
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
          loading={this.state.loading}
          disconnect={this.disconnect}
          enable={this.enable}
          {...this.props}
        />
      );
    }
  };

export default bleManager;
