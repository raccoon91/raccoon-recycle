import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
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
              source={{ uri: `data:image/png;base64, ${uri}` }}
            />
            <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>barcode: {this.props.username}</Text>
            <Text style={{ fontSize: 20, marginTop: 10, fontWeight: 'bold' }}>user: {this.props.barcode}</Text>
          </View>
          <TouchableOpacity style={{ marginTop: 20, backgroundColor: '#4b636e', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5 }} onPress={this.save}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  save = (props) => {
    const { barcode, username, uri, navigation } = this.props;

    fetch('https://pb1ol5vs94.execute-api.us-east-1.amazonaws.com/recycle/upload',
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({barcode: barcode, username: username, base64Image: uri})
    })
    .then(res => {
      console.log('res', res.body)
      navigation.navigate('Display', { 'barcode' : barcode, 'confirm': { barcode, username } });
    })
    .catch(err => {
      console.log('post error');
      console.log(err);
    })
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