import { Constants, Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import Server from '../constants/server';

export default (async function registerForPushNotificationsAsync() {
	// Remote notifications do not work in simulators, only on device
	if (!Constants.isDevice) {
		return;
	}

	// Android remote notification permissions are granted during the app
	// install, so this will only ask on iOS
	let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

	// Stop here if the user did not grant permissions
	if (status !== 'granted') {
		return;
	}

	// Get the token that uniquely identifies this device
	let token = await Notifications.getExpoPushTokenAsync();

	AsyncStorage.setItem('token', token);
	console.log(token);
});
