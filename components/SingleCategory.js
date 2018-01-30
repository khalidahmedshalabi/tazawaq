// import React, { Component } from 'react';
// import { Dimensions, KeyboardAvoidingView, AsyncStorage,
//         StyleSheet, TextInput, View, Text, Image,
//         Platform, TouchableOpacity, Linking } from "react-native";
//
// import { Ionicons } from '@expo/vector-icons';
// import { NavigationActions } from 'react-navigation';
// import Colors from '../constants/Colors';
//
//
// 
// export default class SingleCategory extends Component {
//
//   render() {
//     var styles = StyleSheet.create({
//     	text:{
//         fontFamily:'myfont',
//         fontSize:15,
//         marginRight:10
//       },
//       box:{
//         flex:1,
//         flexDirection:'row',
//         height:60,
//         alignItems:'center'
//       },
//       icon:{
//         justifyContent: 'flex-end',
//         marginLeft:10
//       }
//     });
//     return (
//   <View style={styles.box}>
//     <View style={{flex: 1}}>
//     <Ionicons
//         name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-dropleft'}
//         size={35}
//         color={Colors.secondaryColor}
//         style={styles.icon}/>
//     </View>
//     <View style={{flex: 1}}>
//       <Text style={styles.text}>{this.props.name}</Text>
//     </View>
//   </View>
// );
//
//   }
//
//
//
//
//
//
// }
