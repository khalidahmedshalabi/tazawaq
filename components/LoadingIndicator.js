import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Colors from '../constants/Colors';

export default class LoadingIndicator extends Component {

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
        {
          (this.props.color == '#fff')?(
          <ActivityIndicator
            size={this.props.size}
            color="#fff" />
          ):(
            <ActivityIndicator
              size={this.props.size}
              color={Colors.mainColor} />
          )
        }
      </View>
    );
  }
}
