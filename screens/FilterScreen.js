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
import SelectInput from 'react-native-select-input-ios';

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

	getPrice() {
    return [
      { value: 50, label: '50'      },
      { value: 100, label: '100'     },
      { value: 150, label: '150'     },
      { value: 200, label: '200' },
			{ value: 250, label: '250' },
			{ value: 300, label: '300' },
			{ value: 350, label: '350' },
			{ value: 400, label: '400' },
			{ value: 450, label: '450' },
    ];
  }

	getTime() {
    return [
      { value: 5, label:  '5'  },
      { value: 10, label: '10' },
      { value: 15, label: '15' },
      { value: 20, label: '20' },
			{ value: 25, label: '25' },
			{ value: 30, label: '30' },
			{ value: 35, label: '35' },
			{ value: 40, label: '40' },
			{ value: 45, label: '45' },
    ];
  }

	getSort() {
    return [
      { value: 3, label:  'التوصيل الارخص اولا'  },
      { value: 2, label: 'التوصيل الاسرع اولا' },
      { value: 1, label: 'التقييم الاعلى اولا' },
      { value: 0, label: 'المطاعم الاقرب اولا' },
    ];
  }



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
						<SelectInput
              value={this.state.maxcost || 50}
              options={this.getPrice()}
              onCancelEditing={() => console.log('onCancel')}
              onSubmitEditing={(value) =>

								this.setState({ maxcost: value }, () => {
									AsyncStorage.setItem('maxcost', ''+value);
								})
							}
							style={{ flex: 1 }}
            />



							<Ionicons
								name={Platform.OS === 'ios' ? 'ios-cash' : 'md-cash'}
								size={26}
								color={Colors.fadedMainColor}
								style={styles.inputIcon}
							/>
						</View>

						<View style={styles.singleInputContainer}>
						<SelectInput
              value={this.state.maxtime || 15}
              options={this.getTime()}
              onCancelEditing={() => console.log('onCancel')}
              onSubmitEditing={(value) =>
								this.setState({ maxtime: value }, () => {
									AsyncStorage.setItem('maxtime', ''+value);
											})
							}
							style={{ flex: 1 }}
            />



							<Ionicons
								name={Platform.OS === 'ios' ? 'ios-time' : 'md-time'}
								size={26}
								color={Colors.fadedMainColor}
								style={styles.inputIcon}
							/>
						</View>

						<View style={styles.singleInputContainer}>
						<SelectInput
              value={this.state.sortby}
              options={this.getSort()}
              onCancelEditing={() => console.log('onCancel')}
              onSubmitEditing={(value) =>
								this.setState({sortby: value }, () => {
									AsyncStorage.setItem('sortby', ''+value);


											})
							}
							style={{ flex: 1 }}
            />


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
