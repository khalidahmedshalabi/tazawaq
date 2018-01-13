import React from 'react';
import { Text, View, StyleSheet, TextInput, FlatList } from 'react-native';
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import Restaurant from '../components/Restaurant';

var styles = StyleSheet.create({
	box: {
		height: 60,
		backgroundColor: '#FFF',
		shadowColor: '#000000',
		shadowOpacity: 2,
		shadowOffset: {
			height: 2,
			width: 0
		},
		borderColor: 'gray',
		borderWidth: 0.3
	},

	input: {
		justifyContent: 'center',
		height: 40,
		fontFamily: 'myfont',
		marginTop: 10,
		backgroundColor: '#fff',
		fontSize: 13,
		alignItems: 'center',
		marginRight: 7,
		marginLeft: 7
	},

	topbox: {
		alignItems: 'center',
		height: 60,
		justifyContent: 'center',
		backgroundColor: '#fff'
	},
	restaurant: {
		backgroundColor: 'red',
		flex: 1,
		padding: 100
	}
});

export default class HomeScreen extends React.Component {
	componentDidMount() {
		this.setState({ fontLoaded: '1' });
	}
	static navigationOptions = {
		header: null
	};
	constructor(props) {
		super(props);
		this.state = {
			text: 'الرياض السعوديه',
			fontLoaded: '0',
			Restaurants: [
				{
					key: 1,
					name: 'مطعم كنتاكي للدجاج',
					image:
						'https://d30v2pzvrfyzpo.cloudfront.net/images/chains/kfc-opengraph-1.jpg',
					time: '30',
					desc: 'وجبات سريعه و لذيذه ف الحال',
					stars: '4.3'
				},
				{
					key: 2,
					name: 'مطعم كنتاكي للدجاج',
					image:
						'https://d30v2pzvrfyzpo.cloudfront.net/images/chains/kfc-opengraph-1.jpg',
					time: '30',
					desc: 'وجبات سريعه و لذيذه ف الحال',
					stars: '4.3'
				},
				{
					key: 3,
					name: 'مطعم كنتاكي للدجاج',
					image:
						'https://d30v2pzvrfyzpo.cloudfront.net/images/chains/kfc-opengraph-1.jpg',
					time: '30',
					desc: 'وجبات سريعه و لذيذه ف الحال',
					stars: '4.3'
				},
				{
					key: 4,
					name: 'مطعم كنتاكي للدجاج',
					image:
						'https://d30v2pzvrfyzpo.cloudfront.net/images/chains/kfc-opengraph-1.jpg',
					time: '30',
					desc: 'وجبات سريعه و لذيذه ف الحال',
					stars: '5'
				},
				{
					key: 5,
					name: 'مطعم كنتاكي للدجاج',
					image:
						'https://d30v2pzvrfyzpo.cloudfront.net/images/chains/kfc-opengraph-1.jpg',
					time: '30',
					desc: 'وجبات سريعه و لذيذه ف الحال',
					stars: '3.2'
				},
				{
					key: 6,
					name: 'مطعم كنتاكي للدجاج',
					image:
						'https://d30v2pzvrfyzpo.cloudfront.net/images/chains/kfc-opengraph-1.jpg',
					time: '30',
					desc: 'وجبات سريعه و لذيذه ف الحال',
					stars: '4.3'
				}
			]
		};
	}

	render() {
		return (
			<View>
				<View style={styles.topbox} key="1">
					{this.state.fontLoaded == '1' ? (
						<Text style={{ fontFamily: 'myfont' }}> {this.state.text}</Text>
					) : null}
				</View>

				<View style={styles.box} key="2">
					<TextInput
						{...this.props}
						style={styles.input}
						placeholderTextColor="gray"
						placeholder="  ابحث عن المطعم الذى تريد ......"
						underlineColorAndroid="transparent"
					/>
				</View>

				<FlatList
					style={{ backgroundColor: 'red' }}
					removeClippedSubviews={false}
					data={this.state.Restaurants}
					renderItem={({ item }) => (
						<Restaurant
							style={styles.restaurant}
							stars={item.stars}
							name={item.name}
							time={item.time}
							desc={item.desc}
							image={item.image}
						/>
					)}
				/>
			</View>
		);
	}
}
