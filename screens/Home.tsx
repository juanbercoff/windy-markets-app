import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import WindyTrades from './WindyTrades';
import UserTrades from './UserTrades';
import Profile from './Profile';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
const Tab = createMaterialBottomTabNavigator();

const Home: React.FC<{}> = () => {
	return (
		<>
			<StatusBar animated={true} barStyle={'light-content'} />
			<Tab.Navigator
				initialRouteName="Trades today"
				barStyle={{ backgroundColor: '#000000' }}
			>
				<Tab.Screen
					name="Your Trades"
					component={UserTrades}
					options={{
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons name="home" color={color} size={26} />
						),
					}}
				/>
				<Tab.Screen
					name="Trades today"
					component={WindyTrades}
					options={{
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons name="adjust" size={26} color={color} />
						),
					}}
				/>

				<Tab.Screen
					name="Profile"
					component={Profile}
					options={{
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons name="account" size={26} color={color} />
						),
					}}
				/>
			</Tab.Navigator>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#121212',
	},
});

export default Home;
