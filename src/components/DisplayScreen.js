import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';

class DisplayScreen extends Component {
  static navigationOptions = {
    title: 'Display',
    headerStyle: {
      backgroundColor: '#4b636e'
    },
    headerTintColor: 'white',
    headerTintStyle: {
      fontWeight: 'bold'
    }
  };

  state = {
    isLoad: false,
    response: null
  }

  componentDidMount() {
    const { navigation } = this.props;
    const barcode = navigation.getParam('barcode', 'no-data');

    fetch(`https://pb1ol5vs94.execute-api.us-east-1.amazonaws.com/recycle/download?barcode=${barcode}`)
      .then(res => res.json())
      .then((result) => {
        if (result.barcode) {
          this.setState({
            isLoad: true,
            response: result
          });
        } else {
          this.setState({
            isLoad: true
          });
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  render() {
    const { navigation } = this.props;
    const { isLoad } = this.state;
    const barcode = navigation.getParam('barcode', 'no-data');
    const response = navigation.getParam('confirm', false) || this.state.response;

    return (
      <View style={styles.container}>
        {
          !isLoad
            ? <ActivityIndicator size="large" />
            : <OnLoad response={response} barcode={barcode} navigation={navigation} />
        }
      </View>
    );
  }
}

const OnLoad = ({ response, barcode, navigation }) => {
  if (response) {
    return (
      <View>
        <Image
          style={{ width: 300, height: 300 }}
          source={{ uri: `https://s3.amazonaws.com/raccoonbucketlambda/recycle/${barcode}/image.png` }}
        />
        <Text style={{ fontSize: 20, color: 'white', marginVertical: 5, fontWeight: 'bold' }}>barcode: {response.barcode}</Text>
        <Text style={{ fontSize: 20, color: 'white', marginVertical: 5, fontWeight: 'bold' }}>user: {response.username}</Text>
      </View>
    );
  }

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={styles.noResultText}>There is no resulat about</Text>
      <Text style={styles.noResultText}>barcode: {barcode}</Text>
      <Text style={styles.noResultText}>If you want to make a new recycle</Text>
      <TouchableOpacity style={styles.saveButton} onPress={() => navigation.navigate('Camera')}>
        <Text style={styles.saveText}>Click Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#78909c'
  },
  noResultText: {
    marginBottom: 20,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 100,
    borderRadius: 5,
    backgroundColor: '#4b636e'
  },
  saveText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  responseText: {
    marginVertical: 5,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default DisplayScreen;
