import React from 'react';
import { ScrollView, StyleSheet, RefreshControl, Text } from 'react-native';
import TradesList from '../components/TradesList';
import { getUserId } from '../helpers';
import { useIsFocused } from '@react-navigation/native';

import { useUserTrades } from '../hooks/useWindyTrades';

let userId: string;
getUserId().then((res) => (userId = res));

const wait = (timeout: number) => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};

const UserTrades: React.FC<{}> = () => {
	const isFocused = useIsFocused();
	const [refreshing, setRefreshing] = React.useState(false);
	const { userTrades } = useUserTrades(userId, true, isFocused);
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, [useUserTrades]);

	/* 	if (userTrades.length === 0)
		; */
	return (
		<ScrollView
			style={styles.container}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
		>
			{userTrades.length === 0 ? (
				<Text style={styles.noTradesText}>
					You are not following any trades
				</Text>
			) : (
				<TradesList
					title={'Your trades'}
					tradeType={'user'}
					data={userTrades}
					followedTrades={userTrades.map((userTrades) => userTrades.trade.id)}
				/>
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#121212',
	},
	noTradesText: {
		alignSelf: 'center',
		color: '#fff',
		fontSize: 20,
		paddingTop: 40,
	},
});

export default UserTrades;
