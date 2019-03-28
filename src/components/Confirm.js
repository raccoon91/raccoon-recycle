import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
// import ActionCreator from '../actions';

class ConfirmModal extends Component {
  save = () => {
    const { barcode, username, uri, navigation } = this.props;

    fetch('https://pb1ol5vs94.execute-api.us-east-1.amazonaws.com/recycle/upload',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({barcode, username, base64Image: uri})
      })
      .then((res) => {
        console.log('res', res.body);
        navigation.navigate('Display', { barcode, confirm: { barcode, username } });
      })
      .catch((err) => {
        console.log('post error');
        console.log(err);
      });
  }

  render() {
    const { uri } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <View style={{ padding: 20 }}>
            <Image
              style={{ width: 300, height: 300 }}
              source={{ uri: `data:image/png;base64, ${uri}` }}
            />
            <Text style={styles.modalText}>barcode: {this.props.barcode}</Text>
            <Text style={styles.modalText}>user: {this.props.username}</Text>
          </View>
          <TouchableOpacity style={{ marginTop: 20, backgroundColor: '#4b636e', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5 }} onPress={this.save}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Save</Text>
          </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#78909c',
    zIndex: 2
  },
  modalContainer: {
    alignItems: 'center',
    height: '90%',
    borderColor: '#4b636e',
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: '#a7c0cd'
  },
  modalText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold'
  }
});

const mapStateToProps = (state) => {
  return {
    username: state.userName,
    barcode: state.barcode
  };
};

export default connect(mapStateToProps)(ConfirmModal);
