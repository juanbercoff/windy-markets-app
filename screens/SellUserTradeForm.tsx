import React from 'react';
import { Formik } from 'formik';
import { TextInput, Text, Button } from 'react-native-paper';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';
import Constants from 'expo-constants';
import { UserTrade } from '../types/types';
import { userTradeText } from '../helpers';

interface Props {}

interface FormValues {
	closePrice: string;
}

//move to Home
type RouteParams = {
	SellTradeForm: {
		trade: UserTrade;
	};
};

const screenWidth = Dimensions.get('window').width;

const SellUserTradeForm: React.FC<Props> = () => {
	const { colors } = useTheme();
	const navigation = useNavigation();
	const route = useRoute<RouteProp<RouteParams, 'SellTradeForm'>>();
	const { trade } = route.params;

	const handleSubmitForm = async (values: FormValues) => {
		const res = await fetch(
			`${Constants.manifest.extra.API_URL}/api/userTrades/close/${trade.id}`,
			{
				body: JSON.stringify({
					closePrice: values.closePrice,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'PUT',
			}
		);
		const result = await res.json();
		console.log(result);
		navigation.navigate('YOUR TRADES');
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.inputContainer}>
				<Text style={styles.tradeText}>{userTradeText(trade)}</Text>
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
								placeholder="Sell price"
								onChangeText={handleChange('closePrice')}
								theme={{ colors: { text: colors.formText } }}
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
		alignSelf: 'center',
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
	tradeText: {
		fontSize: 14,
		paddingBottom: 10,
	},
});

export default SellUserTradeForm;
