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
	TouchableOpacity,
	Linking,
	Picker
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Button } from 'react-native-elements';
import Colors from '../constants/Colors';
import TicketBox from '../components/TicketBox';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';
import { Ionicons } from '@expo/vector-icons';
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
export default class FilterScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'التصنيف',
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
	componentWillMount() {
		AsyncStorage.getItem('userid').then(id => {
			fetch(Server.dest + '/api/get-my-tickets?user_id=' + id)
				.then(res => res.json())
				.then(tickets => {
					console.log(AsyncStorage.getItem('userid'));
					this.setState({
						doneFetches: 1,
						Tickets: tickets.tickets
					});
				});
		});
	}
	constructor(props) {
		super(props);
		AsyncStorage.setItem('userid', '1');
		this.state = {
			doneFetches: 0,
			Tickets: []
		};
	}

	render() {
		const { params } = this.props.navigation.state;
		const { navigate } = this.props.navigation;

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
					source={require('../assets/images/splash.jpg')}
				/>

				<KeyboardAvoidingView
					behavior="padding"
					keyboardVerticalOffset={60}
					style={{ flex: 2 }}
					contentContainerStyle={{
						flex: 1,
						flexDirection: 'column',
						justifyContent: 'flex-end',
						alignItems: 'center',
						width: Dimensions.get('window').width
					}}
				>
					<View style={styles.inputsContainer}>
						<View style={styles.singleInputContainer}>
							<TextInput
								style={{ flex: 1 }}
								placeholder="اقصي سعر توصيل ب الريال السعودي"
								selectedValue={this.state.maxcost}
								onChangeText={(value) =>

									this.setState({ maxcost: value }, () => {
										AsyncStorage.setItem('maxcost', value);
									})
								}
							/>


							<Ionicons
								name={Platform.OS === 'ios' ? 'ios-cash' : 'md-cash'}
								size={26}
								color={Colors.fadedMainColor}
								style={styles.inputIcon}
							/>
						</View>

						<View style={styles.singleInputContainer}>
							<TextInput
								style={{ flex: 1 }}
								placeholder="اقصي مده للتوصيل ب الدقيقه"
								onChangeText={(value) =>
									this.setState({ maxtime: value }, () => {
										AsyncStorage.setItem('maxtime', value);
									})
								}
							/>


							<Ionicons
								name={Platform.OS === 'ios' ? 'ios-time' : 'md-time'}
								size={26}
								color={Colors.fadedMainColor}
								style={styles.inputIcon}
							/>
						</View>

						<View style={styles.singleInputContainer}>
							<Picker
								style={{ flex: 1 }}
								selectedValue={this.state.sortby}
								onValueChange={(itemValue, itemIndex) =>
									this.setState({ sortby: itemValue }, () => {
										AsyncStorage.setItem('sortby', itemValue);
									})
								}
							>
								<Picker.Item label="التوصيل الارخص اولا" value="3" />
								<Picker.Item label="التوصيل الاسرع اولا" value="2" />
								<Picker.Item label="التقييم الاعلى اولا" value="1" />
								<Picker.Item label="المطاعم الاقرب اولا" value="0" />
							</Picker>

							<Ionicons
								name={Platform.OS === 'ios' ? 'ios-funnel' : 'md-funnel'}
								size={26}
								color={Colors.fadedMainColor}
								style={styles.inputIcon}
							/>
						</View>
						<View style={{ flex: 1 }}>
							<Button
								onPress={() => {
									this.props.navigation.navigate('Main');
								}}
								color="white"
								backgroundColor={Colors.mainColor}
								containerViewStyle={{ borderRadius: 15 }}
								borderRadius={15}
								buttonStyle={{ padding: 10 }}
								textStyle={{ fontFamily: 'myfont' }}
								title="حفظ التغيرات"
							/>
						</View>
					</View>
				</KeyboardAvoidingView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
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
		paddingTop: 15,
		flex: 0.8,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'center',
		width: '90%'
	},
	singleInputContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	}
});
