import React from 'react';
import {
	ScrollView,
	DeviceEventEmitter,
	Modal,
	Button,
	StyleSheet,
	Text,
	FlatList,
	TouchableOpacity,
	View,
	Dimensions,
	Image,
	AsyncStorage,
	I18nManager
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Colors from '../constants/Colors';
import TicketBox from '../components/TicketBox';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
	Table,
	TableWrapper,
	Row,
	Rows,
	Col,
	Cols,
	Cell
} from 'react-native-table-component';

const Center = ({ children }) => (
	<View
		style={{
			alignItems: 'center',
			justifyContent: 'center',
			flex: 1,
			backgroundColor: '#ffffff'
		}}
	>
		{children}
	</View>
);
I18nManager.allowRTL(true);

export default class Meals extends React.Component {
	static navigationOptions = ({ navigation }) => {

		return {
			header: null,
			tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
				// Inject event
				DeviceEventEmitter.emit('ReloadMyLibraryBooks', { empty: 0 });

				// Keep original behaviour
				jumpToIndex(scene.index);

			}
		};
	};

	listeners = {
		update: DeviceEventEmitter.addListener(
			'ReloadMyLibraryBooks',
			({ empty }) => {
				this.setState({ doneFetches: 0 });
				this.doTheFetching();
			}
		)
	};
	componentWillUnmount() {
		// cleaning up listeners
		// I am using lodash
		_.each(this.listeners, listener => {
			listener.remove();
		});
	}
	make_order = () => {
		AsyncStorage.getItem('login').then(logged => {
			if (logged == 1) {
				AsyncStorage.getItem('userid').then(userid => {
					AsyncStorage.getItem('location').then(location => {
						AsyncStorage.getItem('hint').then(hint => {
							fetch(
								Server.dest +
									'/api/make-order?ids=' +
									this.state.ids +
									'&store_id=' +
									this.state.store_id +
									'&user_id=' +
									userid +
									'&cost=' +
									this.state.after_cost +
									'&address=' +
									location +
									'&address_hint=' +
									hint +
									'&info=a'
							)
								.then(res => res.json())
								.then(meals => {
									AsyncStorage.setItem('cart', '').then(() => {
										AsyncStorage.setItem('hot_request','1').then(()=>{
											this.props.navigation.navigate('Main');
											this.closeModal();
										})
									});
								});
						});
					});
				});
			} else {
				alert('يجب عليك تسجيل الدخول اولا');
			}
		});
	};

	componentDidMount() {
		this.doTheFetching();
	}
	doTheFetching = () => {
		AsyncStorage.getItem('cart')
			.then(ids => {
				this.setState({
					ids: ids
				});
			})
			.then(() => {
				fetch(Server.dest + '/api/meals-by-ids?ids=' + this.state.ids)
					.then(res => res.json())
					.then(meals => {
						this.setState({
							meals: meals.meals
						});
					});
			})
			.then(() => {
				fetch(Server.dest + '/api/order-price?ids=' + this.state.ids)
					.then(res => res.json())
					.then(data => {
						this.setState({
							doneFetches: 1,
							before_cost: data.before,
							after_cost: data.after,
							store_id: data.store_id,
              deliveryTime:data.deliveryTime
						});
					});
			});
	};
