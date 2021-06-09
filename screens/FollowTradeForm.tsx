import React, { useState } from 'react';
import { Formik } from 'formik';
import { TextInput, Text, Button } from 'react-native-paper';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, StyleSheet, Dimensions } from 'react-native';
import ImagePicker from '../components/Common/ImagePicker';
import Constants from 'expo-constants';

interface Props {}

interface FormValues {
	price: string;
	amount: string;
}

//move to Home
type RouteParams = {
	FollowTradeForm: {
		tradeId: number;
		userId: number;
	};
};

const screenWidth = Dimensions.get('window').width;

const FollowTradeForm: React.FC<Props> = () => {
	const navigation = useNavigation();
	const [image, setImage] = useState(null);
	const route = useRoute<RouteProp<RouteParams, 'FollowTradeForm'>>();
	const { tradeId, userId } = route.params;

	const handleSubmitForm = async (values: FormValues) => {
		let formData = new FormData();
		const newImageUri = 'file:///' + image?.uri.split('file:/').join('');
		formData.append('price', values.price);
		formData.append('amount', values.amount);
		formData.append('image', {
			uri: image?.uri,
			type: 'image/jpeg',
			name: image?.uri.split('/').pop(),
		});
		try {
			const res = await fetch(
				`${Constants.manifest.extra.API_URL}/api/userTrades/${tradeId}/${userId}`,
				{
					body: formData,
					method: 'POST',
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			if (res.ok) {
				return navigation.navigate('Your Trades');
			} else {
				const error = await res.json();
				console.log(error);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.inputContainer}>
				<Formik
					/* validationSchema={SignupSchema} */
					initialValues={{
						price: '',
						amount: '',
					}}
					onSubmit={(values) => {
						handleSubmitForm(values);
					}}
				>
					{({ handleChange, errors, touched, handleSubmit, values }) => (
						<View>
							<TextInput
								showSoftInputOnFocus
								focusable
								style={styles.inputs}
								placeholder="Price"
								onChangeText={handleChange('price')}
								value={values.price}
								keyboardType={'numeric'}
								mode="outlined"
							/>
							{errors.price && touched.price ? (
								<Text style={styles.errorText}>{errors.price}</Text>
							) : null}
							<TextInput
								showSoftInputOnFocus
								focusable
								style={styles.inputs}
								placeholder="Number of contracts"
								onChangeText={handleChange('amount')}
								value={values.amount}
								mode="outlined"
								keyboardType={'numeric'}
							/>
							{errors.amount && touched.amount ? (
								<Text style={styles.errorText}>{errors.amount}</Text>
							) : null}
							<ImagePicker image={image} setImage={setImage} />
							<Button
								focusable
								style={styles.submitButton}
								color="#000000"
								mode="contained"
								onPress={handleSubmit}
							>
								Follow
							</Button>
						</View>
					)}
				</Formik>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#121212',
	},
	inputContainer: {
		marginTop: 100,
		flex: 1,
	},
	inputs: {
		width: screenWidth * 0.7,
	},
	welcomeText: {
		alignSelf: 'center',
		fontSize: 25,
	},
	submitButton: {
		marginTop: 50,
		borderRadius: 10,
	},
	signUpText: {
		marginBottom: 130,
	},
	errorText: {
		color: 'red',
		fontSize: 12,
	},
});

export default FollowTradeForm;
