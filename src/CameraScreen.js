import React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Camera, Permissions, ImageManipulator } from 'expo';

export default class CameraExample extends React.Component {
  static navigationOptions = {
    title: 'Camera',
    headerStyle: {
      backgroundColor: '#4b636e'
    },
    headerTintColor: 'white',
    headerTintStyle: {
      fontWeight: 'bold'
    }
  };

  state = {
    hasCameraPermission: null,
    isTakingImage: false
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap = async () => {
    if (this.camera) {
      // const barcode = this.props.navigate.getParam('barcode');
      const photo = await this.camera.takePictureAsync({ skipProcessing: true });
      let resizedPhoto = await ImageManipulator.manipulateAsync(
        photo.uri,
        [ { resize: { width: 400, height: 400 }} ],
        { compress: 0, format: "png", base64: true }
      );

      this.props.navigation.navigate('Info', { 'imgURI': resizedPhoto.base64 });
      // this.props.navigation.navigate('Info', { 'imgURI': resizedPhoto.base64, 'barcode': barcode});
    }
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <ActivityIndicator />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#78909c', marginTop: -40 }}>
          <Camera
            style={{ width: 400, height: 400 }}
            type={this.state.type}
            ref={ref => { this.camera = ref; }}
            autoFocus={"off"}
            ratio={"1:1"}
          >
          </Camera>
          <TouchableOpacity onPress={this.snap}>
            <View style={{ backgroundColor: '#4b636e', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, marginTop: 40 }}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Take Picture</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
