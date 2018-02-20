import React from 'react';
import {
	Dimensions,
	KeyboardAvoidingView,
	AsyncStorage,
	StyleSheet,
	TextInput,
	View,
	Text,
	Image,
	Platform,
	DeviceEventEmitter
} from 'react-native';
import { Button } from 'react-native-elements';
import { Table, Row, Rows } from 'react-native-table-component';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import Colors from '../../constants/Colors';
import LoadingIndicator from '../../components/LoadingIndicator';
import Server from '../../constants/server';
import { Notifications } from 'expo';
import registerForPushNotificationsAsync from '../../api/registerForPushNotificationsAsync';

export default class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			owner_login: '0',
			storeOrdersFetched: false,
			passname: '',
			password: '',
			errorMsg: '',
			orders: []
		};
	}

	static navigationOptions = ({ navigation }) => {
		return {
			header: null,
			tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
				// Inject event
				DeviceEventEmitter.emit('ReloadStoreOrders', { empty: 0 });

				// Keep original behaviour
				jumpToIndex(scene.index);
			}
		};
	};

	listeners = {
		update: DeviceEventEmitter.addListener('ReloadStoreOrders', ({ empty }) => {
			AsyncStorage.getItem('owner_login').then(logged => {
				if (logged === null) return;

				this.setState({ owner_login: logged });

				if (logged == '1') {
					AsyncStorage.getItem('storeid').then(val => {
						if (val === null) return;

						this.setState({ storeOrdersFetched: false });
						this.fetchStoreOrders(parseInt(val));
					});
				}
			});
		})
	};
	componentWillUnmount() {
		registerForPushNotificationsAsync();
		// Handle notifications that are received or selected while the app
		// is open. If the app was closed and then opened by tapping the
		// notification (rather than just tapping the app icon to open it),
		// this function will fire on the next tick after the app starts
		// with the notification data.
		this._notificationSubscription = Notifications.addListener(
			this._handleNotification
		);

		// cleaning up listeners
		// I am using lodash
		_.each(this.listeners, listener => {
			listener.remove();
		});
	}

	_handleNotification = notification => {
		this.setState({ notification: notification });
	};

	setOwnerLoginStatus = value => {
		AsyncStorage.setItem('owner_login', value);
		this.setState({ owner_login: value });
	};

	fetchStoreOrders = storeid => {
		fetch(`${Server.dest}/api/get-store-orders?store_id=${storeid}`, {
			headers: { 'Cache-Control': 'no-cache' }
		})
			.then(res => res.json())
			.then(resJson => {
				console.log(resJson.response);
				if (resJson.response == 1) {
					this.setState({ orders: resJson.orders, storeOrdersFetched: true });
				}
			});
	};

	loginOwner = () => {
		if (this.state.password.length == 0) {
			this.setState({ errorMsg: 'ادخل كلمة المرور' });
			return;
		}

		if (this.state.passname.length == 0) {
			this.setState({ errorMsg: 'ادخل اسم الدخول للمطعم' });
			return;
		}

		if (/\s/g.test(this.state.passname)) {
			this.setState({ errorMsg: 'غير مسوح بالمسافات فى اسم الدخول' });
			return;
		}

		this.setState({ errorMsg: '' });

		fetch(
			Server.dest +
				'/api/store-owner-login?passname=' +
				this.state.passname +
				'&password=' +
				this.state.password,
			{ headers: { 'Cache-Control': 'no-cache' } }
		)
			.then(res => res.json())
			.then(resJson => {
				// console.log(resJson.response);
				console.log('OKIII LOKIIII ..');
				if (resJson.response == 0)
					this.setState({
						errorMsg: 'هذا المحل التجاري غير مُسجل عندنا او كلمة مرور غير صحيحة'
					});
				else {
					AsyncStorage.setItem('storeid', resJson.response);
					this.setOwnerLoginStatus('1');
					this.fetchStoreOrders(parseInt(resJson.response));
					// Here
				}
			});
	};

	shouldRenderErrorMessage = () => {
		if (this.state.errorMsg != '') {
			return (
				<View
					style={{
						paddingVertical: 3,
						flexDirection: 'row',
						justifyContent: 'center'
					}}
				>
					<Text style={{ fontFamily: 'myfont', color: '#E85151' }}>
						{this.state.errorMsg}
					</Text>
				</View>
			);
		}
	};

	render() {
		if (this.state.owner_login == '0') {
			return (
				<View
					style={{
						backgroundColor: '#FFFFFF',
						flex: 1,
						flexDirection: 'column',
						justifyContent: 'flex-end',
						alignItems: 'center',
						height: Dimensions.get('window').height,
						width: Dimensions.get('window').width
					}}
				>
					<Image
						style={{
							flex: 1,
							height: '35%',
							width: Dimensions.get('window').width
						}}
						resizeMode="cover"
						source={require('../../assets/images/splash.jpg')}
					/>

					<KeyboardAvoidingView
						behavior="padding"
						keyboardVerticalOffset={140}
						style={{ flex: 1 }}
						contentContainerStyle={{
							flex: 1,
							flexDirection: 'column',
							justifyContent: 'flex-end',
							alignItems: 'center',
							width: Dimensions.get('window').width
						}}
					>
						<View style={styles.inputsContainer}>
							{this.shouldRenderErrorMessage()}

							<View style={styles.singleInputContainer}>
								<TextInput
									underlineColorAndroid="transparent"
									placeholder="اسم الدخول للمحل التجاري"
									placeholderTextColor="#CCCCCC"
									autoGrow={false}
									multiline={false}
									autoFocus={false}
									style={styles.textInput}
									defaultValue={this.state.passname}
									onChangeText={text => this.setState({ passname: text })}
									onSubmitEditing={event => this.loginOwner()}
								/>

								<Ionicons
									name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
									size={26}
									color={Colors.fadedMainColor}
									style={styles.inputIcon}
								/>
							</View>

							<View style={styles.singleInputContainer}>
								<TextInput
									underlineColorAndroid="transparent"
									placeholder="كلمة المرور"
									placeholderTextColor="#CCCCCC"
									autoGrow={false}
									multiline={false}
									autoFocus={false}
									secureTextEntry={true}
									style={styles.textInput}
									onChangeText={text => this.setState({ password: text })}
									onSubmitEditing={event => this.loginOwner()}
								/>

								<Ionicons
									name={Platform.OS === 'ios' ? 'ios-lock' : 'md-lock'}
									size={26}
									color={Colors.fadedMainColor}
									style={styles.inputIcon}
								/>
							</View>
						</View>
					</KeyboardAvoidingView>

					<View style={styles.signupButtonContainer}>
						<View style={{ flex: 1, marginBottom: 13, width: '100%' }}>
							<Button
								onPress={() => {
									this.loginOwner();
								}}
								color="white"
								backgroundColor={Colors.mainColor}
								borderRadius={15}
								buttonStyle={{ padding: 10 }}
								containerViewStyle={{
									marginLeft: 0,
									width: '100%',
									borderRadius: 15
								}}
								textStyle={{ fontFamily: 'myfont' }}
								title="تسجيل دخول المحل"
							/>
						</View>
					</View>
				</View>
			);
		} else if (!this.state.storeOrdersFetched) {
			return <LoadingIndicator size="large" />;
		} else {
			return (
				<View style={{ height: '100%' }}>
					<Table
						style={styles.table}
						borderStyle={{ borderWidth: 0.5, borderColor: Colors.mainColor }}
					>
						<Row
							data={['بيانات الزبون', 'الموقع', 'السعر', 'التفاصيل', 'الحالة']}
							style={styles.head}
							textStyle={styles.headText}
							flexArr={[1, 1, 1, 2, 1]}
						/>
						<Rows
							data={this.state.orders}
							style={styles.row}
							textStyle={styles.text}
							flexArr={[1, 1, 1, 2, 1]}
						/>
					</Table>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	table: { flex: 1, marginTop: 20 },
	head: { height: 70, backgroundColor: Colors.mainColor },
	headText: { fontFamily: 'myfont', textAlign: 'center', color: 'white' },
	text: {
		paddingVertical: 10,
		textAlign: 'center',
		color: Colors.secondaryColor
	},
	row: { height: 100, backgroundColor: 'white' },
	textInput: {
		flex: 1,
		color: Colors.mainColor,
		textAlign: 'right',
		fontFamily: 'myfont',
		padding: 9,
		borderRadius: 4,
		backgroundColor: 'transparent',
		borderBottomColor: Colors.fadedMainColor,
		borderBottomWidth: 0.7
	},
	inputIcon: {
		backgroundColor: 'transparent',
		marginLeft: 9
	},
	inputsContainer: {
		flex: 0.8,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '90%'
	},
	singleInputContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	signupButtonContainer: {
		flex: 0.3,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '92%'
	}
});
