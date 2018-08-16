import React from 'react';
import { Image, AsyncStorage, Text, FlatList, TouchableOpacity, View, Dimensions } from 'react-native';
import Colors from '../constants/Colors';
import SingleCategory1 from '../components/SingleCategory1';

import LoadingIndicator from '../components/LoadingIndicator';

import Server from '../constants/server';
import { LinearGradient } from 'expo';

export default class Intro extends React.Component {

	static navigationOptions = () => ({
		title: 'الرئيسيه',
		header: null,
		headerTintColor: Colors.smoothGray,
		fontFamily: 'myfont',
		headerStyle: {
			backgroundColor: Colors.mainColor,
			borderBottomColor: Colors.mainColor,
			borderBottomWidth: 3,
		},
		headerTitleStyle: {
			fontWeight: '300',
			color: '#ffffff',
			fontFamily: 'myfont',
			fontSize: 16
		},
	});
	constructor(props) {
		super(props);
		this.state = {
			doneFetches: 1,

			tabs: [{
				key: '1',
				screenName: 'المحلات التجارية',
				to: 'Home',
				id: 1
			},
			{
				key: '2',
				screenName: 'مندوب طلباتك',
				to: 'SpecialOrderScreen',
				id: 1
			}, {
				key: '3',
				screenName: 'خدمات طلباتك',
				to: 'Home',
				id: 2
			},
			{
				key: '4',
				screenName: 'المتاجر الشخصية',
				to: 'Home',
				id: 3
			}, {
				key: '5',
				screenName: 'الأسر المنتجة',
				to: 'Home',
				id: 4
			},
			],
			SpecialOrderStatus: 0,
			//image: 'https://pbs.twimg.com/media/DkXAIiKWsAAMRVJ.jpg:large'
			image: 'http://'
		}
	}

	componentDidMount() {
		fetch(
			Server.dest +
			'/api/special_orders_status'
		).then(res => res.json())
			.then(status => {
				this.setState({ SpecialOrderStatus: status.status })
			})
		fetch(
			Server.dest +
			'/api/image'
		).then(res => res.json())
			.then(status => {
				this.setState({ image: status.background })
			})
		// fetch(Server.dest + '/api/store-categories?store_id='+this.props.navigation.state.params.key).then((res)=>res.json()).then((categories)=>{
		//    this.setState({ tabs: categories.response });
		//  });
		//  fetch(Server.dest + '/api/store-info?store_id='+this.props.navigation.state.params.key).then((res)=>res.json()).then((restaurants)=>{
		//     this.setState({
		//       Restaurant: [restaurants.response],
		//       doneFetches:1
		//     })
		//   })


		// Inneed      onPress={() => onPressHandler(page)

	}

	render() {
		const { navigate } = this.props.navigation;
		if (this.state.doneFetches == 0)
			return <LoadingIndicator size="large" color="#B6E3C6" />;

		return (
			<View>
				<View>
					<Image
						style={{
							backgroundColor: '#ccc',
							flex: 1,
							resizeMode: 'cover',
							position: 'absolute',
							width: '100%',
							height: Dimensions.get('window').height,
							justifyContent: 'center',
						}}
						source={{ uri: this.state.image }}
					/>

				</View>
				<FlatList
					automaticallyAdjustContentInsets={false}
					style={{
						backgroundColor: 'white',
						borderColor: Colors.mainColor,
						borderWidth: 1,
						borderRadius: 20,
						width: '70%',
						alignSelf: 'center',
						marginTop: 20,
						height: '58%',
						marginTop: '35%'
					}}
					ListFooterComponent={
						<TouchableOpacity onPress={() => {
							AsyncStorage.setItem('SkippedLogin', '0');
							AsyncStorage.setItem('login', '0');
							this.props.navigation.navigate('Signin', {});
						}}
						>
							<LinearGradient
								colors={['#ebb70a', '#ebb70ae8', '#ebb70ad1']}
								style={{
									alignSelf: 'center',
									height: 50,
									marginTop: 15,
									width: 150,
									alignItems: 'center',
									justifyContent: 'center',
									borderRadius: 50
								}}>

								<Text style={{
									textAlign: 'center',
									backgroundColor: 'transparent',
									color: 'white',
									fontFamily: 'myfont',
									fontSize: 16
								}}>تسجيل الدخول</Text>
							</LinearGradient>
						</TouchableOpacity>
					}
					contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', marginTop: '15%' }}
					removeClippedSubviews={false}
					data={this.state.tabs}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() => {
							if (item.to == 'SpecialOrderScreen') {
								if (this.state.SpecialOrderStatus == 0) {
									alert('الخدمه متوقفه الان')
								}
								else {
									this.props.navigation.navigate('SpecialOrderScreen')
								}
							}
							else {
								navigate(item.to, { id: item.id })
							}
						}
						} >
							<SingleCategory1
								style={{ alignSelf: 'center', width: '80%', justifyContent: 'center', alignItems: 'center' }}
								name={item.screenName}
							/>
						</TouchableOpacity>
					)}
				/>

			</View>
		);
	}
}
