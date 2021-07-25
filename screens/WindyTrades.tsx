import React, { useEffect } from 'react';
import {
	ScrollView,
	StyleSheet,
	RefreshControl,
	Text,
	SafeAreaView,
} from 'react-native';
import { getUserId } from '../helpers';
import { useWindyTrades, useUserTrades } from '../hooks/useWindyTrades';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Colors } from 'react-native-paper';

import TradesList from '../components/TradesList';

let userId: string;
getUserId().then((res) => (userId = res));

const wait = (timeout: number) => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};

const WindyTrades: React.FC<{}> = () => {
	const isFocused = useIsFocused();
	const { windyTrades, fetching } = useWindyTrades(true, isFocused);
	const [refreshing, setRefreshing] = React.useState(false);
	const { userTrades } = useUserTrades(userId, true, isFocused);
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, [useWindyTrades]);

	if (fetching) {
		return (
			<ActivityIndicator
				animating={true}
				color={Colors.white}
				focusable
				style={styles.loading}
				size="large"
			/>
		);
	}

	return (
		<ScrollView
			style={styles.container}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
		>
			{windyTrades.length === 0 ? (
				<Text style={styles.noTradesText}>No trades today</Text>
			) : (
				<TradesList
					title={'DAY TRADES'}
					tradeType={'windy'}
					data={windyTrades}
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
	loading: {
		paddingTop: 40,
	},
});

export default WindyTrades;
