import React from 'react';
import {
	View,
	TextInput,
	StyleSheet,
	AsyncStorage,
	Platform,
	Text,
	TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { NavigationActions } from 'react-navigation';
import Server from '../constants/server';

export default class SettingsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			login: 1,
			hint: '',
			location: '',
			username: ''
		};

		AsyncStorage.getItem('login').then(value => {
			this.setState({ login: value });
		});
	}

	componentDidMount() {
		AsyncStorage.multiGet(['location', 'hint', 'userid'], (err, stores) => {
			stores.map((result, i, store) => {
				// store[i][0]
				if (i == 0) this.setState({ location: store[i][1] });
				else if (i == 1) this.setState({ hint: store[i][1] });
				else if (i == 2) {
					if (store[i][1] != 'null') {
						fetch(`${Server.dest}/api/user-by-id?user_id=${store[i][1]}`)
							.then(res => res.json())
							.then(res =>
								this.setState({ username: res.response[0].username })
							);
					}
				}
			});
		});
	}

	renderAccountControlButtons = () => {
		if (this.state.login == '1') {
			return (
				<View style={{ flex: 1.8, width: '100%' }}>
					<TouchableOpacity
						style={styles.singleInputContainer}
						onPress={() => {
							AsyncStorage.setItem('SkippedLogin', '0');
							AsyncStorage.setItem('userid', 'null');
							AsyncStorage.setItem('login', '0');
							AsyncStorage.removeItem('hint');
							this.props.navigation.navigate('Signin', {});
						}}
					>
						<Ionicons
							name={
								Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-dropleft'
							}
							size={26}
							color={Colors.secondaryColor}
							style={styles.inputIcon}
						/>
						<Text style={styles.inputOpenOutside}>تسجيل خروج</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.singleInputContainer}
						onPress={() => {
							this.props.navigation.navigate('MyTicketsScreen', {});
						}}
					>
						<Ionicons
							name={
								Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-dropleft'
							}
							size={26}
							color={Colors.secondaryColor}
							style={styles.inputIcon}
						/>
						<Text style={styles.inputOpenOutside}>تذاكري</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.singleInputContainer}
						onPress={() => {
							this.props.navigation.navigate('AboutUs', {});
						}}
					>
						<Ionicons
							name={
								Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-dropleft'
							}
							size={26}
							color={Colors.secondaryColor}
							style={styles.inputIcon}
						/>
						<Text style={styles.inputOpenOutside}>عن التطبيق</Text>
					</TouchableOpacity>
				</View>
			);
		} else {
			return (
				<View style={{ flex: 1.8, width: '100%' }}>
				<TouchableOpacity
					style={styles.singleInputContainer}
					onPress={() => {
						AsyncStorage.setItem('SkippedLogin', '0');
						AsyncStorage.setItem('login', '0');
						this.props.navigation.navigate('Signin', {});
					}}
				>
					<Ionicons
						name={
							Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-dropleft'
						}
						size={26}
						color={Colors.secondaryColor}
						style={styles.inputIcon}
					/>

					<Text style={styles.inputOpenOutside}>تسجيل دخول</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.singleInputContainer}
					onPress={() => {
						this.props.navigation.navigate('AboutUs', {});
					}}
				>
					<Ionicons
						name={
							Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-dropleft'
						}
						size={26}
						color={Colors.secondaryColor}
						style={styles.inputIcon}
					/>
					<Text style={styles.inputOpenOutside}>عن التطبيق</Text>
				</TouchableOpacity>
				</View>
			);
		}
	};

	// dont send to server if not logged in

	render() {
		return (
			<View
				style={{
					flex: 1,
					flexDirection: 'column',
					justifyContent: 'flex-start',
					alignItems: 'center',
					backgroundColor: Colors.smoothGray,

				}}
			>
				<View
					style={{
						flex: 0.7,
						width: '92%',
						backgroundColor: 'white',
						borderRadius: 10,
						marginTop: 40
					}}
				>
					<View
						style={{
							flex: 0.2,
							backgroundColor: Colors.fadedMainColor,
							borderTopLeftRadius: 10,
							borderTopRightRadius: 10,
							flexDirection: 'row',
							justifyContent: 'flex-start',
							alignItems: 'center'
						}}
					>
						<Ionicons
							name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
							size={32}
							color="rgba(255, 255, 255, 0.8)"
							style={styles.inputIcon}
						/>
						<View style={{ flex: 1 }}>
							<Text
								style={{ color: 'white', fontSize: 20, textAlign: 'center' }}
							>
								{this.state.username}
							</Text>
						</View>
					</View>
					<View style={{ flex: 1, padding: 12 }}>
						<TextInput
							underlineColorAndroid="transparent"
							placeholder="تلميح, مثال: خلف المسجد"
							placeholderTextColor="#CCCCCC"
							autoGrow={false}
							multiline={false}
							autoFocus={false}
							secureTextEntry={false}
							defaultValue={this.state.hint}
							style={styles.textInput}
							onEndEditing={e => {
								AsyncStorage.setItem('hint', e.nativeEvent.text);
							}}
							onChangeText={text => this.setState({ hint: text })}
						/>

						<View style={styles.inputsContainer}>
							<TouchableOpacity
								style={styles.singleInputContainer}
								onPress={() => {
									AsyncStorage.removeItem('location');

									this.props.navigation.navigate('LocationSetting');
								}}
							>
								<Ionicons
									name={
										Platform.OS === 'ios'
											? 'ios-arrow-back'
											: 'md-arrow-dropleft'
									}
									size={26}
									color={Colors.secondaryColor}
									style={styles.inputIcon}
								/>

								<Text style={styles.inputOpenOutside}>
									{this.state.location}
								</Text>
							</TouchableOpacity>

							{this.renderAccountControlButtons()}
						</View>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	textInput: {
		flex: 0.5,
		color: Colors.secondaryColor,
		textAlign: 'right',
		fontFamily: 'myfont',
		padding: 10,
		borderRadius: 4,
		backgroundColor: 'transparent',
		borderBottomColor: Colors.fadedMainColor,
		borderBottomWidth: 1
	},
	inputIcon: {
		backgroundColor: 'transparent',
		marginLeft: 9
	},
	inputOpenOutside: {
		flex: 1,
		color: Colors.secondaryColor,
		textAlign: 'right',
		fontFamily: 'myfont',
		padding: 10,
		borderRadius: 4,
		backgroundColor: 'transparent'
	},
	inputsContainer: {
		flex: 2,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginTop: 15
	},
	singleInputContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	}
});
