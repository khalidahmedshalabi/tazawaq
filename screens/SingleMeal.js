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
import RadioGroup from 'react-native-radio-group'
import RadioButton from 'radio-button-react-native';

export default class SingleMeal extends React.Component {
	addcart = () => {
		if(this.state.currentId == 0){
			var meal = this.state.Meal[0];
		}
		else {
			var meal = this.state.childs.find(obj => {
  		return obj.key == this.state.currentId
		})

		}
		var num = this.state.num || 1;
		AsyncStorage.getItem('userid').then((userid)=>{
      if(userid != 'null' && userid != null ){
				if(this.state.Restaurant[0].status ==  1){
	AsyncStorage.getItem('CartResturantId').then((CartResturantId)=>{
		if(CartResturantId || CartResturantId == ''){ // if resturant id saved
			if(CartResturantId == this.props.navigation.state.params.restaurant_id){ //if resturant in cart is the same one here
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
				AsyncStorage.setItem('CartResturantId',''+this.props.navigation.state.params.restaurant_id)
			} //end if resturant in cart is the same one here
			else {
				alert('لديك طلبات ب السله لمحل تجاري اخر الرجاء تنفيذ الطلب او الغاءه اولا')
			}
		} // end if resturant id saved
		else{
			AsyncStorage.setItem('CartResturantId',''+this.props.navigation.state.params.restaurant_id)
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
		}

	})
	}
	else {
		alert('عملينا الكريم : لا يمكنك الطلب حاليا لأن المحل التجاري مغلق')
		console.log(this.state.Restaurant);

	}
}

else {
	alert('الزائر الكريم : يجب عليك التسجيل قبل إضافة أي طلب بالسلة و ذلك لإتمام عملية الشراء')
}
});


	};

	static navigationOptions = ({ navigation }) => ({
		title: 'المنتج',
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
			modalVisible:false,
			childs:[],
			check:[],
			currentId:0,
			price:0
		};
	}
	cart = ()=>{
		this.props.navigation.navigate('السله');
		this.setState({ modalVisible: false });
	}
	handleOnPress(value){

			var meal = this.state.childs.find(obj => {
  		return obj.key == value
			})


    this.setState({currentId:value,price:meal.price})

	}

	componentDidMount() {
		fetch(
			Server.dest +
				'/api/store-info?store_id=' +
				this.props.navigation.state.params.restaurant_id
		)
			.then(res => res.json())
			.then(restaurants => {
				this.setState({
					Restaurant: [restaurants.response],
					// check:meals.check
				});
			});
			fetch(
				Server.dest +
					'/api/product-info?product_id=' +
					this.props.navigation.state.params.meal_id
			)
				.then(res => res.json())
				.then(meals => {
					this.setState({
						doneFetches: 1,
						Meal: [meals.response],
						childs: meals.childs,
						// check:meals.check
					});
				});
	}
	handlePrice = ()=>{
		if(this.state.price != 0){
			return Math.round((this.state.num * this.state.price)*100) / 100

		}else {
			return Math.round((this.state.num * this.state.Meal[0].price)*100) / 100
		}
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
			<ScrollView>

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
						<View>
						{
							this.state.childs.map((child)=>{
								return (
									<RadioButton
								outerCircleColor={Colors.mainColor}
								style={{justifyContent:'center',padding:20}}
outerCircleSize={35}
outerCircleWidth={2}
innerCircleColor={Colors.mainColor}
innerCircleSize={20}
currentValue={this.state.currentId} value={child.key} onPress={this.handleOnPress.bind(this)}>
<Text style={{color:Colors.mainColor,textAlign:'left',flex:.8,paddingHorizontal:15,fontFamily:'myfont',fontSize:17,marginBottom:20}}>{child.price} رس</Text>

                <Text style={{color:Colors.mainColor,textAlign:'right',flex:.2,paddingHorizontal:15,fontFamily:'myfont',fontSize:17,marginBottom:20}}>{child.name}</Text>
                 </RadioButton>)
							})
						}




</View>

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
								title={ "اضف الى السله " +this.handlePrice() + " ريال سعودي" }
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
				</ScrollView>
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
