import React from 'react';
import { Formik } from 'formik';
import { TextInput, Text, Button } from 'react-native-paper';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, StyleSheet, Dimensions } from 'react-native';

interface Props {}

interface FormValues {
	closePrice: string;
}

//move to Home
type RouteParams = {
	CloseTradeForm: {
		tradeId: number;
	};
};

const screenWidth = Dimensions.get('window').width;

const SellUserTradeForm: React.FC<Props> = () => {
	const navigation = useNavigation();
	const route = useRoute<RouteProp<RouteParams, 'CloseTradeForm'>>();
	const { tradeId } = route.params;
	const handleSubmitForm = async (values: FormValues) => {
		await fetch(`http://192.168.0.115:3000/api/userTrades/close/${tradeId}`, {
			body: JSON.stringify({
				closePrice: values.closePrice,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'PUT',
		});
		//const result = await res.json();
		navigation.navigate('Your Trades');
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.inputContainer}>
				<Formik
					/* validationSchema={SignupSchema} */
					initialValues={{
						closePrice: '',
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
								placeholder="Close price"
								onChangeText={handleChange('closePrice')}
								value={values.closePrice}
								keyboardType={'numeric'}
								mode="outlined"
							/>
							{errors.closePrice && touched.closePrice ? (
								<Text style={styles.errorText}>{errors.closePrice}</Text>
							) : null}

							<Button
								focusable
								style={styles.submitButton}
								color="#000000"
								mode="contained"
								onPress={handleSubmit}
							>
								Sell
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

export default SellUserTradeForm;
