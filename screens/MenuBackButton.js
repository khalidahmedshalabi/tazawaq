import React from 'react';
import {
    TouchableOpacity,
    Platform,
    Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default class MenuBackButton extends React.Component {
  render() {
    return (
        <TouchableOpacity
            onPress={ () => this.props.navigation.goBack() }
            style={{ ios:{paddingTop: 20, paddingLeft:5}, flexDirection: 'row', alignItems: 'center' }}>

            <Ionicons
              name={ (Platform.OS == 'ios') ? ("ios-arrow-back"):("md-arrow-back") }
              size={28}
              color="#000"
              style={{ backgroundColor: 'transparent', marginRight: 7,marginTop:7}}/>

            <Text style={{ backgroundColor:'transparent', color: "#000",fontFamily:'myfont', fontWeight: 'bold', fontSize: 16 }}>رجوع</Text>
        </TouchableOpacity>
    );
  }
}
