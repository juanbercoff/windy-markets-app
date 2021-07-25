import React from 'react';
import { List } from 'react-native-paper';
import { Trade, UserTrade } from '../types/types';
import { StyleSheet } from 'react-native';
import ListItem from './ListItem';
import ListItemUser from './ListItemUser';

interface Props {
	title: string;
	data: Trade[] | UserTrade[];
	followedTrades?: Array<number>;
	tradeType: 'windy' | 'user';
}
const TradesList: React.FC<Props> = ({
	title,
	data,
	followedTrades,
	tradeType,
}) => {
	return (
		<List.Section focusable>
			<List.Subheader style={styles.title}>{title}</List.Subheader>
			{tradeType === 'windy'
				? data.map((trade: any) => (
						<ListItem
							key={trade.id}
							trade={trade}
							following={followedTrades?.includes(trade.id)}
						/>
				  ))
				: data.map((trade: any) => (
						<ListItemUser
							key={trade.id}
							trade={trade}
							following={followedTrades?.includes(trade.id)}
						/>
				  ))}
		</List.Section>
	);
};

const styles = StyleSheet.create({
	title: {
		textAlign: 'center',
	},
});

export default TradesList;
