import React, { Component } from 'react';
import { Animated, Easing, Platform } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/HomeScreen';
import BarcodeScannerScreen from './src/BarcodeScannerScreen';
import DisplayScreen from './src/DisplayScreen';
import CameraScreen from './src/CameraScreen';
import InfoScreen from './src/InfoScreen';

let CollapseExpand = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });

  const scaleY = position.interpolate({
    inputRange,
    outputRange: ([0, 1, 1]),
  });

  return {
    opacity,
    transform: [{ scaleY }]
  };
};

let SlideFromRight = (index, position, width) => {
  const inputRange = [index - 1, index, index + 1];
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0]
  });
  const slideFromRight = { transform: [{ translateX }] }
  return slideFromRight
};

const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const width = layout.initWidth;
      const { index, route } = scene
      const params = route.params || {}; // <- That's new
      const transition = params.transition || 'default'; // <- That's new
      return {
        collapseExpand: CollapseExpand(index, position),
        default: SlideFromRight(index, position, width),
      }[transition];
    },
  }
}

const MainStack = createStackNavigator({
  Home: { screen: HomeScreen },
  BarcodeScanner: { screen: BarcodeScannerScreen },
  Display: { screen: DisplayScreen },
  Camera: { screen: CameraScreen },
  Info: { screen: InfoScreen }
},
{
  initialRouteName: 'Camera',
  headerMode: 'screen',
  mode: Platform.OS === 'ios' ? 'modal' : 'card',
  transitionConfig: TransitionConfiguration
});

const AppContainer = createAppContainer(MainStack);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
