import React from 'react';
import renderer from 'react-test-renderer';
import { Text } from 'react-native';
import HomeScreen, { LogInPage, LoggedInPage } from '../HomeScreen';

describe('HomeScreen Test', () => {
  it('LogInPage renders correctly', () => {
    const logInPage = renderer.create(<LogInPage signIn={() => console.log('signIn')} />).toJSON();

    expect(logInPage).toMatchSnapshot();
  });

  it('LoggeedInPage renders correctly', () => {
    const loggedInPage = renderer.create(<LoggedInPage name={'raccon'} photoUrl={'URL'} navigation={{navigate: () => console.log('route')}} />).toJSON();

    expect(loggedInPage).toMatchSnapshot();
  });

  describe('HomeScreen renders correctly', () => {
    const homeScreen = renderer.create(<HomeScreen username={'raccon'} saveloginUserName={() => console.log('saveloginUserName')} navigation={{navigate: () => console.log('route')}} />);
    const homeInstance = homeScreen.root;

    it('before login', () => {
      expect(homeInstance.findByType(Text).props.children).toEqual('Login with Google');
    });
    
    it('after login', () => {
      homeInstance.instance.setState({ signedIn: true });
      
      expect(homeInstance.findAllByType(Text)[0].props.children).toEqual('Welcome!');
    });
  });
});