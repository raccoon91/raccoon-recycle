import React from 'react';
import { View, Text } from 'react-native';
import renderer from 'react-test-renderer';
import BarcodeScanner from '../BarcodeScannerScreen';

describe('BarcodeScannerScreen Test', () => {
  const barcodeScannerScreen = renderer.create(<BarcodeScanner isFocused={false} saveBarcode={() => console.log('saveBarcode')} navigation={{navigate: () => console.log('route')}} />);
  const barcodeScannerInstance = barcodeScannerScreen.root;
  
  it('cameraPermission is null', () => {
    barcodeScannerInstance.instance.setState({ hasCameraPermission: null });

    expect(barcodeScannerInstance.findByType(Text).props.children).toEqual('Requesting for camera permission');
  });

  it('cameraPermission false', () => {
    barcodeScannerInstance.instance.setState({ hasCameraPermission: false });

    expect(barcodeScannerInstance.findByType(Text).props.children).toEqual('No access to camera');
  });
});