import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

export default class DisplayScreen extends Component {
  static navigationOptions = {
    title: 'Display'
  };

  render() {
    const data = this.props.navigation.getParam('data', 'no-data');

    return (
      <View style={styles.container}>
        <Text style={styles.text}>There is no resulat about</Text>
        <Text style={styles.text}>{data}</Text>
        <Text style={styles.text}>If you want to make a new recycle</Text>
        <TouchableOpacity style={{ marginTop: 140, backgroundColor: '#4b636e', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5 }} onPress={() => this.props.navigation.navigate('Camera', { 'barcode': data })}>
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
