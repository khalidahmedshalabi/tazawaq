import React, { Component } from 'react';
import { ActivityIndicator, View, Text, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default class TicketBox extends Component {
	statusIcon = (value) => {
		if(value == 0){
			return "alert-outline"
		}
		else{
			return "check-circle"
		}
	}
	statusText = (value) =>{
		if(value == 0){
			return "لم يتم الرد بعد"
		}
		else if(value == -1){
			return "مضافه"
		}
		else{
			return "تم الرد"
		}
	}
	render() {
		return (
			<View
				style={{
					backgroundColor: '#FFF',

					padding: 13,
					paddingHorizontal: 20,
					
				}}>

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
						name={this.statusIcon(this.props.status)}
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
						{this.statusText(this.props.status)}
					</Text>
				</View>

			</View>
		);
	}
}
