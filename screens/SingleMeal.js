import React from 'react';
import {
	ScrollView,
	KeyboardAvoidingView,
	TextInput,
	StyleSheet,
	Text,
	FlatList,
	TouchableOpacity,
	View,
	AsyncStorage,
	Modal
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Colors from '../constants/Colors';
import MealBox from '../components/MealBox';
import { Button } from 'react-native-elements';
import RestaurantBox from '../components/RestaurantBox';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';
// import { NavigationActions } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

export default class SingleMeal extends React.Component {
	addcart = () => {
		var meal = this.state.Meal[0];
		var num = this.state.num || 1;

		AsyncStorage.getItem('cart').then(cart => {
			AsyncStorage.setItem('cart', cart + ',' + meal.key).then(() => {
				if (num > 1) {
					this.setState({
						num: num - 1
					});
					this.addcart();
				} else {
					this.setState({ modalVisible: true });
				}
			});
		});
	};

	static navigationOptions = ({ navigation }) => ({
		title: 'الوجبه',
		headerTintColor: Colors.smoothGray,
		fontFamily: 'myfont',
		headerStyle: {
			backgroundColor: Colors.mainColor,
			borderBottomColor: Colors.mainColor,
			borderBottomWidth: 3
		},
		headerTitleStyle: {
			fontWeight: '300',
			color: '#ffffff',
			fontFamily: 'myfont',
			fontSize: 16
		}
	});
	constructor(props) {
		super(props);

		this.state = {
			doneFetches: 0,
			Restaurant: [],
			Meal: [],
			num: 1,
			modalVisible:false
		};
	}
	cart = ()=>{
		this.props.navigation.navigate('السله');
		this.setState({ modalVisible: false });
	}
	componentDidMount() {
		fetch(
			Server.dest +
				'/api/store-info?store_id=' +
				this.props.navigation.state.params.restaurant_id
		)
			.then(res => res.json())
			.then(restaurants => {
				fetch(
					Server.dest +
						'/api/product-info?product_id=' +
						this.props.navigation.state.params.meal_id
				)
					.then(res => res.json())
					.then(meals => {
						this.setState({
							doneFetches: 1,
							Restaurant: [restaurants.response],
							Meal: [meals.response]
						});
						console.log(this.state.Restaurant);
					});
			});
	}
	render() {
		const { params } = this.props.navigation.state;
		if (this.state.doneFetches == 0)
			return <LoadingIndicator size="large" color="#B6E3C6" />;

		return (


			<View>
			<Modal
				visible={this.state.modalVisible}
				animationType={'slide'}
				onRequestClose={() => this.closeModal()}
			>
				<View style={styles.modalContainer}>
					<View style={styles.innerContainer}>
						<Text style={{ fontFamily: 'myfont', fontSize: 25 }}>
							تم إضافة المنتج للسلة
						</Text>
						<View style={styles.buttons}>

							<Button onPress={() => 	this.setState({ modalVisible: false })}
							color='white'
							backgroundColor={Colors.mainColor}
							containerViewStyle={{borderRadius:15}}
							borderRadius={15}
							buttonStyle={{ padding: 15 }}
							textStyle={{ fontFamily: 'myfont' }}
							title="اكمل التسوق"/>
							<Button onPress={() => this.cart() }
							color='white'
							backgroundColor={Colors.mainColor}
							containerViewStyle={{borderRadius:15}}
							borderRadius={15}
							buttonStyle={{ padding: 15 }}
							textStyle={{ fontFamily: 'myfont' }}
							title="الذهاب للسلة"/>

						</View>
					</View>
				</View>
			</Modal>
				<FlatList
					automaticallyAdjustContentInsets={false}
					style={{
						backgroundColor: 'white',
						borderBottomWidth: 0.3,
						borderBottomColor: 'black'
					}}
					removeClippedSubviews={false}
					ItemSeparatorComponent={() => (
						<View style={{ height: 5, backgroundColor: Colors.smoothGray }} />
					)}
					data={this.state.Restaurant}
					renderItem={({ item }) => (
						<RestaurantBox
							stars={item.stars}
							name={item.name}
							time={item.time}
							desc={item.desc}
							image={item.image}
							price={item.deliver_price}
						/>
					)}
				/>
				<FlatList
					automaticallyAdjustContentInsets={false}
					style={{ backgroundColor: 'white' }}
					removeClippedSubviews={false}
					ListFooterComponent={() => (
						<View>
							<View
								style={{
									flex: 1,
									flexDirection: 'row',
									borderColor: Colors.mainColor,
									borderWidth: 1,
									margin: 18,
									borderRadius: 18,
									padding: 10
								}}
							>
								<View
									style={{
										flex: 1.5,
										alignItems: 'center',
										justifyContent: 'center'
									}}
								>
									<Ionicons
										onPress={() => {
											if (this.state.num != 1) {
												this.setState({ num: this.state.num - 1 });
											}
										}}
										name="ios-remove-circle-outline"
										size={40}
										color={Colors.mainColor}
									/>
								</View>
								<View
									style={{
										flex: 3,
										alignItems: 'center',
										justifyContent: 'center'
									}}
								>
									<Text
										style={{
											alignItems: 'center',
											color: Colors.mainColor,
											fontSize: 18
										}}
									>
										{this.state.num}
									</Text>
								</View>

								<View
									style={{
										flex: 1.5,
										alignItems: 'center',
										justifyContent: 'center'
									}}
								>
									<Ionicons
										onPress={() => this.setState({ num: this.state.num + 1 })}
										name="ios-add-circle-outline"
										size={40}
										color={Colors.mainColor}
									/>
								</View>
							</View>

							<Button
								onPress={() => {
									this.addcart();
								}}
								color="white"
								backgroundColor={Colors.mainColor}
								containerViewStyle={{ borderRadius: 15 }}
								borderRadius={15}
								buttonStyle={{ padding: 10 }}
								textStyle={{ fontFamily: 'myfont',fontSize:15 }}
								title={ "اضف الى السله " + this.state.num * this.state.Meal[0].price + " ريال سعودي" }
							/>
						</View>
					)}
					ItemSeparatorComponent={() => (
						<View style={{ height: 5, backgroundColor: Colors.smoothGray }} />
					)}
					data={this.state.Meal}
					renderItem={({ item }) => (
						<MealBox
							name={item.name}
							time={item.time}
							desc={item.desc}
							image={item.image}
							price={item.price}

						/>

					)}
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	head: { height: 40, backgroundColor: Colors.mainColor },
	text: {
		textAlign: 'center',
		fontFamily: 'myfont',
		fontSize: 18,
		color: 'white'
	},
	text2: {
		fontFamily: 'myfont',
		fontSize: 13,
		color: Colors.mainColor,
		textAlign: 'center'
	},
	row: { height: 30 },
	container: {
		flex: 1,
		justifyContent: 'center'
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'grey'
	},
	innerContainer: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	button: {
		backgroundColor: Colors.mainColor,
		fontFamily: 'myfont',
		padding: 20,
		fontSize: 15,
		color: 'white',
		marginLeft: 5
	},
	buttons: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
