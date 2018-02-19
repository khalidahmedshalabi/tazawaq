import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Header from '../components/Header';
import CartScreen from '../screens/CartScreen';
import OrderTabs from '../navigation/OrderTabsNavigator';

export default TabNavigator(
  {
    "مطاعم": {
      screen: HomeScreen,
    },
    "السله": {
      screen: CartScreen,
    },
    "طلبات": {
      screen: OrderTabs,
    },
    "اعدادات": {
      screen: SettingsScreen,
    },


  },
  {
    navigationOptions: ({ navigation }) => ({
        header: <Header navigation={navigation} />,
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
            iconName = Platform.OS === 'ios' ? `ios-paper${focused ? '' : '-outline'}` : 'md-paper';
            break;
          case 'اعدادات':
            iconName =
              Platform.OS === 'ios' ? `ios-contact${focused ? '' : '-outline'}` : 'md-contact';
              break;
          case 'السله':
            iconName =
              Platform.OS === 'ios' ? `ios-cart${focused ? '' : '-outline'}` : 'md-cart';
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
      },
    }),
    tabBarOptions: { showLabel:false },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  }
);
