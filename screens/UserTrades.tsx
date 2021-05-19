import React from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
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
	return (
		<ScrollView
			style={styles.container}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
		>
			<TradesList
				title={'Your trades'}
				tradeType={'user'}
				data={userTrades}
				followedTrades={userTrades.map((userTrades) => userTrades.trade.id)}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#121212',
	},
});

export default UserTrades;
