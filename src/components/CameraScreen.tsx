import React from 'react';
import { Camera, Permissions } from 'expo';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

export interface Props {
  navigation: {
    navigate: (route: string, result: object) => void
  }
}

interface State {
  hasCameraPermission: boolean | null
}

export default class CameraScreen extends React.Component<Props, State> {
  private camera: React.RefObject<React.Component<Camera>>

  constructor(props: Props) {
    super(props);
    this.state ={
      hasCameraPermission: null
    };

    this.camera = React.createRef();
  }
  
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
    hasCameraPermission: null
  };

  
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture = async () => {
    const { navigation } = this.props;

    if (this.camera) {
      const photo = await this.camera.takePictureAsync({ skipProcessing: true });

      navigation.navigate('MakeRecycle', { photoURI: photo.uri });
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
        <View style={styles.container}>
          <Camera
            style={{ width: 400, height: 400 }}
            ref={(ref: any) => { this.camera = ref; }}
            autoFocus="off"
            ratio="1:1"
          />
          <TouchableOpacity onPress={this.takePicture}>
            <View style={styles.takePictureButton}>
              <Text style={styles.takePictureText}>Take Picture</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -40,
    backgroundColor: '#78909c'
  },
  takePictureButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 40,
    borderRadius: 5,
    backgroundColor: '#4b636e'
  },
  takePictureText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
