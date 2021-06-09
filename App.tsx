import React, { useEffect } from 'react';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Home from './screens/Home';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FollowTradeForm from './screens/FollowTradeForm';
import SellUserTradeForm from './screens/SellUserTradeForm';
import WindyTrades from './screens/WindyTrades';
import TradeImage from './screens/TradeImage';

const Stack = createStackNavigator();

const theme = {
	...DefaultTheme,
	roundness: 2,
	dark: true,
	colors: {
		...DefaultTheme.colors,
		primary: '#000000',
		accent: '#000000',
		background: '#fff',
		text: '#c4c4c4',
		surface: '#000000',
	},
};

export default function App() {
	return (
		<NavigationContainer theme={DarkTheme}>
			<PaperProvider theme={theme}>
				<Stack.Navigator initialRouteName="LoginScreen">
					<Stack.Screen
						name="LoginScreen"
						component={LoginScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="RegisterScreen"
						component={RegisterScreen}
						options={{ title: 'Register' }}
					/>
					<Stack.Screen
						name="Home"
						component={Home}
						options={{ title: 'Home', headerShown: false }}
					/>
					<Stack.Screen
						name="WindyTrades"
						component={WindyTrades}
						options={{ title: 'Windy', headerShown: false }}
					/>
					<Stack.Screen
						name="FollowTradeForm"
						component={FollowTradeForm}
						options={{
							title: 'Follow Trade',
							headerShown: true,
							headerStyle: {
								backgroundColor: '#1E1E1E',
							},
							headerTintColor: '#fff',
						}}
					/>
					<Stack.Screen
						name="SellUserTradeForm"
						component={SellUserTradeForm}
						options={{
							title: 'Sell Trade',
							headerShown: true,
							headerStyle: {
								backgroundColor: '#1E1E1E',
							},
							headerTintColor: '#fff',
						}}
					/>
					<Stack.Screen
						name="TradeImage"
						component={TradeImage}
						options={{
							title: 'Trade Image',
							headerShown: true,
							headerStyle: {
								backgroundColor: '#1E1E1E',
							},
							headerTintColor: '#fff',
						}}
					/>
				</Stack.Navigator>
			</PaperProvider>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
