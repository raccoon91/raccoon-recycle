import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { StoreState } from '../types';

interface Props {
  barcode: string,
  username: string,
  base64Image: string,
  navigation: {
    navigate: (route: string, data: { barcode: string, confirm: { barcode: string, username: string }}) => void
  }
}

function ConfirmModal(props: Props) {
  const { base64Image } = props;
  const save = () => {
    const {
      barcode,
      username,
      base64Image,
      navigation
    } = props;

    fetch('https://pb1ol5vs94.execute-api.us-east-1.amazonaws.com/recycle/upload',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({barcode, username, base64Image })
      })
      .then(() => {
        navigation.navigate('DisplayRecycle', { barcode, confirm: { barcode, username } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <View style={{ padding: 20 }}>
          <Image
            style={{ width: 300, height: 300 }}
            source={{ uri: `data:image/png;base64, ${base64Image}` }}
          />
          <Text style={styles.modalText}>barcode: {props.barcode}</Text>
          <Text style={styles.modalText}>user: {props.username}</Text>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={save}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: '#4b636e'
  },
  saveText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

const mapStateToProps = (state: StoreState) => ({
  username: state.userName,
  barcode: state.barcode
});

export default connect(mapStateToProps)(ConfirmModal);
