import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  PanResponder,
  Image
} from 'react-native';

const images = {
  plastic: require('../../assets/images/plastic.png'),
  metal: require('../../assets/images/metal.png'),
  glass: require('../../assets/images/glass.png'),
  paper: require('../../assets/images/paper.png'),
  trash: require('../../assets/images/trash.png')
};

export default class RecycleImage extends Component {
  state = {
    initialTop: 50,
    initialLeft: 50,
    offsetTop: 0,
    offsetLeft: 0,
    dragging: false
  }

  panResponder = {}

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
    });
  }

  handleStartShouldSetPanResponder = () => true;

  handlePanResponderGrant = () => {
    this.setState({ dragging: true });
  }

  handlePanResponderMove = (e, gestureState) => {
    this.setState({
      offsetTop: gestureState.dy,
      offsetLeft: gestureState.dx,
    });
  }

  handlePanResponderEnd = (e, gestureState) => {
    const { initialTop, initialLeft } = this.state;

    this.setState({
      dragging: false,
      initialTop: initialTop + gestureState.dy,
      initialLeft: initialLeft + gestureState.dx,
      offsetTop: 0,
      offsetLeft: 0,
    });
  }

  render() {
    const { content } = this.props;
    const {
      initialTop,
      initialLeft,
      offsetTop,
      offsetLeft,
      dragging
    } = this.state;

    const recycleImagePosition = {
      top: initialTop + offsetTop,
      left: initialLeft + offsetLeft,
      opacity: dragging ? 0.6 : 1
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

RecycleImage.propTypes = {
  content: PropTypes.string.isRequired
};

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
