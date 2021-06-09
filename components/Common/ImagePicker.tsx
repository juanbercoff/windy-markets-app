import React, { useState, useEffect } from 'react';
import { Image, View, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

interface Props {
	image: any;
	setImage: (val: any) => void;
}

const FormImagePicker: React.FC<Props> = ({ image, setImage }) => {
	useEffect(() => {
		(async () => {
			if (Platform.OS !== 'web') {
				const { status } =
					await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== 'granted') {
					alert('Sorry, we need camera roll permissions to make this work!');
				}
			}
		})();
	}, []);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
		});

		console.log(result);

		if (!result.cancelled) {
			setImage(result);
		}
	};

	return (
		<View style={{ marginTop: 5 }}>
			<Button
				onPress={pickImage}
				icon="camera"
				focusable
				style={{ borderRadius: 10 }}
				mode="contained"
				color="#000000"
			>
				{' '}
				Trade screenshot
			</Button>
			{image != '' ? (
				<Image
					source={{ uri: image?.uri }}
					style={{ width: 200, height: 200, alignSelf: 'center' }}
				/>
			) : null}
		</View>
	);
};

export default FormImagePicker;
