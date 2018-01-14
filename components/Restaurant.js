import React, { Component } from 'react';
import { ActivityIndicator, View, Text, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Ionicons } from '@expo/vector-icons';
export default class Restaurant extends Component {
	render() {
		return (
			<View
				style={{
					backgroundColor: '#FFF',
					height: 300,
					padding: 13,
					paddingHorizontal: 20,
					shadowColor: '#000',
					shadowOpacity: 2,
					shadowOffset: {
						height: 2,
						width: 1
					}
				}}
			/>
		);
	}
}
