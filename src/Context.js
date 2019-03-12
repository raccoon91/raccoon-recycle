import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Context extends Component {
  render() {
    const { title, text } = this.props;

    console.log(this.props);

    return (
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {title}
        </Text>
        <Text style={styles.text}>
          {text}
        </Text>
      </View>
    );
  }

  // _toggleComplete = (event) => {
  //   event.stopPropagation();
  //
  //   const { id, isCompleted, completeToDo, uncompleteToDo } = this.props;
  //
  //   if (isCompleted) {
  //     uncompleteToDo(id);
  //   } else {
  //     completeToDo(id);
  //   }
  // }
  //
  // _startEditing = (event) => {
  //   event.stopPropagation();
  //
  //   this.setState({
  //     isEditing: true
  //   });
  // }
  //
  // _finishEditing = (event) => {
  //   event.stopPropagation();
  //
  //   const { toDoValue } = this.state;
  //   const { id, updateToDo } = this.props;
  //
  //   updateToDo(id, toDoValue);
  //
  //   this.setState({
  //     isEditing: false
  //   });
  // }
  //
  // _controllInput = (text) => {
  //   this.setState({
  //     toDoValue: text
  //   });
  // }
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  text: {
    height: 30,
    width: 100,
    backgroundColor: 'yellow',
    marginRight: 10
  }
});
