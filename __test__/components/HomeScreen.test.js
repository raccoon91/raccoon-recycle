import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import HomeScreen from '../../src/HomeScreen';

describe('<HomeScreen />', () => {
  // let component = null;

  // it('render correctly', () => {
  //   component = shallow(<HomeScreen />);
  // });

  // it('matches snapshot', () => {
  //   expect(component).toMatchSnapshot();
  // });
  it('test', () => {
    const wrapper = shallow(<HomeScreen />);
    expect(wrapper.find(View)).to.have.length(1);
  });
});