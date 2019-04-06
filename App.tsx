import React from 'react';
import { Animated, Easing } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './src/reducers';
import { StoreState } from './src/types/index';
import { Action } from './src/actions/index';
import HomeScreen from './src/components/HomeScreen';
import BarcodeScannerScreen from './src/components/BarcodeScannerScreen';
import DisplayRecycleScreen from './src/components/DisplayRecycleScreen';
import CameraScreen from './src/components/CameraScreen';
import MakeRecycleScreen from './src/components/MakeRecycleScreen';

const SlideFromRight = (index: number, position: { interpolate: (object: {inputRange: Array<number>, outputRange: Array<number>}) => void }, width: number) => {
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
  screenInterpolator: (sceneProps: any) => {
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
const store = createStore<StoreState, Action, any, any>(reducer, {
  userName: '',
  barcode: ''
});

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
