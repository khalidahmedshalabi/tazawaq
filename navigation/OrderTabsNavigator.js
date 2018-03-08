import React from 'react';
import { TabNavigator } from 'react-navigation';

import CurrentOrders from '../screens/orders/CurrentOrders';
import OrdersHistory from '../screens/orders/OrdersHistory';
import AdminOrders from '../screens/orders/AdminOrders';
import Colors from '../constants/Colors';

export default TabNavigator(
	{
		'الطلبات الحالية': {
			screen: CurrentOrders
		},
		'الطلبات السابقة': {
			screen: OrdersHistory
		},
		'صاحب المتجر': {
			screen: AdminOrders
		}
	},
	{
		navigationOptions: ({ navigation }) => ({
			header: null
		}),
		tabBarOptions: {
			showLabel: true,
			labelStyle: {
				fontWeight: '500',
				color: 'white',
				fontFamily: 'myfont',
				fontSize: 15,
				alignItems:'center',
				justifyContent:'center',
				textAlign:'center'
			},
			style: {
				backgroundColor: '#EBB70A'
			},
			activeTintColor: '#000'
		},
		tabBarPosition: 'bottom',
		animationEnabled: false,
		swipeEnabled: true
	}
);
