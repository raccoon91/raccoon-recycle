import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { withNavigationFocus } from 'react-navigation';

class BarcodeScannerScreen extends Component {
  static navigationOptions = {
    title: 'Scan'
  };

  state = {
    hasCameraPermission: null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted'
    });
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.props.navigation.navigate('Display', { 'data' : data });
  }

  render() {
    const { hasCameraPermission, barcode } = this.state;

    if (hasCameraPermission === null) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Requesting for camera permission</Text>
        </View>
      );
    }

    if (hasCameraPermission === false) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>No access to camera</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {
          this.props.isFocused
          ? <View style={styles.barcodeScannerWrapper}>
              <BarCodeScanner
                onBarCodeRead={this.handleBarCodeScanned}
                style={StyleSheet.absoluteFill}
              />
            </View>
          : <ActivityIndicator size="large" />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  barcodeScannerWrapper: {
    overflow: 'hidden',
    width: '80%',
    height: '30%'
  }
})

export default withNavigationFocus(BarcodeScannerScreen);
