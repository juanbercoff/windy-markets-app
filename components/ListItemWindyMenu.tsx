import React from 'react';
import { Divider, Menu, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Trade } from '../types/types';
import { getUserId } from '../helpers';
import Constants from 'expo-constants';

interface Props {
	visible: boolean;
	closeMenu: () => void;
	openMenu: () => void;
	trade: Trade;
	following?: boolean;
}

let userId: string | undefined;
getUserId().then((res) => (userId = res));

const ListItemWindyMenu: React.FC<Props> = ({
	visible,
	openMenu,
	closeMenu,
	trade,
	following,
}) => {
	const navigation = useNavigation();
	return (
		<Menu
			contentStyle={{ backgroundColor: '#1E1E1E', borderRadius: 6 }}
			visible={visible}
			onDismiss={closeMenu}
			anchor={<IconButton icon="equal" onPress={openMenu} />}
		>
			<Menu.Item
				onPress={() => {
					return navigation.navigate('FollowTradeForm', {
						trade: trade,
						userId: userId,
					});
				}}
				title="Follow"
				disabled={trade.status === 'sold' || following ? true : false}
			/>
			<Divider focusable />
			<Menu.Item
				onPress={() => {
					return navigation.navigate('TradeImage', {
						uri: `${Constants.manifest.extra.API_URL}/api/images/tradeImages/${trade.id}`,
						type: 'windyTrade',
					});
				}}
				title="Trade images"
			/>
		</Menu>
	);
};

export default ListItemWindyMenu;
