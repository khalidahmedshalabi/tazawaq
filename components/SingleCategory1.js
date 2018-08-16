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
        alignSelf:'center',
        height:30,
        marginTop:15,
        alignItems:'center',
        justifyContent:'center',

      },

    });
    return (
      <View style={{flexDirection:'row',justifyContent:'center'}}>
        <LinearGradient
          colors={['#ebb70a', '#ebb70ae8', '#ebb70ad1']}
        style={{width:'5%',marginTop:15,marginHorizontal:5
        }}>
        </LinearGradient>

        <LinearGradient
                colors={['#ebb70a', '#ebb70ae8', '#ebb70ad1']}
              style={[styles.box,this.props.style]}>

              <Text style={styles.text}>{this.props.name}</Text>
        </LinearGradient>
          <LinearGradient
            colors={['#ebb70a', '#ebb70ae8', '#ebb70ad1']}
          style={{width:'5%',marginTop:15,marginHorizontal:5
          }}>
          </LinearGradient>
        </View>


);

  }






}
