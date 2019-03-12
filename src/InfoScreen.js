import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import uuidv1 from 'uuid/v1';
import Context from './Context';

let contextIndex = 0;

export default class InfoScreen extends Component {
  state = {
    // barcode: this.props.navigation.getParam('barcode'),
    recycleTitle: '',
    recycleText: '',
    context: {}
  };

  static navigationOptions = {
    title: 'information'
  };

  controllRecycleTitle(text) {
    this.setState({
      recycleTitle: text
    });
  }

  controllRecycleText(text) {
    this.setState({
      recycleText: text
    });
  }

  addContext() {
    const { barcode, recycleTitle, recycleText } = this.state;

    fetch('https://intense-ocean-79148.herokuapp.com/recycle/036000291452', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        context: this.state.context
      })
    })
      .then(res => res.json())
      .then(result => console.log('fetch', result));

    if (recycleTitle !== '' && recycleText !== '') {
      this.setState(prevState => {
        const key = contextIndex++;

        const newRecycleContext = {
          [key]: {
            key,
            title: recycleTitle,
            text: recycleText
          }
        };

        const newState = {
          ...prevState,
          recycleTitle: '',
          recycleText: '',
          context: {
            ...prevState.context,
            ...newRecycleContext
          }
        };

        return newState;
      });
    }
  }

  render() {
    const imgURI = this.props.navigation.getParam('imgURI');
    const { context } = this.state;
    console.log(context);

    return (
      <View style={styles.container}>
        <Image
          style={{ width: 200, height: 200 }}
          source={{ uri: `data:image/png;base64,${imgURI}` }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={this.state.recycleTitle}
            onChangeText={this.controllRecycleTitle.bind(this)}
          />
          <TextInput
            style={styles.input}
            value={this.state.recycleText}
            onChangeText={this.controllRecycleText.bind(this)}
          />
          <TouchableOpacity onPress={this.addContext.bind(this)}>
            <View style={{ width: 50, height: 30, backgroundColor: 'blue'}}>
              <Text>submit</Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          {
            Object.values(context).map(one => {
              return (
                <Context
                  {...one}
                />
              );
            })
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputContainer: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  input: {
    height: 30,
    width: 100,
    backgroundColor: 'gray',
    marginRight: 10
  }
});
