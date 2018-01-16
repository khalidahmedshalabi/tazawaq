import React, { Component } from 'react';
import { ActivityIndicator, View, Text, Image } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

const AVERAGE_STARS_COUNT = 2; // between 5 and 0, recommended: 2 or 2.5

export default class Restaurant extends Component {

	determineStarIcon = (stars_count) => {
		if(stars_count < AVERAGE_STARS_COUNT)
			return ("md-star-outline");
		else if(stars_count < 5)
			return ("md-star-half");
		else
			return ("md-star");
	}

	render() {
		return (
			<View style={{ flex:1, flexDirection: 'row', justifyContent:'flex-end', alignItems: 'center' }}>
				<View style={{ flex: 1, paddingTop: 9, paddingRight:10, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end'}}>
					<View style={{ flex: 1 }}>
						<Text style={{ fontFamily: 'myfont', fontSize: 15, }}>{this.props.name}</Text>
						<Text style={{ fontFamily: 'myfont', color: '#777777', fontSize: 12,}}>{this.props.desc}</Text>
					</View>

					<View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', alignItems: 'center' }}>
						<View style={{ flex: 1, flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
							<Ionicons name={this.determineStarIcon(this.props.stars)} size={22} color="#FFC400" />
							<Text style={{ marginLeft: 4, fontFamily: 'myfont', fontSize: 12, color: '#999999'}}>{this.props.stars}/5</Text>
						</View>

						<View style={{ flex: 1, flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
							<Ionicons name="ios-bicycle-outline" size={21} color="#999999" />
							<Text style={{ marginLeft: 5, fontFamily: 'myfont', fontSize: 12, color: '#999999'}}>{this.props.time} د</Text>
						</View>

						<View style={{ flex: 1, flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
							<Ionicons name="md-cash" size={21} color="#999999" />
							<Text style={{ marginLeft: 5, fontFamily: 'myfont', fontSize: 12, color: '#999999'}}>{this.props.price} ر.س</Text>
						</View>
					</View>
				</View>

				<View style={{ flex: 0.5 }}>
					<Image
						source={{ uri: this.props.image }}
						style={{ width: 100, height: 100, marginTop: 10, marginBottom: 11,
							marginRight: 4, borderRadius: 10 }}
					/>
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
