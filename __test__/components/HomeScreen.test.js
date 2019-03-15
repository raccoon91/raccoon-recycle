import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import HomeScreen from '../../src/HomeScreen';

describe('<HomeScreen />', () => {
  let component = null;

  it('render correctly', () => {
    component = shallow(<HomeScreen />);
  });

  it('matches snapshot', () => {
    expect(component).toMatchSnapshot();
  })
})