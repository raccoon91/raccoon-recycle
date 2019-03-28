import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Google } from 'expo';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  // Platform
} from 'react-native';
import { loginUserName } from '../actions';
// import * as Expo from 'expo';

// const isAndroid = () => Platform.OS === 'android';

class HomeScreen extends Component {
  static navigationOptions = {
    // title: 'Home'
    header: null
  };

  state = {
    signedIn: false,
    // name: '',
    photoUrl: ''
  };

  signIn = async () => {
    try {
      // const clientId = '1050254961075-qruht9q5sdrjgg5l0k521q4pt9e2dgq6.apps.googleusercontent.com';
      const clientId = '1050254961075-9f9osk0h0kvc562l3sh0pbhc5bvv7ift.apps.googleusercontent.com';
      const { type, user } = await Google.logInAsync({ clientId });
      const { saveloginUserName } = this.props;

      if (type === 'success') {
        this.setState({
          signedIn: true,
          photoUrl: user.photoUrl
        });

        saveloginUserName(user.name);
      }
    } catch (err) {
      console.log('error', err)
    }
  }

  // signIn = async () => {
  //   try {
  //     const result = await Expo.Google.logInAsync({
  //       clientId: isAndroid() ? '1050254961075-9f9osk0h0kvc562l3sh0pbhc5bvv7ift.apps.googleusercontent.com' : null,
  //       scopes: ['profile', 'email']
  //     });

  //     if (result.type === 'success') {
  //       this.setState({
  //         signedIn: true,
  //         photoUrl: result.user.photoUrl
  //       });

  //       this.props.loginUserName(result.user.name);
  //     } else {
  //       console.log('cancelled');
  //     }
  //   } catch (err) {
  //     console.log('error', err);
  //   }
  // }

  render() {
    const { signedIn, photoUrl } = this.state;
    const { username, navigation } = this.props;

    return (
      <View style={styles.container}>
        {
          signedIn
            ? <LoggedInPage name={username} photoUrl={photoUrl} navigation={navigation} />
            : <LoginPage signIn={this.signIn} />
        }
      </View>
    );
  }
}

const LoginPage = (props) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ width: 180, height: 180, alignItems: 'center', justifyContent: 'center', backgroundColor: '#a7c0cd', marginBottom: 140, borderRadius: 20, marginTop: 30 }}>
        <Image
          style={{ width: 140, height: 140 }}
          source={require('../../assets/recycle.png')}
        />
      </View>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems:'center', backgroundColor: '#4b636e', padding: 5, borderRadius: 5 }} onPress={() => props.signIn()}>
        <View style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', borderRadius: 5 }}>
          <Image
            style={{ width: 40, height: 40 }}
            source={require('../../assets/google_logo.png')}
          />
        </View>
        <Text style={{ fontSize: 22, fontWeight:'bold', color: '#ffffff', marginHorizontal: 20 }}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const LoggedInPage = (props) => {
  return (
    <View style={styles.container}>
      <Text style={{ color: 'white', fontSize: 34, fontWeight: 'bold', marginBottom: 10 }}>Welcome!</Text>
      <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold', marginBottom: 20 }}>{props.name}</Text>
      <Image style={styles.image} source={{ uri: props.photoUrl }} />
      <TouchableOpacity style={{ backgroundColor: '#4b636e', marginTop: 100, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5 }} onPress={() => props.navigation.navigate('BarcodeScanner')}>
        <Text style={{ fontSize: 20, color: '#ffffff', fontWeight: 'bold' }}>Click To Scan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#78909c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: 15,
    width: 100,
    height: 100,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 3,
    borderRadius: 150
  }
});

function mapStateToProps(state) {
  return {
    username: state.userName
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveloginUserName: (name) => {
      dispatch(loginUserName(name));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
