import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import Restaurant from '../components/Restaurant';

var styles = StyleSheet.create({
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
				<FlatList
					style={{ backgroundColor: 'white' }}
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
