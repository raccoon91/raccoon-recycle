import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';

export default class DisplayScreen extends Component {
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
    const { isLoad, response } = this.state;
    const barcode = navigation.getParam('barcode', 'no-data');
    const result = navigation.getParam('confirm', false) || response;

    return (
      <View style={styles.container}>
        {
          !isLoad
            ? <ActivityIndicator size="large" />
            : <OnLoad result={result} barcode={barcode} navigation={navigation} />
        }
      </View>
    );
  }
}

const OnLoad = ({ result, barcode, navigation }) => {
  if (result) {
    return (
      <View>
        <Image
          style={{ width: 300, height: 300 }}
          source={{ uri: `https://s3.amazonaws.com/raccoonbucketlambda/recycle/${barcode}/image.png` }}
        />
        <Text style={styles.resultText}>barcode: {result.barcode}</Text>
        <Text style={styles.resultText}>user: {result.username}</Text>
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

DisplayScreen.propTypes = {
  navigation: PropTypes.objectOf(Object).isRequired
};

OnLoad.defaultProps = {
  result: null
};

OnLoad.propTypes = {
  result: PropTypes.objectOf(String),
  barcode: PropTypes.string.isRequired,
  navigation: PropTypes.objectOf(Object).isRequired
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
  resultText: {
    marginVertical: 5,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
