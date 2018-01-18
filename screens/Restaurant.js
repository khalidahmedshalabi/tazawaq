import React from 'react';
import { Dimensions, KeyboardAvoidingView, AsyncStorage,
        StyleSheet, TextInput, View, Text, Image,
        Platform, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import Colors from '../constants/Colors';

import LoadingIndicator from '../components/LoadingIndicator';
//import Server from '../constants/server';

export default class Restaurant extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `قائمه الطعام`,
  });
    render() {
      const { params } = this.props.navigation.state;

      return(
        <Text>{params.key}</Text>
      );

    }
}
