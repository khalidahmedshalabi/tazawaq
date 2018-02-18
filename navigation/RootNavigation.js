import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import LocationSetting from '../screens/LocationSetting';
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
import Restaurant from '../screens/Restaurant';
import CodeVerification from '../screens/CodeVerification';
import ResetPassword from '../screens/ResetPassword';
import MealsScreen from '../screens/MealsScreen';
import SingleMeal from '../screens/SingleMeal';
import MyTicketsScreen from '../screens/MyTicketsScreen';
import SingleTicketScreen from '../screens/SingleTicketScreen';
import SingleOrderScreen from '../screens/SingleOrderScreen';
import FilterScreen from '../screens/FilterScreen';
const RootStackNavigator = StackNavigator(
    {
        // Add new screens at the end of this list, not here

        LocationSetting: { screen: LocationSetting },
        Main: { screen: MainTabNavigator },
        Signin: { screen: Signin },
        Signup: { screen: Signup },
        CodeVerification: { screen: CodeVerification },
        ResetPassword: { screen: ResetPassword },
        Restaurant: {screen : Restaurant},
        MealsScreen: {screen : MealsScreen},
        SingleMeal: {screen: SingleMeal},
        SingleTicketScreen: {screen: SingleTicketScreen},
        SingleOrderScreen: {screen: SingleOrderScreen},
        FilterScreen: {screen: FilterScreen},
        MyTicketsScreen: {screen: MyTicketsScreen},

    },
    {
        navigationOptions: () => ({
            headerTitleStyle: {
                fontWeight: 'normal',
            },
        }),
    }
);

export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}
