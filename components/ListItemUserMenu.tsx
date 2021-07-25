import React from 'react';
import { Divider, Menu, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { UserTrade } from '../types/types';
import Constants from 'expo-constants';

interface Props {
	visible: boolean;
	trade: UserTrade;
	closeMenu: () => void;
	openMenu: () => void;
	following?: boolean;
}

const ListItemWindyMenu: React.FC<Props> = ({
	trade,
	visible,
	openMenu,
	closeMenu,
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
					return navigation.navigate('SellUserTradeForm', {
						trade: trade,
					});
				}}
				title="Sell"
				disabled={trade.status === 'open' ? false : true}
			/>
			<Divider focusable />
			<Menu.Item
				onPress={() => {
					return navigation.navigate('TradeImage', {
						uri: `${Constants.manifest.extra.API_URL}/user-trade-image/${trade.imageURL}`,
						type: 'userImage',
					});
				}}
				title="Trade Image"
			/>
		</Menu>
	);
};

export default ListItemWindyMenu;
