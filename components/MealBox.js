import React, { Component } from 'react';
import { ActivityIndicator, View, Text, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default class MealBox extends Component {
	render() {
		return (
			<View
				style={{
					backgroundColor: '#FFF',

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
					style={{ flex: 1, height: 130, borderRadius: 10 }}
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
						fontSize: 12,
						padding: 0,
						color: 'gray'
					}}>
					{this.props.desc}
				</Text>
				<View
					style={{
						flex: 1,
						flexDirection: 'row',

					}}>
					<MaterialCommunityIcons
						name="cash-multiple"
						size={22}
						color={Colors.secondaryColor}
					/>
					<Text
						style={{
							marginLeft: 4,
							fontFamily: 'myfont',
							fontSize: 12,
							color: Colors.secondaryColor
						}}>
						{this.props.price} ر.س
					</Text>
				</View>

			</View>
		);
	}
}