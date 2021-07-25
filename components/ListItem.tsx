import React, { useState } from 'react';
import { List, Surface, Divider } from 'react-native-paper';

import { tradeText, formatElapsedTime, tradeStatus } from '../helpers';
import { Trade, UserTrade } from '../types/types';

import ListItemMenu from './ListItemWindyMenu';

interface Props {
	trade: Trade;
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
					title={tradeText(trade)}
					description={
						tradeStatus(trade) + ' ' + formatElapsedTime(trade.updatedAt)
					}
					right={(props) => (
						<ListItemMenu
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
