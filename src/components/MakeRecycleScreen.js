import React, { Component } from 'react';
import ViewShot from 'react-native-view-shot';
import { FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import RecycleImage from './RecycleImage';
import ConfirmModal from './ConfirmModal';

export default class MakeRecycleScreen extends Component {
  static navigationOptions = {
    title: 'information',
    headerStyle: {
      backgroundColor: '#4b636e'
    },
    headerTintColor: 'white',
    headerTintStyle: {
      fontWeight: 'bold'
    }
  };

  state = {
    recycleImages: [],
    base64Image: null
  };

  addRecycleImage = (text) => {
    const { recycleImages } = this.state;
    const index = recycleImages.length;

    this.setState({
      recycleImages: recycleImages.concat(<RecycleImage content={text} key={index} />)
    });
  }

  takeSnapShot = () => {
    this.refs.viewShot.capture().then((base64Image) => {
      this.setState({
        base64Image
      });
    });
  }

  undo = () => {
    const { recycleImages } = this.state;
    const copiedDraggables = recycleImages.slice();

    copiedDraggables.pop();

    this.setState({
      recycleImages: copiedDraggables
    });
  }

  render() {
    const { base64Image, recycleImages } = this.state;
    const { navigation } = this.props;
    const imgURI = navigation.getParam('photoURI');

    return (
      <View style={styles.container}>
        {
          base64Image
            ? <ConfirmModal base64Image={base64Image} navigation={navigation} />
            : null
        }
        <View style={{ marginTop: 10 }}>
          <ViewShot
            style={styles.imageZone}
            ref="viewShot"
            options={{ format: 'png', quality: 0.9, result: 'base64' }}
          >
            <View>
              <Image
                style={{ width: 400, height: 400 }}
                source={{ uri: imgURI }}
              />
              <View style={styles.recycleImageWrapper}>
                {
                  recycleImages.length
                    ? recycleImages.map((recycleImage) => {
                      return recycleImage;
                    })
                    : null
                }
              </View>
            </View>
          </ViewShot>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={this.undo}
            >
              <FontAwesome name="undo" size={28} color="#FF4136" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.takeSnapShot}
            >
              <Text style={styles.snapShotText}>Take</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.recycleImageButtonContainer}>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={this.addRecycleImage.bind(null, 'plastic')}
          >
            <Image
              style={{ width: 60, height: 60 }}
              source={require('../../assets/images/plastic.png')}
            />
            <Text>Plastic</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={this.addRecycleImage.bind(null, 'metal')}
          >
            <Image
              style={{ width: 60, height: 60 }}
              source={require('../../assets/images/metal.png')}
            />
            <Text>Metal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={this.addRecycleImage.bind(null, 'paper')}
          >
            <Image
              style={{ width: 60, height: 60 }}
              source={require('../../assets/images/paper.png')}
            />
            <Text>Paper</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={this.addRecycleImage.bind(null, 'glass')}
          >
            <Image
              style={{ width: 60, height: 60 }}
              source={require('../../assets/images/glass.png')}
            />
            <Text>Glass</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={this.addRecycleImage.bind(null, 'trash')}
          >
            <Image
              style={{ width: 60, height: 60 }}
              source={require('../../assets/images/trash.png')}
            />
            <Text>Trash</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

MakeRecycleScreen.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#78909c'
  },
  imageZone: {
    height: 400,
    backgroundColor: '#00334d'
  },
  recycleImageWrapper: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%'
  },
  snapShotText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  recycleImageButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 30,
    width: '100%'
  }
});
