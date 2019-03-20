import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ActivityIndicator, Image } from 'react-native';

export default class DisplayScreen extends Component {
  static navigationOptions = {
    title: 'Display'
  };

  state = {
    isLoad: false,
    response: null
  }

  componentDidMount() {
    const barcode = this.props.navigation.getParam('barcode', 'no-data');
    console.log('mount', barcode);

    fetch(`https://pb1ol5vs94.execute-api.us-east-1.amazonaws.com/recycle/download?barcode=${barcode}`)
    .then(res => res.json())
    .then(result => {
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
    .catch(err => {
      console.log('err', err);
    })
  }

  componentWillUpdate() {
    console.log('update');
  }

  render() {
    console.log('result', this.state.response);
    const barcode = this.props.navigation.getParam('barcode', 'no-data');

    return (
      <View style={styles.container}>
        {
          !this.state.isLoad
          ? <ActivityIndicator size="large" />
          : <OnLoad response={this.state.response} barcode={barcode} navigation={this.props.navigation} />
        }
      </View>
    );
  }
}

OnLoad = ({ response, barcode, navigation }) => {
  if (response) {
    return (
      <View>
        <Image
          style={{ width: 300, height: 300 }}
          source={{ uri: "https://s3.amazonaws.com/raccoonbucketlambda/recycle/" + barcode + "/image.png" }}
        />
        <Text style={{ fontSize: 20, color: 'white', marginVertical: 5, fontWeight: 'bold' }}>barcode: {response.barcode}</Text>
        <Text style={{ fontSize: 20, color: 'white', marginVertical: 5, fontWeight: 'bold' }}>user: {response.username}</Text>
      </View>
    );
  } else {
    return (
      <View>
          <Text style={styles.text}>There is no resulat about</Text>
          <Text style={styles.text}>{barcode}</Text>
          <Text style={styles.text}>If you want to make a new recycle</Text>
          <TouchableOpacity style={{ marginTop: 140, backgroundColor: '#4b636e', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5 }} onPress={() => navigation.navigate('Camera')}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Click Save</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#78909c',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  }
});
