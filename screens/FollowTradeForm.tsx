import React from 'react';
import { Formik } from 'formik';
import { TextInput, Text, Button } from 'react-native-paper';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, StyleSheet, Dimensions } from 'react-native';

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
	const route = useRoute<RouteProp<RouteParams, 'FollowTradeForm'>>();
	const { tradeId, userId } = route.params;
	const handleSubmitForm = async (values: FormValues) => {
		await fetch(
			`http://192.168.0.115:3000/api/userTrades/${tradeId}/${userId}`,
			{
				body: JSON.stringify({
					price: values.price,
					amount: values.amount,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			}
		);
		navigation.navigate('Trades today');

		//const result = await res.json();
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
