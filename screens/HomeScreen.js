import React from 'react';
import { Text, View, StyleSheet, TextInput, FlatList } from 'react-native';
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import Restaurant from '../components/Restaurant';

var styles = StyleSheet.create({
	box: {
		height: 45,
		backgroundColor: '#FFF',
		shadowColor: '#000000',
		shadowOpacity: 2,
		shadowOffset: {
			height: 2,
			width: 0
		},
		borderColor: 'gray',
		borderWidth: 0.3,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center'
	},

	input: {
		justifyContent: 'center',
		height: 22,
		fontFamily: 'myfont',
		marginTop: 5,
		backgroundColor: '#fff',
		fontSize: 13,
		alignItems: 'center',
		marginRight: 7,
		marginLeft: 7,
		flex: 1
	},

	topbox: {
		alignItems: 'center',
		height: 55,
		justifyContent: 'center',
		backgroundColor: '#fff'
	},
	restaurant: {
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
					desc: 'تمتع بوجبه خفيفه',
					stars: '4.3',
					deliver_price: '40'
				},
				{
					key: 2,
					name: 'مطعم كنتاكي للدجاج',
					image:
						'https://d30v2pzvrfyzpo.cloudfront.net/images/chains/kfc-opengraph-1.jpg',
					time: '30',
					desc: 'وجبات سريعه و لذيذه ف الحال',
					stars: '4.3',
					deliver_price: '40'
				},
				{
					key: 3,
					name: 'مطعم كنتاكي للدجاج',
					image:
						'https://d30v2pzvrfyzpo.cloudfront.net/images/chains/kfc-opengraph-1.jpg',
					time: '30',
					desc: 'وجبات سريعه و لذيذه ف الحال',
					stars: '4.3',
					deliver_price: '40'
				},
				{
					key: 4,
					name: 'مطعم كنتاكي للدجاج',
					image:
						'https://d30v2pzvrfyzpo.cloudfront.net/images/chains/kfc-opengraph-1.jpg',
					time: '30',
					desc: 'وجبات سريعه و لذيذه ف الحال',
					stars: '5',
					deliver_price: '40'
				},
				{
					key: 5,
					name: 'مطعم كنتاكي للدجاج',
					image:
						'https://d30v2pzvrfyzpo.cloudfront.net/images/chains/kfc-opengraph-1.jpg',
					time: '30',
					desc: 'طعام لزيز في اى وقت و ايا كان المكان',
					stars: '3.2',
					deliver_price: '40'
				},
				{
					key: 6,
					name: 'مطعم كنتاكي للدجاج',
					image:
						'https://d30v2pzvrfyzpo.cloudfront.net/images/chains/kfc-opengraph-1.jpg',
					time: '30',
					desc: 'وجبات سريعه و لذيذه ف الحال',
					stars: '4.3',
					deliver_price: '40'
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
					<Ionicons
						name="ios-search-outline"
						size={32}
						style={{ padding: 10 }}
						color="gray"
					/>
					<TextInput
						{...this.props}
						style={styles.input}
						placeholderTextColor="gray"
						placeholder="  ابحث عن المطعم الذى تريد ......"
						underlineColorAndroid="transparent"
					/>
				</View>

				<FlatList
					automaticallyAdjustContentInsets={false}
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
