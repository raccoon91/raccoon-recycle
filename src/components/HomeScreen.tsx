import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Google } from 'expo';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { loginUserName, Action } from '../actions';
import { StoreState } from '../types';

export interface Props {
  username: string;
  saveloginUserName: (name: string) => void;
  navigation: {
    navigate: (route: string) => void
  };
}

export interface LogInPageProps {
  signIn: () => void;
}

export interface LoggedInPageProps {
  name: string;
  photoUrl: string;
  navigation: {
    navigate: (route: string) => void
  };
}

interface State {
  signedIn: boolean;
  photoUrl: string;
}

class HomeScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null
  };

  state = {
    signedIn: false,
    photoUrl: ''
  };

  signIn = async () => {
    try {
      // development
      const clientId = '1050254961075-9f9osk0h0kvc562l3sh0pbhc5bvv7ift.apps.googleusercontent.com';

      // deploy
      // const clientId = '1050254961075-qruht9q5sdrjgg5l0k521q4pt9e2dgq6.apps.googleusercontent.com';
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
      console.log('error', err);
    }
  }

  render() {
    const { signedIn, photoUrl } = this.state;
    const { username, navigation } = this.props;

    return (
      <View style={styles.container}>
        {
          signedIn
            ? <LoggedInPage name={username} photoUrl={photoUrl} navigation={navigation} />
            : <LogInPage signIn={this.signIn} />
        }
      </View>
    );
  }
}

const LogInPage = ({ signIn }: LogInPageProps) => (
  <View style={{ alignItems: 'center' }}>
    <View style={styles.appLogoContainer}>
      <Image
        style={{ width: 140, height: 140 }}
        source={require('../../assets/images/recycle.png')}
      />
    </View>
    <TouchableOpacity style={styles.loginButton} onPress={() => signIn()}>
      <View style={styles.googleLogoWrapper}>
        <Image
          style={{ width: 40, height: 40 }}
          source={require('../../assets/images/google_logo.png')}
        />
      </View>
      <Text style={styles.loginText}>Login in with Google</Text>
    </TouchableOpacity>
  </View>
);

const LoggedInPage = ({ name, photoUrl, navigation }: LoggedInPageProps) => (
  <View style={styles.container}>
    <Text style={styles.logedinText}>Welcome!</Text>
    <Text style={styles.userName}>{name}</Text>
    <Image style={styles.userImage} source={{ uri: photoUrl }} />
    <TouchableOpacity style={styles.scanButton} onPress={() => navigation.navigate('BarcodeScanner')}>
      <Text style={styles.scanText}>Click To Scan</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#78909c'
  },
  appLogoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 140,
    width: 180,
    height: 180,
    borderRadius: 20,
    backgroundColor: '#a7c0cd'
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#4b636e'
  },
  googleLogoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#ffffff'
  },
  loginText: {
    marginHorizontal: 20,
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold'
  },
  logedinText: {
    marginBottom: 10,
    color: 'white',
    fontSize: 34,
    fontWeight: 'bold'
  },
  userName: {
    marginBottom: 20,
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold'
  },
  userImage: {
    marginTop: 15,
    width: 100,
    height: 100,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 3,
    borderRadius: 150
  },
  scanButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 100,
    borderRadius: 5,
    backgroundColor: '#4b636e'
  },
  scanText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

const mapStateToProps = (state: StoreState) => ({
  username: state.userName
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  saveloginUserName: (name: string) => {
    dispatch(loginUserName(name));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
