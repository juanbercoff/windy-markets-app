import React from 'react';
import { Divider, Menu, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Trade } from '../types/types';
import { getUserId } from '../helpers';

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
					closeMenu();
					return navigation.navigate('FollowTradeForm', {
						tradeId: trade.id,
						userId: userId,
					});
				}}
				title="Follow"
				disabled={trade.status === 'sold' || following ? true : false}
			/>
			<Divider focusable />
			<Menu.Item onPress={() => {}} title="View trade images" />
		</Menu>
	);
};

export default ListItemWindyMenu;
