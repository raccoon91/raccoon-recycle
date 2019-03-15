import React, { Component } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import ActionCreator from './actions';

class ConfirmModal extends Component {
  render() {
    const { uri } = this.props;

    return (
      <View style={styles.container}>
        <View style={{ height: '90%', borderWidth: 0.5, borderColor: '#4b636e', alignItems: 'center', borderRadius: 10, backgroundColor: '#a7c0cd' }}>
          <View style={styles.modal}>
            <Image
              style={{ width: 300, height: 300 }}
              source={{ uri }}
            />
            <Text>{this.props.username}</Text>
            <Text>{this.props.barcode}</Text>
          </View>
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
    backgroundColor: '#78909c',
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

function mapStateToProps(state) {
  return {
    username: state.userName,
    barcode: state.barcode
  };
};

export default connect(mapStateToProps)(ConfirmModal);