import React from 'react';
import { BarCodeScanner, Permissions } from 'expo';
import { withNavigationFocus } from 'react-navigation';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import { barcodeScan, Action } from '../actions';
import { Dispatch } from 'redux';


export interface Props {
  saveBarcode: (barcode: string) => void;
  isFocused: boolean;
  navigation: {
    navigate: (route: string, data: object) => void;
  };
}

interface State {
  hasCameraPermission: boolean | null;
}

class BarcodeScannerScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null
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

  handleBarCodeScanned = ({ data }: { data: string }) => {
    const { saveBarcode, navigation } = this.props;

    saveBarcode(data);
    navigation.navigate('DisplayRecycle', { barcode: data });
  }

  render() {
    const { hasCameraPermission } = this.state;
    const { isFocused } = this.props;

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
          isFocused
            ? (
              <View style={styles.barcodeScannerWrapper}>
                <BarCodeScanner
                  onBarCodeRead={this.handleBarCodeScanned}
                  style={StyleSheet.absoluteFill}
                />
              </View>
            )
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
    justifyContent: 'center',
    backgroundColor: '#78909c'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  barcodeScannerWrapper: {
    overflow: 'hidden',
    width: '80%',
    height: '30%',
    borderWidth: 3,
    borderColor: 'white'
  }
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  saveBarcode: (barcode: string) => {
    dispatch(barcodeScan(barcode));
  }
});

export default connect(null, mapDispatchToProps)(withNavigationFocus(BarcodeScannerScreen));
