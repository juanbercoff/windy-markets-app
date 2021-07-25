import React from 'react';
import {
	Image,
	KeyboardAvoidingView,
	StyleSheet,
	View,
	Dimensions,
	StatusBar,
} from 'react-native';
import { Formik } from 'formik';
import {
	TextInput,
	Text,
	Button,
	Portal,
	Dialog,
	Paragraph,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { useTheme } from 'react-native-paper';
import ErrorPortal from '../components/ErrorPortal';

const screenWidth = Dimensions.get('window').width;

interface LoginResponse {
	token: string;
	role: string;
	userId: string;
}

interface LoginData {
	email: string;
	password: string;
}

const storeResponse = async (res: LoginResponse) => {
	try {
		await AsyncStorage.setItem('token', res.token);
		await AsyncStorage.setItem('role', res.role);
		await AsyncStorage.setItem('userId', String(res.userId));
	} catch (e) {
		console.log(e);
	}
};

export default function Login({ navigation }) {
	const { colors } = useTheme();
	const [visible, setVisible] = React.useState(false);

	const showDialog = () => setVisible(true);

	const hideDialog = () => setVisible(false);

	const loginHandler = (data: LoginData) => {
		//TODO input validation
		return fetch(Constants.manifest.extra.API_URL + '/api/user/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: data.email,
				password: data.password,
			}),
		})
			.then((res) => {
				if (res.status == 200) {
					console.log('asd');
					return res.json();
				} else {
					showDialog();
					throw 'access denied';
				}
			})
			.then((data) => {
				storeResponse(data).then(() => navigation.navigate('Home'));
			})
			.catch((err) => console.log(err));
	};

	return (
		<View style={styles.container}>
			<StatusBar animated={true} barStyle={'light-content'} />
			<Image style={styles.logo} source={require('../assets/logoBlack.png')} />
			<Text style={styles.windyMarketContainer}>
				WINDY MARKET OPTION TRADER
			</Text>
			<View style={styles.inputContainer}>
				<Formik
					initialValues={{ email: '', password: '' }}
					onSubmit={(values) => {
						loginHandler(values);
					}}
				>
					{(props) => (
						<View>
							<TextInput
								keyboardType="email-address"
								style={styles.inputs}
								placeholder="Your email"
								autoCapitalize="none"
								onChangeText={props.handleChange('email')}
								theme={{ colors: { text: colors.formText } }}
								value={props.values.email}
								mode="outlined"
								showSoftInputOnFocus
								focusable
							/>
							<TextInput
								style={styles.inputs}
								autoCapitalize="none"
								showSoftInputOnFocus
								focusable
								theme={{ colors: { text: colors.formText } }}
								placeholder="Your password"
								onChangeText={props.handleChange('password')}
								secureTextEntry={true}
								value={props.values.password}
								mode="outlined"
							/>
							<Button
								focusable
								style={styles.submitButton}
								color="#000000"
								mode="contained"
								onPress={props.handleSubmit}
							>
								SIGN IN
							</Button>
						</View>
					)}
				</Formik>
			</View>
			<ErrorPortal
				errorText={'Wrong username or password'}
				visible={visible}
				hideDialog={hideDialog}
			/>
			<View style={styles.signUpTextContainer}>
				<Text>Don't have an account?</Text>
				<Text
					style={styles.signUpText}
					onPress={() => navigation.navigate('RegisterScreen')}
				>
					{' '}
					Create your account
				</Text>
			</View>
			<View style={styles.forgotPasswordContainer}>
				<Text>Forgot your password? </Text>
				<Text style={styles.signUpText}>Create a new one.</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		paddingTop: 100,
		backgroundColor: '#121212',
	},
	logo: {
		height: 131,
		width: 84,
	},
	windyMarketContainer: {
		paddingTop: 20,
		fontSize: 18,
	},
	inputContainer: {
		paddingTop: 30,
	},
	inputs: {
		width: screenWidth * 0.7,
	},
	welcomeText: {
		alignSelf: 'center',
		fontSize: 25,
	},
	submitButton: {
		marginTop: 20,
		borderRadius: 10,
	},
	signUpTextContainer: {
		flexDirection: 'row',
		paddingTop: 20,
	},
	forgotPasswordContainer: {
		flexDirection: 'row',
	},
	signUpText: {
		fontWeight: 'bold',
		color: '#FFF',
	},
});
