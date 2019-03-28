import React from 'react';
import { Animated, Easing } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import HomeScreen from './src/components/HomeScreen';
import BarcodeScannerScreen from './src/components/BarcodeScannerScreen';
import DisplayRecycleScreen from './src/components/DisplayRecycleScreen';
import CameraScreen from './src/components/CameraScreen';
import MakeRecycleScreen from './src/components/MakeRecycleScreen';
import reducers from './src/reducers';

const SlideFromRight = (index, position, width) => {
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0]
  });

  return { transform: [{ translateX }] };
};

const TransitionConfiguration = () => ({
  transitionSpec: {
    duration: 750,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
    useNativeDriver: true,
  },
  screenInterpolator: (sceneProps) => {
    const { layout, position, scene } = sceneProps;
    const width = layout.initWidth;
    const { index } = scene;

    return SlideFromRight(index, position, width);
  }
});

const MainStack = createStackNavigator({
  Home: { screen: HomeScreen },
  BarcodeScanner: { screen: BarcodeScannerScreen },
  DisplayRecycle: { screen: DisplayRecycleScreen },
  Camera: { screen: CameraScreen },
  MakeRecycle: { screen: MakeRecycleScreen }
},
{
  initialRouteName: 'Home',
  headerMode: 'screen',
  mode: 'card',
  transitionConfig: TransitionConfiguration
});

const AppContainer = createAppContainer(MainStack);

export default function App() {
  return (
    <Provider store={createStore(reducers)}>
      <AppContainer />
    </Provider>
  );
}
