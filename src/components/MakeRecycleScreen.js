import React, { Component } from 'react';
import ViewShot from 'react-native-view-shot';
import { FontAwesome } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Draggable from './Draggable';
import Confirm from './Confirm';

export default class InfoScreen extends Component {
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
    draggables: [],
    base64Image: null
  };

  addDraggable = (text) => {
    const { draggables } = this.state;
    const index = draggables.length;

    this.setState({
      draggables: draggables.concat(<Draggable content={text} key={index} />)
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
    const { draggables } = this.state;
    const copiedDraggables = draggables.slice();

    copiedDraggables.pop();

    this.setState({
      draggables: copiedDraggables
    });
  }

  render() {
    const { base64Image, draggables } = this.state;
    const { navigation } = this.props;
    const imgURI = navigation.getParam('photoURI');

    return (
      <View style={styles.container}>
        {
          base64Image
            ? <Confirm base64Image={base64Image} navigation={navigation} />
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
                  draggables.length
                    ? draggables.map((draggable) => {
                      return draggable;
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
            onPress={this.addDraggable.bind(null, 'plastic')}
          >
            <Image
              style={{ width: 60, height: 60 }}
              source={require('../../assets/images/plastic.png')}
            />
            <Text>Plastic</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={this.addDraggable.bind(null, 'metal')}
          >
            <Image
              style={{ width: 60, height: 60 }}
              source={require('../../assets/images/metal.png')}
            />
            <Text>Metal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={this.addDraggable.bind(null, 'paper')}
          >
            <Image
              style={{ width: 60, height: 60 }}
              source={require('../../assets/images/paper.png')}
            />
            <Text>Paper</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={this.addDraggable.bind(null, 'glass')}
          >
            <Image
              style={{ width: 60, height: 60 }}
              source={require('../../assets/images/glass.png')}
            />
            <Text>Glass</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={this.addDraggable.bind(null, 'trash')}
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
