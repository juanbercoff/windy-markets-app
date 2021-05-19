import React, { useState } from 'react';
import { List, Surface, Divider } from 'react-native-paper';

import { formatElapsedTime, userTradeText } from '../helpers';
import { UserTrade } from '../types/types';

import ListItemUserMenu from './ListItemUserMenu';

interface Props {
	trade: UserTrade;
	following?: boolean;
}

const ListItem: React.FC<Props> = ({ trade, following }) => {
	const [visible, setVisible] = useState(false);

	const openMenu = () => setVisible(true);

	const closeMenu = () => setVisible(false);
	return (
		<>
			<Surface focusable>
				<List.Item
					titleNumberOfLines={2}
					title={userTradeText(trade)}
					description={
						(trade.status === 'open' ? 'FOLLOWED ' : 'SOLD ') +
						formatElapsedTime(trade.updatedAt)
					}
					right={(props) => (
						<ListItemUserMenu
							trade={trade}
							visible={visible}
							openMenu={openMenu}
							closeMenu={closeMenu}
							following={following}
						/>
					)}
				/>

				<Divider focusable />
			</Surface>
		</>
	);
};

export default ListItem;
