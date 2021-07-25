import React from 'react';
import { SafeAreaView, Image, StyleSheet, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import { useWindyImages } from '../hooks/useWindyTrades';
import { ActivityIndicator, Colors } from 'react-native-paper';
interface Props {}

const screenWidth = Dimensions.get('window').width;

const TradeImage: React.FC<Props> = () => {
	const route = useRoute();
	const { uri, type } = route.params;

	if (type === 'userImage') {
		return (
			<SafeAreaView style={styles.container}>
				<Image
					resizeMode="contain"
					style={{ width: '100%', height: '100%' }}
					source={{
						uri: uri,
					}}
				/>
			</SafeAreaView>
		);
	}
	//console.log(response);
	//const imageUrl = `${Constants.manifest.extra.API_URL}/trade-image/${response[0].imageURL}`;
	const { images, fetching } = useWindyImages(uri);
	console.log(images);
	if (fetching) {
		console.log(fetching);
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
		<SafeAreaView style={styles.container}>
			<Image
				resizeMode="contain"
				style={{ width: '100%', height: '100%' }}
				source={{
					uri: `${Constants.manifest.extra.API_URL}/trade-image/${images[0]?.imageURL}`,
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
	loading: {
		paddingTop: 40,
	},
});

export default TradeImage;
