import { Trade, UserTrade } from './types/types';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

export const formatElapsedTime = (dateAsString: string) => {
	const date = new Date(dateAsString);
	let timeDiff = new Date() - date;
	timeDiff /= 1000;
	if (timeDiff < 60) {
		return Math.round(timeDiff) + ' sec ago.';
	} else if (timeDiff < 3600) {
		return Math.round(timeDiff / 60) + ' min ago.';
	} else {
		return Math.round(timeDiff / 3600) + ' hs ago.';
	}
};

const formatDate = (dateAsString: string) => {
	const date = new Date(dateAsString);

	const monthName = months[date.getMonth()];
	const dayOfMonth = date.getDate();

	return monthName + ' ' + dayOfMonth;
};

const calculateTrade = (tradeValues: Trade) => {
	const netValue = Math.round(
		((tradeValues.closePrice - tradeValues.price) / tradeValues.price) * 100
	);

	if (netValue > 0) {
		return `with ${netValue}% GAIN`;
	}
	return `with ${Math.abs(netValue)}% LOSS`;
};

const verbText = (tradeValues: Trade) => {
	switch (tradeValues.status) {
		case 'placed':
			return 'BUY';

		case 'sold':
			return 'SELL';
	}
};

export function tradeText(tradeValues: Trade) {
	return (
		verbText(tradeValues) +
		' ' +
		tradeValues.contractType.toUpperCase() +
		' ' +
		tradeValues.stock.toUpperCase() +
		' strike ' +
		tradeValues.strike +
		' at ' +
		(tradeValues.price ? '$' + tradeValues.price : ' Market Price ') +
		'\nEXP ' +
		formatDate(tradeValues.expirationDate) +
		' ' +
		(tradeValues.closePrice
			? 'at $' + tradeValues.closePrice + ' ' + calculateTrade(tradeValues)
			: '')
	);
}

export function tradeStatus(tradeValues: Trade) {
	return tradeValues.status.toUpperCase();
}

export const registerForPushNotificationsAsync = async () => {
	if (Constants.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		}
		const token = (await Notifications.getExpoPushTokenAsync()).data;
		return token;
	} else {
		alert('Must use physical device for Push Notifications');
	}

	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}
};

export function userTradeText(tradeValues: UserTrade) {
	/* verbText(tradeValues) +
		' ' +
		tradeValues.contractType.toUpperCase() +
		' ' +
		tradeValues.stock.toUpperCase() +
		' strike ' +
		tradeValues.strike +
		' at ' +
		(tradeValues.price ? '$' + tradeValues.price : ' Market Price ') +
		'\nEXP ' +
		formatDate(tradeValues.expirationDate) +
		' ' +
		(tradeValues.closePrice
			? 'at $' + tradeValues.closePrice + ' ' + calculateTrade(tradeValues)
			: ''); */

	return (
		(!tradeValues.closePrice ? 'BOT ' : 'SOLD ') +
		tradeValues.trade.contractType.toUpperCase() +
		' ' +
		tradeValues.trade.stock.toUpperCase() +
		' strike ' +
		tradeValues.trade.strike +
		' at $' +
		tradeValues.price +
		'\nEXP ' +
		formatDate(tradeValues.trade.expirationDate) +
		' ' +
		(tradeValues.closePrice
			? 'at $' +
			  tradeValues.closePrice +
			  ' ' +
			  calculateTrade(tradeValues.trade)
			: '')
	);
}

export const getUserId = async (): Promise<string> => {
	try {
		const value = await AsyncStorage.getItem('userId');

		if (value !== null) {
			return value;
		}
		// TODO
		throw 'no user';
	} catch (e) {
		throw e;
	}
};
