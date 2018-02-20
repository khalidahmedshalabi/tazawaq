import React from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	FlatList,
	TouchableOpacity,
	View,
	Dimensions,
	Image,
	AsyncStorage
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Colors from '../constants/Colors';
import TicketBox from '../components/TicketBox';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
export default class Meals extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'التذاكر',
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
			Tickets: [{}]
		};
	}
	_keyExtractor = (item, index) => item.ticket_id;

	render() {
		const { params } = this.props.navigation.state;
		const { navigate } = this.props.navigation;
		if (this.state.doneFetches == 0)
			return <LoadingIndicator size="large" color="#B6E3C6" />;

		if (this.state.Tickets.length != 0) {
			return (
				<View>
					<View
						style={{
							backgroundColor: '#FFFFFF'
						}}
					>
						<Image
							style={{
								flex: 1,
								height: '100%',
								width: Dimensions.get('window').width
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
						data={this.state.Tickets}
						ListHeaderComponent={() => (
							<Image
								resizeMode="cover"
								style={{ padding: 10, height: 150, width: '100%' }}
								source={require('../assets/images/splash.jpg')}
							/>
						)}
						keyExtractor={this._keyExtractor}
						ListFooterComponent={() => (
							<TouchableOpacity onPress={() => navigate('AddTicketScreen')}>
								<View
									style={{
										flex: 1,
										justifyContent: 'center',
										alignSelf: 'center',
										padding: 10,
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
										افتح تذكره جديده
									</Text>
									<MaterialCommunityIcons
										name="plus-circle"
										size={30}
										color={Colors.secondaryColor}
										style={{ paddingLeft: 5 }}
									/>
								</View>
							</TouchableOpacity>
						)}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() =>
									navigate('SingleTicketScreen', { Ticket_id: item.ticket_id })
								}
							>
								<TicketBox
									name={item.title}
									status={item.status}
									desc={item.recent_msg}
									price={item.price}
								/>
							</TouchableOpacity>
						)}
					/>
				</View>
			);
		}

		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignSelf: 'center',
					padding: 10,
					flexDirection: 'row',
					borderWidth: 5,
					borderColor: '#e9e9ef'
				}}
			>
				<TouchableOpacity onPress={() => navigate('MyTicketsScreen')}>
					<Text
						style={{
							fontFamily: 'myfont'
						}}
					>
						افتح تذكره جديده
					</Text>
					<MaterialCommunityIcons
						name="plus-circle"
						size={30}
						color={Colors.secondaryColor}
						style={{ paddingLeft: 5 }}
					/>
				</TouchableOpacity>
			</View>
		);
	}
}
