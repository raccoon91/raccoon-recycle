import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class DisplayScreen extends Component {
  static navigationOptions = {
    title: 'Display'
  };

  render() {
    const data = this.props.navigation.getParam('data', 'no-data');

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{data}</Text>
        <Button
          title="SAVE"
          onPress={() => this.props.navigation.navigate('Camera', { 'barcode': data })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
