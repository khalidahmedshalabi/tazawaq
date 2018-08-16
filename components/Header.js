import React from 'react';
import {
	Platform,
	View,
	TextInput,
	StyleSheet,
	Text,
	AsyncStorage,
	TouchableOpacity
} from 'react-native';
import { Ionicons,MaterialCommunityIcons,SimpleLineIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { Font } from 'expo';
import Server from '../constants/server';

const fontCol = 'white';
const iconCol = 'rgba(255,255,255,0.8)';
const bgCol = Colors.mainColor;

export default class Header extends React.Component {
	componentDidMount() {
		fetch(
			Server.dest +
				'/api/special_orders_status'
		)	.then(res => res.json())
			.then(status => {
				this.setState({SpecialOrderStatus:status.status})
			})
		this.setState({ fontLoaded: '1' });

		AsyncStorage.getItem('location').then(value => {
			this.setState({
				location: value === null ? 'لم يتم تحديد مكان' : value
			});
		});
	}

	constructor(props) {
		super(props);

		this.state = {
			displaySearch: 0,
			searchText: '',
			fontLoaded: '0',
			location: ' ',
			SpecialOrderStatus:0
		};
	}

	doSearch = () => {
		if (this.state.searchText.length)
			this.props.navigation.navigate('SearchResult', {
				searchingFor: this.state.searchText
			});
	};

	trimName = str => {
		return str.length > 35 ? str.substring(0, 32) + '...' : str;
	};
	SpecialOrderNavigate = () =>{

			this.props.navigation.navigate('Main')

	}
	renderHeaderButton = () => {
		if (this.state.displaySearch) {
			return (
				<TouchableOpacity onPress={() => this.setState({ displaySearch: 0 })}>
					<Ionicons
						name={Platform.OS === 'ios' ? 'ios-arrow-up' : 'md-arrow-dropup'}
						size={32}
						style={{ padding: 10 }}
						color={iconCol}
					/>
				</TouchableOpacity>
			);
		} else {
			return (
				<TouchableOpacity onPress={() => this.setState({ displaySearch: 1 })}>
					<Ionicons
						name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
						size={32}
						style={{ padding: 10 }}
						color={iconCol}
					/>
				</TouchableOpacity>
			);
		}
	};

	shouldDisplaySearchBar = () => {
		if (this.state.displaySearch) {
			return (
				<View style={styles.box}>
					<TouchableOpacity onPress={() => this.doSearch()}>
						<Ionicons
							name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
							size={32}
							style={{ padding: 10 }}
							color="gray"
						/>
					</TouchableOpacity>
					<TextInput
						{...this.props}
						style={styles.input}
						placeholderTextColor="#999999"
						placeholder="البحث عن مطعم"
						returnKeyType={'search'}
						underlineColorAndroid="transparent"
						onChangeText={text => this.setState({ searchText: text })}
						onSubmitEditing={event => this.doSearch()}
					/>
				</View>
			);
		} else return null;
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.topbox}>
					<View
						style={{
							flex: 0.2,
							flexDirection: 'row',
							justifyContent: 'flex-start'
						}}
					>
						<TouchableOpacity
							onPress={() => this.props.navigation.navigate('FilterScreen')}
						>
							<Ionicons
								name="ios-funnel"
								size={29}
								style={{ padding: 10 }}
								color={iconCol}
							/>
						</TouchableOpacity>

						{this.renderHeaderButton()}
					</View>

					<View
						style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}
					>
					<TouchableOpacity style={{
						flex: 1,
						justifyContent: 'flex-end',
						padding: 10,
						flexDirection: 'row',
					}} onPress={() => this.SpecialOrderNavigate()}>

							<Text
								style={{
									fontFamily: 'myfont',
									fontSize:18,
									fontWeight:'bold',
									textAlign:'right',
									color:'white',
									justifyContent:'center',
									marginTop:5
								}}
							>
							الرئيسية
							</Text>
							<SimpleLineIcons
								name="home"
								size={30}
								color='white'
								style={{ paddingLeft: 5 }}
							/>
					</TouchableOpacity>
					</View>
				</View>

				{this.shouldDisplaySearchBar()}
			</View>
		);
	}
}

var styles = StyleSheet.create({
	container: {
		backgroundColor: 'white'
	},
	topbox: {
		marginTop: Platform.OS === 'ios' ? 20 : 0,
		paddingTop: 8,
		paddingBottom: 6,
		height: 55,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: bgCol,
		borderBottomColor: '#EEEEEE',
		borderBottomWidth: 1
	},
	box: {
		height: 45,
		backgroundColor: Colors.smoothGray,
		borderRadius: 9,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		marginVertical: 12,
		marginHorizontal: 10
	},

	input: {
		justifyContent: 'center',
		height: 22,
		fontFamily: 'myfont',
		marginTop: 10,
		backgroundColor: 'transparent',
		fontSize: 15,
		alignItems: 'center',
		marginRight: 7,
		marginLeft: 7,

		flex: 1
	}
});
