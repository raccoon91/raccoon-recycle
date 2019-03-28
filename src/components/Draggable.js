import React, { Component } from 'react';
import { StyleSheet, View, PanResponder, Image } from 'react-native';

const images = {
  plastic: require('../../assets/plastic.png'),
  metal: require('../../assets/metal.png'),
  glass: require('../../assets/glass.png'),
  paper: require('../../assets/paper.png'),
  trash: require('../../assets/trash.png')
};

export default class App extends Component {
  state = {
    // dragging: false,
    initialTop: 50,
    initialLeft: 50,
    offsetTop: 0,
    offsetLeft: 0
  }

  panResponder = {}

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      // onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      // onPanResponderTerminate: this.handlePanResponderEnd,
    });
  }

  // Should we become active when the user presses down on the square?
  handleStartShouldSetPanResponder = () => {
    return true;
  }

  // // We were granted responder status! Let's update the UI
  // handlePanResponderGrant = () => {
  //   this.setState({dragging: true})
  // }

  // Every time the touch/mouse moves
  handlePanResponderMove = (e, gestureState) => {
    // Keep track of how far we've moved in total (dx and dy)
    this.setState({
      offsetTop: gestureState.dy,
      offsetLeft: gestureState.dx,
    });
  }

  // When the touch/mouse is lifted
  handlePanResponderEnd = (e, gestureState) => {
    const { initialTop, initialLeft } = this.state;

    // The drag is finished. Set the initialTop and initialLeft so that
    // the new position sticks. Reset offsetTop and offsetLeft for the next drag.

    this.setState({
      // dragging: false,
      initialTop: initialTop + gestureState.dy,
      initialLeft: initialLeft + gestureState.dx,
      offsetTop: 0,
      offsetLeft: 0,
    });
  }

  render() {
    const { initialTop, initialLeft, offsetTop, offsetLeft } = this.state;
    const { content } = this.props;

    const recycleImagePosition = {
      top: initialTop + offsetTop,
      left: initialLeft + offsetLeft,
    };

    return (
      <View style={styles.container}>
        <View
          {...this.panResponder.panHandlers}
          style={[styles.square, recycleImagePosition]}
        >
          <Image
            style={{ width: 60, height: 60, position: 'absolute' }}
            source={images[content]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  square: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
