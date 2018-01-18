import React from 'react';
import { Text, View, StyleSheet, FlatList,TouchableOpacity } from 'react-native';
import Restaurant from '../components/Restaurant';
import Colors from '../constants/Colors';

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
		backgroundColor: 'white',
		flex: 1,
		padding: 100
	}
});

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Restaurants: [
				{
					key: 1,
					name: 'مطعم كنتاكي للدجاج',
					image:
						'https://d30v2pzvrfyzpo.cloudfront.net/images/chains/kfc-opengraph-1.jpg',
					time: '30',
					desc: 'تمتع بوجبه خفيفه',
					stars: '5',
					deliver_price: '40'
				},
				{
					key: 2,
					name: 'مطعم ماكدونالدز',
					image:
						'https://munchies-images.vice.com/wp_upload/mcdonalds-food-writer.jpg',
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
					stars: '1.5',
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
					stars: '2.5',
					deliver_price: '40'
				}
			]
		};
	}

	render() {
		const { navigate } = this.props.navigation;
		return (

			<View >

				<FlatList
					automaticallyAdjustContentInsets={false}
					style={{ backgroundColor: 'white' }}
					removeClippedSubviews={false}
					ItemSeparatorComponent={ () => <View style={{ height: 5, backgroundColor: Colors.smoothGray }} /> }
					data={this.state.Restaurants}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() =>
					navigate('Restaurant', { key:item.key })} >
						<Restaurant
							style={styles.restaurant}
							stars={item.stars}
							name={item.name}
							time={item.time}
							desc={item.desc}
							image={item.image}
							price={item.deliver_price}
						/>
						</TouchableOpacity>
					)}
				/>
			</View>
		);
	}
}
