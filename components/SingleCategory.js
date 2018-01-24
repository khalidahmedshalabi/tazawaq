import React, { Component } from 'react';
import { ActivityIndicator, View, Text, Image } from 'react-native';
import Colors from '../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default class SingleCategory extends Component {

  render() {
    return (
      <View style={{height:50,justifyContent: 'center',flex:.8,marginRight: 4, borderRadius: 10 }}>
        <Text style={{fontFamily:'myfont',textAlign:'center'}} >{this.props.name}</Text>
      </View>
    );
  }






}
