import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	AsyncStorage
} from 'react-native';
import RestaurantBox from '../components/RestaurantBox';
import Colors from '../constants/Colors';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';

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
	componentDidMount() {
		AsyncStorage.getItem('userid').then(id => {
			if (id == null) {
				var id = 1;
			}
			AsyncStorage.getItem('maxcost').then(maxcost => {
				if (maxcost == null) {
					maxcost = 0;
				}
				AsyncStorage.getItem('maxtime').then(maxtime => {
					if (maxtime == null) {
						maxtime = 0;
					}
					AsyncStorage.getItem('sortby').then(sortby => {
						if (sortby == null) {
							sortby = 3;
						}

						fetch(
							Server.dest +
								'/api/stores?user_id=' +
								id +
								'&maxcost=' +
								maxcost +
								'&maxtime=' +
								maxtime +
								'&sortby=' +
								sortby
						)
							.then(res => res.json())
							.then(restaurants => {
								console.log(AsyncStorage.getItem('userid'));
								this.setState({
									doneFetches: 1,
									Restaurants: restaurants.stores
								});
							});
					});
				});
			});
		});
	}

	constructor(props) {
		// AsyncStorage.setItem('userid','1');
		super(props);
		this.state = {
			doneFetches: 0,
			Restaurants: []
		};
	}

	render() {
		const { navigate } = this.props.navigation;
		if (this.state.doneFetches == 0)
			return <LoadingIndicator size="large" color="#B6E3C6" />;

		return (
			<View>
				<FlatList
					automaticallyAdjustContentInsets={false}
					style={{ backgroundColor: 'white' }}
					removeClippedSubviews={false}
					ItemSeparatorComponent={() => (
						<View style={{ height: 5, backgroundColor: Colors.smoothGray }} />
					)}
					data={this.state.Restaurants}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => navigate('Restaurant', { key: item.key })}
						>
							<RestaurantBox
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
