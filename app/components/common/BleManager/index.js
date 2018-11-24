import { BleManager } from "react-native-ble-plx";
import { PermissionsAndroid, Alert } from "react-native";
import { Open } from "../../../utils/";
import React, { Component } from "react";

const SERVICE = "ffffffe0-00f7-4000-b000-000000000000";
const CHARACTERISTIC = "ffffffe1-00f7-4000-b000-000000000000";

/* 
Main Functionality:
1. scan()
2. connect(device)
3. monitor(device)
*/

const bleManager = WrappedComponent =>
  class Ble extends Component {
    constructor(props) {
      super(props);
      this.manager = new BleManager();
      this.state = {
        devices: [],
        connectedDevice: null,
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

    /* Scan for devices and connect to valrt devices automatically */
    scan() {
      this.manager.startDeviceScan(null, null, (e, device) => {
        if (e) {
          // Handle error (scanning will be stopped automatically)
          console.error("scan failed", e);
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
          this.state.disabled === false &&
          this.state.loading === false &&
          this.state.connectedDevice === null
        ) {
          // Proceed with connection.
          this.connect(device);
        }
      });
    }

    /* Connect to device */
    connect = async device => {
      if (this.state.disabled) {
        Alert.alert("Cannot Connect", "Service is disabled.");
        return;
      }

      if (
        this.state.connectedDevice &&
        this.state.connectedDevice.id === device.id
      ) {
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

      this.setState({ loading: true });
      try {
        await this.manager.connectToDevice(device.id);
      } catch (e) {
        this.setState({ loading: false });
        console.error("connect failed", e);
        return;
      }

      this.setState({ connectedDevice: device, loading: false });
      this.monitorDisconnect(device);
      this.monitor(device);
    };

    /* Monitor services and characteristics */
    monitor = async device => {
      try {
        await device.discoverAllServicesAndCharacteristics();
      } catch (e) {
        console.error("discoverAllServicesAndCharacteristics failed", e);
        return;
      }
      device.monitorCharacteristicForService(
        SERVICE,
        CHARACTERISTIC,
        (e, data) => {
          if (e) {
            console.error("monitorCharacteristicForService failed", e);
            return;
          }
          console.log("test", e, data);
          if (data.value === "AA==") {
            Open.googleAssistant();
          }
        }
      );
    };

    monitorDisconnect = device => {
      device.onDisconnected(() => {
        console.warn("onDeviceDisconnected called");
        this.setState({ connectedDevice: null });
      });
    };

    disconnect = async () => {
      if (!this.state.connectedDevice) {
        this.setState({ disabled: true });
        return;
      }
      this.setState({ loading: true });
      try {
        await this.manager.cancelDeviceConnection(
          this.state.connectedDevice.id
        );
      } catch (e) {
        console.error("cancelDeviceConnection failed", e);
      }
      this.setState({
        connectedDevice: null,
        loading: false,
        disabled: true
      });
    };

    enable = () => {
      this.setState({ disabled: false });
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
