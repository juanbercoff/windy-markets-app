import React, { useState } from 'react';
import {
	Image,
	SafeAreaView,
	StyleSheet,
	View,
	Dimensions,
	KeyboardAvoidingView,
} from 'react-native';
import { Formik } from 'formik';
import { TextInput, Text, Button, Divider } from 'react-native-paper';
import { registerForPushNotificationsAsync } from '../helpers';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
	firstName: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	lastName: Yup.string()
		.min(2, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	// Acepta .con el validator, en el backend no acepta. Revisar
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string()
		.min(6, 'Password should be longer than 6 characters')
		.max(50, 'Too Long!')
		.required('Required'),
	passwordConfirmation: Yup.string().oneOf(
		[Yup.ref('password'), null],
		'Passwords must match'
	),
});

interface DataValues {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

const screenWidth = Dimensions.get('window').width;

export default function Register() {
	const navigation = useNavigation();
	const [isKeyboardAvoidingEnabled, setIsKeyboardAvoidingEnabled] =
		useState(false);

	const loginHandler = async (data: DataValues) => {
		try {
			const token = await registerForPushNotificationsAsync();
			const res = await fetch(
				Constants.manifest.extra.API_URL + '/api/user/register',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						firstName: data.firstName,
						lastName: data.lastName,
						email: data.email,
						password: data.password,
						expo_push_token: token,
					}),
				}
			);
			if (res.ok) return navigation.navigate('Home');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior="position"
			enabled={isKeyboardAvoidingEnabled}
		>
			<View style={styles.inputContainer}>
				<Text style={styles.welcomeText}>Create a new account</Text>
				<Formik
					validationSchema={SignupSchema}
					initialValues={{
						firstName: '',
						lastName: '',
						email: '',
						password: '',
						passwordConfirmation: '',
					}}
					onSubmit={(values) => {
						loginHandler(values);
					}}
				>
					{({ handleChange, errors, touched, handleSubmit, values }) => (
						<View>
							<TextInput
								focusable
								showSoftInputOnFocus
								style={styles.inputs}
								placeholder="First name"
								onChangeText={handleChange('firstName')}
								value={values.firstName}
								mode="outlined"
							/>
							{errors.firstName && touched.firstName ? (
								<Text style={styles.errorText}>{errors.firstName}</Text>
							) : null}
							<TextInput
								focusable
								showSoftInputOnFocus
								style={styles.inputs}
								placeholder="Last name"
								onChangeText={handleChange('lastName')}
								value={values.lastName}
								mode="outlined"
							/>
							{errors.lastName && touched.lastName ? (
								<Text style={styles.errorText}>{errors.lastName}</Text>
							) : null}
							<TextInput
								keyboardType="email-address"
								focusable
								showSoftInputOnFocus
								autoCapitalize="none"
								style={styles.inputs}
								placeholder="Email"
								onChangeText={handleChange('email')}
								value={values.email}
								mode="outlined"
							/>
							{errors.email && touched.email ? (
								<Text style={styles.errorText}>{errors.email}</Text>
							) : null}
							<TextInput
								focusable
								secureTextEntry={true}
								showSoftInputOnFocus
								autoCapitalize="none"
								style={styles.inputs}
								placeholder="Password"
								onChangeText={handleChange('password')}
								value={values.password}
								mode="outlined"
								onFocus={() => setIsKeyboardAvoidingEnabled(true)}
							/>
							{errors.password && touched.password ? (
								<Text style={styles.errorText}>{errors.password}</Text>
							) : null}

							<TextInput
								focusable
								showSoftInputOnFocus
								autoCapitalize="none"
								secureTextEntry={true}
								style={styles.inputs}
								placeholder="Re-Enter password"
								onChangeText={handleChange('passwordConfirmation')}
								value={values.passwordConfirmation}
								mode="outlined"
								onFocus={() => setIsKeyboardAvoidingEnabled(true)}
								onEndEditing={() => setIsKeyboardAvoidingEnabled(false)}
							/>

							{errors.passwordConfirmation && touched.passwordConfirmation ? (
								<Text style={styles.errorText}>
									{errors.passwordConfirmation}
								</Text>
							) : null}
							<Button
								style={styles.submitButton}
								color="#000000"
								mode="contained"
								onPress={handleSubmit}
								focusable
							>
								REGISTER
							</Button>
						</View>
					)}
				</Formik>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
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
