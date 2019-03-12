import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default class ConfirmModal extends Component {
  render() {
    const { uri } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.modal}>
          <Image
            style={{ width: 300, height: 300 }}
            source={{ uri }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    zIndex: 2
  },
  modal: {
    padding: 20
  }
});