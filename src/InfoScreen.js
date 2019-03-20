import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { FontAwesome } from '@expo/vector-icons';
import Draggable from './Draggable';
import Confirm from './Confirm';

export default class InfoScreen extends Component {
  state = {
    // barcode: this.props.navigation.getParam('barcode'),
    draggables: [],
    uri: null
  };

  static navigationOptions = {
    title: 'information'
  };

  render() {
    const imgURI = this.props.navigation.getParam('imgURI');

    console.log('render', this.state.draggables);

    return (
      <View style={styles.container}>
        {
          this.state.uri
          ? <Confirm uri={this.state.uri} />
          : null
        }
        <View>
          <ViewShot
            style={styles.dropZone}
            ref="viewShot"
            options={{ format: 'png', quality: 0.9, result: "base64" }}
          >
            <View>
              <Image
                style={{ width: 400, height: 400 }}
                source={{ uri: `data:image/png;base64,${imgURI}` }}
              />
              <View style={styles.wrapper}>
                {
                  this.state.draggables.length
                  ? this.state.draggables.map((draggable) => {
                    return draggable;
                  })
                  : null
                }
              </View>
            </View>
          </ViewShot>
          <View style={{position: 'absolute', bottom: 0, flexDirection: "row", width: '100%', alignItems: 'center', justifyContent: 'space-around', marginVertical: 10}}>
            <TouchableOpacity
              style={{}}
              onPress={this.undo}
            >
              <FontAwesome name="undo" size={28} color="#FF4136" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{}}
              onPress={this.takeSnapShot}
              >
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Take</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={this.addDraggable.bind(null, 'plastic')}
          >
            <Image
              style={{ width: 60, height: 60}}
              source={require('../assets/plastic.png')}
            />
            <Text>Plastic</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.addDraggable.bind(null, 'metal')}
          >
            <Image
              style={{ width: 60, height: 60}}
              source={require('../assets/metal.png')}
            />
            <Text>Metal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.addDraggable.bind(null, 'paper')}
          >
            <Image
              style={{ width: 60, height: 60}}
              source={require('../assets/paper.png')}
            />
            <Text>Paper</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.addDraggable.bind(null, 'glass')}
          >
            <Image
              style={{ width: 60, height: 60}}
              source={require('../assets/glass.png')}
            />
            <Text>Glass</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.addDraggable.bind(null, 'trash')}
          >
            <Image
              style={{ width: 60, height: 60}}
              source={require('../assets/trash.png')}
            />
            <Text>Trash</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  addDraggable = (text) => {
    const { draggables } = this.state;
    const index = draggables.length;

    this.setState({
      draggables: draggables.concat(<Draggable content={text} key={index} />)
    });
  }

  takeSnapShot = () => {
    this.refs.viewShot.capture().then(uri => {
      this.setState({
        uri: uri
      });
    });
  }

  undo = () => {
    const copiedDraggables = this.state.draggables.slice();

    copiedDraggables.pop();

    this.setState({
      draggables: copiedDraggables
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#78909c',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputContainer: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  input: {
    height: 30,
    width: 100,
    backgroundColor: 'gray',
    marginRight: 10
  },
  mainContainer: {
    flex: 1
  },
  row: {
    flexDirection: "row",
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 30
  },  
  dropZone: {
    height: 400,
    backgroundColor: "#00334d"
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold"
  },
  temp: {
    backgroundColor: '#4b636e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0
  }
});
