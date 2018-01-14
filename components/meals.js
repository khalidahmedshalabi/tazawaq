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
				}}>
				<Image
					style={{ flex: 1, height: 200, borderRadius: 10 }}
					source={{ uri: this.props.image }}
				/>
				<Text
					style={{
						fontFamily: 'myfont',
						marginRight: 10,
						fontSize: 17,
						padding: 5,
						fontWeight: 'bold'
					}}>
					{this.props.name}
				</Text>
				<Text
					style={{
						fontFamily: 'myfont',
						marginRight: 15,
						fontSize: 10,
						padding: 0,
						color: 'gray'
					}}>
					{this.props.desc}
				</Text>
				<Text
					style={{
						fontFamily: 'myfont',
						marginRight: 15,
						fontSize: 10,
						padding: 0,
						color: 'gray'
					}}>
					{this.props.time} دقيقه
				</Text>
				<View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
					<Ionicons name="ios-star-outline" size={32} style={{}} color="gold" />
					<Text style={{ marginTop: 8 }}>4.3/5</Text>
				</View>
			</View>
		);
	}
}
