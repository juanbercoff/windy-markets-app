import { Trade, UserTrade } from './types/types';
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

	return monthName + '.' + dayOfMonth + ' ';
};

const calculateTrade = (tradeValues: Trade) => {
	const netValue = Math.round(
		((tradeValues.closePrice - tradeValues.price) / tradeValues.price) * 100
	);

	if (netValue > 0) {
		return `GAIN ${netValue}%`;
	}
	return `LOSS ${Math.abs(netValue)}%`;
};

export function tradeText(tradeValues: Trade) {
	return (
		(!tradeValues.closePrice ? 'BUY' : '') +
		' ' +
		tradeValues.contractType.toUpperCase() +
		' of ' +
		tradeValues.stock.toUpperCase() +
		' strike ' +
		tradeValues.strike +
		' at ' +
		(tradeValues.price ? '$' + tradeValues.price : ' Market Price ') +
		' EXP ' +
		formatDate(tradeValues.expirationDate) +
		' ' +
		(tradeValues.closePrice
			? tradeValues.status.toUpperCase() +
			  ' at $' +
			  tradeValues.closePrice +
			  ' ' +
			  calculateTrade(tradeValues)
			: '')
	);
}

export function userTradeText(tradeValues: UserTrade) {
	return (
		(!tradeValues.closePrice ? 'BOUGHT ' : '') +
		tradeValues.trade.contractType.toUpperCase() +
		' of ' +
		tradeValues.trade.stock.toUpperCase() +
		' strike ' +
		tradeValues.trade.strike +
		' at $' +
		tradeValues.price +
		' EXP ' +
		formatDate(tradeValues.trade.expirationDate) +
		' ' +
		(tradeValues.closePrice
			? 'SOLD at $' +
			  tradeValues.closePrice +
			  ' ' +
			  calculateTrade(tradeValues.trade)
			: '')
	);
}

export function newTrade(tradeValues: Trade) {
	return (
		'BUY ' +
		tradeValues.contractType.toUpperCase() +
		' of ' +
		tradeValues.stock.toUpperCase() +
		' strike ' +
		tradeValues.strike +
		' at ' +
		(tradeValues.price ? '$' + tradeValues.price : ' Market Price ') +
		' EXP ' +
		formatDate(tradeValues.expirationDate)
	);
}

export function confirmedTrade(tradeValues: Trade) {
	return (
		'FILLED BUY ' +
		tradeValues.contractType.toUpperCase() +
		' of ' +
		tradeValues.stock.toUpperCase() +
		' strike ' +
		tradeValues.strike +
		' at ' +
		(tradeValues.price ? '$' + tradeValues.price : ' Market Price ') +
		' EXP ' +
		formatDate(tradeValues.expirationDate)
	);
}

export function deletedTrade(tradeValues: Trade) {
	return (
		'CANCELED BUY ' +
		tradeValues.contractType.toUpperCase() +
		' of ' +
		tradeValues.stock.toUpperCase() +
		' strike ' +
		tradeValues.strike +
		' at ' +
		(tradeValues.price ? '$' + tradeValues.price : ' Market Price ') +
		' EXP ' +
		formatDate(tradeValues.expirationDate)
	);
}

export function soldTrade(tradeValues: Trade) {
	return (
		'SOLD ' +
		tradeValues.contractType.toUpperCase() +
		' of ' +
		tradeValues.stock.toUpperCase() +
		' strike ' +
		tradeValues.strike +
		' at ' +
		(tradeValues.price ? '$' + tradeValues.price : ' Market Price ') +
		' EXP ' +
		formatDate(tradeValues.expirationDate)
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
