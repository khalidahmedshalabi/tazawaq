import React from 'react';
import { Platform, View, Text,AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import OffersTab from '../screens/OffersTab';
import SettingsScreen from '../screens/SettingsScreen';
import Header from '../components/Header';
import CartScreen from '../screens/CartScreen';
import OrderTabs from '../navigation/OrderTabsNavigator';
function cart(){
	AsyncStorage.getItem('cart').then((cart)=>{
		if(cart){
			return  cart.split(",").length;
		}
		else{
			return 0;
		}
	})
}


export default TabNavigator(
	{
		مطاعم: {
			screen: HomeScreen
		},
		السله: {
			screen: CartScreen
		},
		طلبات: {
			screen: OrderTabs
		},
		العروض: {
			screen: OffersTab
		},
		اعدادات: {
			screen: SettingsScreen
		}
	},
	
	{
		navigationOptions: ({ navigation }) => ({
			header: null,
			tabBarIcon: ({ focused }) => {
				const { routeName } = navigation.state;
				let iconName;
				switch (routeName) {
					case 'مطاعم':
						iconName =
							Platform.OS === 'ios'
								? `ios-restaurant${focused ? '' : '-outline'}`
								: 'ios-restaurant';
						break;
					case 'طلبات':
						iconName =
							Platform.OS === 'ios'
								? `ios-paper${focused ? '' : '-outline'}`
								: 'md-paper';
						break;
					case 'اعدادات':
						iconName =
							Platform.OS === 'ios'
								? `ios-contact${focused ? '' : '-outline'}`
								: 'md-contact';
						break;
					case 'السله':
						return (
							<View
								style={{
									zIndex: 0,
									flex: 1,
									alignSelf: 'stretch',
									justifyContent: 'space-around',
									alignItems: 'center'
								}}
							>
								<Ionicons
									name={
										Platform.OS === 'ios'
											? `ios-cart${focused ? '' : '-outline'}`
											: 'md-cart'
									}
									size={32}
									style={{ marginBottom: -3 }}
									color={
										focused ? Colors.tabIconSelected : Colors.tabIconDefault
									}
								/>
								{(cart() >= 1) ? (
									<View
										style={{
											position: 'absolute',
											top: 5,
											right: 5,
											borderRadius: 50,
											backgroundColor: 'red',
											zIndex: 2
										}}
									>
										<Text
											style={{
												color: 'white',
												fontWeight: 'bold',
												padding: 5,
												textAlign: 'center',
												fontSize: 13,
												minHeight: 25,
												minWidth: 25
											}}
										>
											{cart()}
										</Text>
									</View>
								) : (
									undefined
								)}
							</View>
						);
						break;
					case 'العروض':
						iconName =
							Platform.OS === 'ios'
								? `ios-beer${focused ? '' : '-outline'}`
								: 'md-beer';
						break;
				}
				return (
					<Ionicons
						name={iconName}
						size={32}
						style={{ marginBottom: -3 }}
						color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
					/>
				);
			}
		}),
		tabBarOptions: { showLabel: false },
		tabBarComponent: TabBarBottom,
		tabBarPosition: 'bottom',
		animationEnabled: false,
		swipeEnabled: true

	}
);
