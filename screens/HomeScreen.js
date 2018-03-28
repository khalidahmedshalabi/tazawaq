import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	AsyncStorage,
	Image,
	Button
} from 'react-native';
import RestaurantBox from '../components/RestaurantBox';
import Colors from '../constants/Colors';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { TabNavigator, NavigationActions } from 'react-navigation';

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
	static navigationOptions = ({ navigation }) => ({
    header: <Header navigation={navigation} />,

	});
	componentDidMount() {
		AsyncStorage.getItem('userid').then(id => {
			this._shouldRenderOffer(id);
			if (id == null) {
				var id = -1;
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

	_shouldRenderOffer = id => {
		fetch(`${Server.dest}/api/offers-for-me?user_id=${id}`)
			.then(res => res.json())
			.then(res => {
				if (res.response != 0)
					this.setState({ offerVisible: 1, userid: id, offer: res.response });
				else this.setState({ offerVisible: 0 });
			});
	};

	_RenderOffer = () => {
		if (this.state.offerVisible == 1) {
			return (
				<View
					style={{
						position: 'absolute',
						zIndex: 1,
						backgroundColor: 'white',
						borderRadius: 12,
						overflow: 'hidden',
						width: '90%',
						left: '5%',
						top: '10%',
						height: '80%',
						elevation: 1
					}}
				>
					<Ionicons
						onPress={() => this.setState({ offerVisible: 0 })}
						name="ios-close"
						size={50}
						color="white"
						style={{
							position: 'absolute',
							zIndex: 2,
							right: 20,
							marginVertical: 8
						}}
					/>

					<TouchableOpacity
						style={{ flex: 1 }}
						onPress={() =>
							this.props.navigation.navigate('SingleOffer', {
								offer_id: this.state.offer.id
							})
						}
					>
						<Image style={{ flex: 1 }} source={{ uri: this.state.offer.img }} />
					</TouchableOpacity>

					<Button
						onPress={() =>
							this.props.navigation.navigate('SingleOffer', {
								offer_id: this.state.offer.id
							})
						}
						color={Colors.mainColor}
						backgroundColor={Colors.mainColor}
						containerViewStyle={{ borderRadius: 15 }}
						borderRadius={15}
						buttonStyle={{ padding: 10 }}
						textStyle={{ fontFamily: 'myfont' }}
						title="مشاهدة العرض"
					/>
				</View>
			);
		} else {
			return;
		}
	};

	constructor(props) {

		super(props);
		this.state = {
			doneFetches: 0,
			Restaurants: [],
			userid: null,
			offer: {}
		};
		AsyncStorage.getItem('hot_request').then((value)=>{
			if(value == '1'){
				AsyncStorage.setItem('hot_request','0').then(()=>{
					this.props.navigation.navigate('طلبات')
				})
			}
		})

	}
	navigate_home = (key,status)=>{
		if(status == 1){
			this.props.navigation.navigate('Restaurant', { key: key })
		}
		else {
			alert('هذا المحل مغلق الان لا يمكن الطلب')
		}
	}

	render() {
		const { navigate } = this.props.navigation;
		if (this.state.doneFetches == 0)
			return <LoadingIndicator size="large" color="#B6E3C6" />;

		return (
			<View>
				{this._RenderOffer()}
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

							onPress={() => this.navigate_home(item.key,item.status)}
						>
							<RestaurantBox
								style={styles.restaurant}
								stars={item.stars}
								name={item.name}
								time={item.time}
								desc={item.desc}
								image={item.image}
								price={item.deliver_price}
								min_delivery_cost={item.min_delivery_cost}

								status={item.status}
							/>
						</TouchableOpacity>
					)}
				/>
			</View>
		);
	}
}
