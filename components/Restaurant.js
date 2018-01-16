import React, { Component } from 'react';
import { ActivityIndicator, View, Text, Image } from 'react-native';

//import FastImage from 'react-native-fast-image';

import { Ionicons } from '@expo/vector-icons';
import FadeIn from 'react-native-fade-in-image';
export default class Restaurant extends Component {
	render() {
		return (
			<View
				style={{
					borderWidth: 0.5,
					borderColor: '#d6d7da',
					flexDirection: 'row',
					flexWrap: 'wrap',

					backgroundColor: '#fff',
					flex: 1
				}}>
				<View
					style={{
						justifyContent: 'flex-start',
						flex: 0.7
					}}>
					<View
						style={{
							flex: 1,
							justifyContent: 'flex-end'
						}}>
						<Text
							style={{
								color: 'black',
								marginTop: 5,
								marginRight: 15,
								fontFamily: 'myfont',
								fontSize: 15,
								flex: 0.8,

								justifyContent: 'flex-end'
							}}>
							{this.props.name}
						</Text>
						<Text
							style={{
								color: 'gray',
								marginTop: 5,
								marginRight: 15,
								fontFamily: 'myfont',
								fontSize: 12,
								flex: 1
							}}>
							{this.props.desc}
						</Text>
					</View>

					<View
						style={{
							flex: 0.7,
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
							marginLeft: 10
						}}>
						<Ionicons
							name="ios-star-outline"
							size={25}
							style={{
								marginRight: 2
							}}
							color="gold"
						/>
						<Text
							style={{
								marginTop: 8,
								color: 'gray',
								marginTop: 5,
								justifyContent: 'center',
								alignItems: 'center',
								fontFamily: 'myfont',
								fontSize: 13,
								flex: 0.3
							}}>
							4/5
						</Text>

						<Ionicons
							name="ios-bicycle-outline"
							size={25}
							style={{
								marginRight: 2
							}}
							color="gray"
						/>
						<Text
							style={{
								marginTop: 8,
								color: 'gray',
								marginTop: 5,
								alignItems: 'center',
								fontFamily: 'myfont',
								fontSize: 13,
								flex: 0.3,
								justifyContent: 'center',
								alignItems: 'center'
							}}>
							{this.props.time} Min
						</Text>
						<Ionicons
							name="ios-cart-outline"
							size={25}
							style={{
								marginRight: 2
							}}
							color="gray"
						/>
						<Text
							style={{
								marginTop: 8,
								color: 'gray',
								marginTop: 5,
								marginRight: 5,
								fontFamily: 'myfont',
								fontSize: 13,
								flex: 0.3
							}}>
							40 SAR
						</Text>
					</View>
				</View>
				<View
					style={{
						flexDirection: 'row',
						flexWrap: 'wrap',
						justifyContent: 'flex-end',
						flex: 0.3
					}}>
					<FadeIn>
						<Image
							source={{ uri: this.props.image }}
							style={{
								width: 100,
								height: 100,
								marginTop: 10,
								marginBottom: 10,
								marginRight: 10,
								borderRadius: 10
							}}
						/>
					</FadeIn>
				</View>
			</View>
		);
		// <ProgressiveImage
		// 	src="https://unsplash.it/400/400?image=1"
		// 	placeholder="tiny-image.jpg">
		// 	{src => (
		// 		<Image src="https://unsplash.it/400/400?image=1" alt="an image" />
		// 	)}
		// </ProgressiveImage>
	}
}
