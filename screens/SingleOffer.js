import React from 'react';
import {
	ScrollView,
	Text,
	FlatList,
	TouchableOpacity,
	View,
	AsyncStorage
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import Colors from '../constants/Colors';
import MealBox from '../components/MealBox';
import { Button } from 'react-native-elements';
import Server from '../constants/server';
import LoadingIndicator from '../components/LoadingIndicator';
// import { NavigationActions } from 'react-navigation';

export default class SingleOffer extends React.Component {
	addcart = () => {
		var meal = this.state.offer;

		AsyncStorage.getItem('cart').then(cart => {
			AsyncStorage.setItem('cart', cart + ',' + meal.key);
			alert('تم اضافه الوجبه الى السله');
		});
	};

	static navigationOptions = ({ navigation }) => ({
		title: 'عرض',
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
			offer: {}
		};
	}
	componentDidMount() {
		fetch(
			Server.dest +
				'/api/offer?offer_id=' +
				this.props.navigation.state.params.offer_id
		)
			.then(res => res.json())
			.then(res =>
				this.setState({ offer: res.response[0] }, () =>
					this.setState({ doneFetches: 1 })
				)
			);
	}
	render() {
		const { params } = this.props.navigation.state;
		if (this.state.doneFetches == 0)
			return <LoadingIndicator size="large" color="#B6E3C6" />;

		return (
			<View>
				<MealBox
					style={{
						backgroundColor: 'red',
						flex: 1
					}}
					name={this.state.offer.name}
					desc={this.state.offer.info}
					image={this.state.offer.img}
					price={this.state.offer.cost_after}
				/>

				<Button
					onPress={() => {
						this.addcart();
					}}
					color="white"
					backgroundColor={Colors.mainColor}
					containerViewStyle={{ borderRadius: 15 }}
					borderRadius={15}
					buttonStyle={{ padding: 10 }}
					textStyle={{ fontFamily: 'myfont' }}
					title="اضف الى السله"
				/>
			</View>
		);
	}
}
