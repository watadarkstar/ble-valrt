import { BleManager } from 'react-native-ble-plx';

import React, { Component } from 'react'
import { View } from 'react-native'

const bleManager = (WrappedComponent) => class Ble extends Component {
  constructor() {
    super();
    this.manager = new BleManager();
  }

  render() {
    return (
      <WrappedComponent test="test" manager={this.manager} {...this.props} />
    )
  }
}

export default bleManager;
