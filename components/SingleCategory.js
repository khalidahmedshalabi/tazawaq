import React, { Component } from 'react';
import { Dimensions, KeyboardAvoidingView, AsyncStorage,
        StyleSheet, TextInput, View, Text, Image,
        Platform, TouchableOpacity, Linking } from "react-native";

import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import Colors from '../constants/Colors';
import { LinearGradient } from 'expo';



export default class SingleCategory extends Component {

  render() {
    var styles = StyleSheet.create({
    	text:{
        textAlign:'center',
        backgroundColor:'transparent',
        color:'white',
        fontFamily:'myfont',
        fontSize:16
      },
      box:{
        width:'90%',
        alignSelf:'center',
        height:40,
        marginTop:15,
        borderRadius:4,
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',

      },

    });
    return (
      <LinearGradient
              colors={['#ebb70a', '#ebb70ae8', '#ebb70ad1']}
            style={[styles.box,this.props.style]}>

      <Text style={styles.text}>{this.props.name}</Text>
  </LinearGradient>

);

  }






}
