import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import * as Expo from 'expo';
import { connect } from 'react-redux';
import { loginUserName } from './actions';

class HomeScreen extends Component {
  state = {
    signedIn: false,
    name: '',
    photoUrl: ''
  };

  static navigationOptions = {
    title: 'Home'
  };

  signIn = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: '1050254961075-9f9osk0h0kvc562l3sh0pbhc5bvv7ift.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });

      if (result.type === 'success') {
        this.setState({
          signedIn: true,
          photoUrl: result.user.photoUrl
        });

        this.props.loginUserName(result.user.name);
      } else {
        console.log('cancelled');
      }
    } catch (err) {
      console.log('error', err);
    }
  }

  render() {
    console.log(this.state.photoUrl);

    return (
      <View style={styles.container}>
        {
          this.state.signedIn
          ? <LoggedInPage name={this.props.username} photoUrl={this.state.photoUrl} navigation={this.props.navigation} />
          : <LoginPage signIn={this.signIn} />
        }
      </View>
    );
  }
}

const LoginPage = props => {
  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ width: 180, height: 180, alignItems: 'center', justifyContent: 'center', backgroundColor: '#a7c0cd', marginBottom: 140, borderRadius: 20 }}>
        <Image
          style={{ width: 140, height: 140 }}
          source={require('../assets/recycle.png')}
        />
      </View>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems:'center', backgroundColor: '#4b636e', padding: 5, borderRadius: 5 }} onPress={() => props.signIn()}>
        <View style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', borderRadius: 5 }}>
          <Image
            style={{ width: 40, height: 40 }}
            source={require('../assets/google_logo.png')}
          />
        </View>
        <Text style={{ fontSize: 22, fontWeight:'bold', color: '#ffffff', marginHorizontal: 20 }}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const LoggedInPage = props => {
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
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
});

function mapStateToProps(state) {
  return {
    username: state.userName
  };
};

function mapDispatchToProps(dispatch) {
  return {
    loginUserName: (name) => {
      dispatch(loginUserName(name));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);