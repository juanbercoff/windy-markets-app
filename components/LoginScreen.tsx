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

const screenWidth = Dimensions.get('window').width;

interface LoginResponse {
	token: string;
	role: string;
	userId: string;
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
	const [visible, setVisible] = React.useState(false);

	const showDialog = () => setVisible(true);

	const hideDialog = () => setVisible(false);

	const loginHandler = (data) => {
		//TODO input validation
		return fetch('http://192.168.0.115:3000/api/user/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: 'test@test.com', password: 'testest' }),
		})
			.then((res) => {
				if (res.status == 200) {
					return res.json();

					console.log('token stored ' + res.headers.map['token']);
				} else {
					return showDialog();
				}
			})
			.then((data) => {
				storeResponse(data);

				navigation.navigate('Home');
			})
			.catch((err) => console.log(err));
	};

	return (
		<KeyboardAvoidingView style={styles.container} behavior="position">
			<StatusBar animated={true} barStyle={'light-content'} />
			<Image style={styles.logo} source={require('../assets/logoBlack.png')} />
			<View style={styles.inputContainer}>
				<Text style={styles.welcomeText}>Welcome!</Text>
				<Formik
					initialValues={{ email: '', password: '' }}
					onSubmit={(values) => {
						loginHandler(values);
					}}
				>
					{(props) => (
						<View>
							<TextInput
								style={styles.inputs}
								placeholder="Your email"
								onChangeText={props.handleChange('email')}
								value={props.values.email}
								mode="outlined"
								showSoftInputOnFocus
								focusable
							/>
							<TextInput
								style={styles.inputs}
								showSoftInputOnFocus
								focusable
								placeholder="Your password"
								onChangeText={props.handleChange('password')}
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
			<Portal>
				<Dialog visible={visible} onDismiss={hideDialog}>
					<Dialog.Content>
						<Paragraph>Wrong username or password</Paragraph>
					</Dialog.Content>
					<Dialog.Actions>
						<Button focusable onPress={hideDialog}>
							Ok
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
			<View style={styles.signUpTextContainer}>
				<Text>Don't have an account?</Text>
				<Text
					style={styles.signUpText}
					onPress={() => navigation.navigate('RegisterScreen')}
				>
					{' '}
					Sign Up
				</Text>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 150,
		backgroundColor: '#121212',
	},
	logo: {
		height: 131,
		width: 84,
		alignSelf: 'center',
	},
	inputContainer: {
		marginTop: 50,
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
	signUpTextContainer: {
		marginTop: 100,
		flex: 1,
		flexDirection: 'row',
		alignSelf: 'center',
	},
	signUpText: {
		fontWeight: 'bold',
		color: '#FFF',
	},
});