clear_cart = ()=>{
	AsyncStorage.setItem('cart','').then(()=>{
		AsyncStorage.setItem('CartResturantId','').then(()=>{
			alert('تم الغاء الطلب يمكنك التسوق بحريه')
			this.props.navigation.navigate('Main');
		})
	})
}
	openModal() {
		this.setState({ modalVisible: true });
	}
	navigate_location(){
		this.closeModal();
		AsyncStorage.removeItem('location').then(()=>{
			AsyncStorage.setItem('LocationToCart','1').then(()=>{
				this.props.navigation.navigate('LocationSetting');
			});
		});
	}
	closeModal() {
		this.setState({ modalVisible: false });
	}

	constructor(props) {
		super(props);

		this.state = {
			doneFetches: 0,
			meals: [],
			before_cost: 0,
			after_cost: 0,
			store_id: 0,
			modalVisible: false
		};
	}

	render() {
		const tableHead = ['السعر', 'التصنيف'];
		const tableData = [
			['' + this.state.before_cost, 'سعر التوصيل'],
			['' + this.state.after_cost, 'اجمالى السعر مع الضريبه']
		];
		const { params } = this.props.navigation.state;
		const { navigate } = this.props.navigation;
		if (this.state.doneFetches == 0)
			return <LoadingIndicator size="large" color="#B6E3C6" />;

		if (this.state.ids != null) {
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
								تأكيد عملية الشراء
								</Text>
								<View style={styles.buttons}>

									<TouchableOpacity style={styles.button}
									            onPress={() => this.closeModal()}>
										<Text style={{fontSize: 18,
										color: 'white'}} >رجوع</Text>
									</TouchableOpacity>
									<TouchableOpacity style={styles.button}
															onPress={() => this.navigate_location()}>
										<Text style={{fontSize: 18,
										color: 'white'}} >تغير عنوان التوصيل</Text>
									</TouchableOpacity>
									<TouchableOpacity style={styles.button} onPress={() => this.make_order()}>
										<Text style={{fontSize: 18,
										color: 'white'}}>شراء الان</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</Modal>

					<View
						style={{
							backgroundColor: '#FFFFFF'
						}}
					>
						<Image
							style={{
								flex: 1,
								height: '100%',
								width: Dimensions.get('window').width,
								marginTop:15
							}}
							resizeMode="cover"
							source={require('../assets/images/splash.jpg')}
						/>
					</View>

					<FlatList
						automaticallyAdjustContentInsets={false}
						style={{ backgroundColor: 'white' }}
						removeClippedSubviews={false}
						ItemSeparatorComponent={() => (
							<View style={{ height: 5, backgroundColor: Colors.smoothGray }} />
						)}
						data={this.state.meals}
						ListHeaderComponent={() => (
							<Image
								resizeMode="cover"
								style={{ padding: 10, height: 150, width: '100%' }}
								source={require('../assets/images/splash.jpg')}
							/>
						)}
						ListFooterComponent={() => (
							<View style={{ paddingRight: 10, paddingLeft: 10 }}>
								<Table
									borderStyle={{
										borderWidth: 0.5,
										borderColor: Colors.fadedMainColor
									}}
								>
									<Row
										data={tableHead}
										style={styles.head}
										textStyle={styles.text}
									/>
									<Rows
										data={tableData}
										style={styles.row}
										textStyle={styles.text2}
									/>
								</Table>
								<View style={{flexDirection:'row'}}>
								<TouchableOpacity
									onPress={() => {
										this.openModal();
									}}
									style={{
										flex: 1,
										justifyContent: 'center',
										alignSelf: 'center',
										padding: 10,
										marginTop: 10,
										flexDirection: 'row',
										borderWidth: 5,
										borderColor: '#e9e9ef'
									}}
								>
									<Text
										style={{
											fontFamily: 'myfont'
										}}
									>
										تنفيذ الطلب
									</Text>
									<MaterialCommunityIcons
										name="plus-circle"
										size={30}
										color={Colors.secondaryColor}
										style={{ paddingLeft: 5 }}
									/>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => {
										this.clear_cart();
									}}
									style={{
										flex: 1,
										justifyContent: 'center',
										alignSelf: 'center',
										padding: 10,
										marginTop: 10,
										flexDirection: 'row',
										borderWidth: 5,
										borderColor: '#e9e9ef'
									}}
								>
									<Text
										style={{
											fontFamily: 'myfont'
										}}
									>
										الغاء الطلب
									</Text>
									<MaterialCommunityIcons
										name="minus-circle"
										size={30}
										color={Colors.secondaryColor}
										style={{ paddingLeft: 5 }}
									/>
								</TouchableOpacity>
								</View>
							</View>

						)}
						renderItem={({ item }) => (

								<TicketBox
									name={item.name}
									status="-1"
									desc={item.desc}
									price={item.price}
									count={item.count}
								/>
						)}
					/>
				</View>
			);
		}

		return (
			<Center>
				<Text
					style={{
						fontFamily: 'myfont',
						fontSize: 16
					}}
				>
					ليس لديك شئ ب السله الان
				</Text>
			</Center>
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

		marginLeft: 5,
		borderRadius:15,

	},
	buttons: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
