import React, { Component } from 'react';
import { ActivityIndicator, View, Text, Image } from 'react-native';
import Colors from '../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Server from '../constants/server';

const AVERAGE_STARS_COUNT = 2; // between 5 and 0, recommended: 2 or 2.5

export default class OrderBox extends Component {

	determineStarIcon = (stars_count) => {
		if(stars_count < AVERAGE_STARS_COUNT)
			return ("star-outline");
		else if(stars_count < 5)
			return ("star-half");
		else
			return ("star");
	}

	fetch_time = ()=>{
		var id = this.props.idkey;

		// fetch(Server.dest + '/api/order-time?id=' + this.props.idkey)
		// 	.then(res => res.json())
		// 	.then(time => {
		// 		console.log(time);
		// 	});
	}
	constructor(props) {
		super(props);
		//this.props.screenName  the key here for the category  restaurant_id---->

		this.state = {
			Time:0
		}
	}
		componentDidMount(){

			this.fetch_time();
		}
	render() {

		return (
			<View style={{ flex:1, flexDirection: 'row', justifyContent:'flex-end', alignItems: 'center' }}>
				<View style={{ flex: 1, paddingTop: 9, paddingRight:10, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end'}}>
				<View style={{flex:1,flexDirection:'row'}}>

				<Text style={{ fontFamily: 'myfont', fontSize: 15,textAlign:'right',justifyContent:'flex-end' }}>{this.props.name}</Text>


				</View>
					<View style={{ flex: 1 }}>
						<Text style={{ fontFamily: 'myfont', color: '#777777', fontSize: 12,textAlign:'right'}}>{this.props.desc}</Text>
					</View>

					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center'
						}}>


						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center'
							}}>
							<MaterialCommunityIcons
								name="cash"
								size={20}
								color={Colors.secondaryColor}
							/>
							<Text
								style={{
									marginLeft: 4,
									fontFamily: 'myfont',
									fontSize: 10,
									color: Colors.secondaryColor
								}}>
								{this.props.price} رس
							</Text>
						</View>
					{(this.props.status == 1)?(
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center'
							}}>
							<MaterialCommunityIcons
								name="clock"
								size={20}
								color={Colors.secondaryColor}
							/>
							<Text
								style={{
									marginLeft: 4,
									fontFamily: 'myfont',
									fontSize: 10,
									color: Colors.secondaryColor,
									textAlign:'right',
								}}>
							المتبقي للتوصيل { this.props.time}د
							</Text>
						</View>
					):null}



					</View>
				</View>

				<View style={{ flex: 0.5 }}>
					<Image
						source={this.props.image}
						style={{ width: 100, height: 100, marginTop: 10, marginBottom: 11,
							marginRight: 4, borderRadius: 10 }}
					/>
				</View>
			</View>
		);
	}
}
