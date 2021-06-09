import React from 'react';
import { SafeAreaView, Image, StyleSheet, Dimensions } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';

interface Props {}

const screenWidth = Dimensions.get('window').width;

const TradeImage: React.FC<Props> = () => {
	const route = useRoute();
	const { trade } = route.params;
	console.log(trade);
	return (
		<SafeAreaView style={styles.container}>
			<Image
				resizeMode="contain"
				style={{ width: '100%', height: '100%' }}
				source={{
					uri: `${Constants.manifest.extra.API_URL}/user-trade-image/${trade.imageURL}`,
				}}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#121212',
	},
});

export default TradeImage;
