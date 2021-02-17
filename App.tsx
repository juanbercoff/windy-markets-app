import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import Home from './components/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen 
        name="LoginScreen" 
        component={LoginScreen} 
        options={{
          headerShown: false
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
        options={{ title: 'Home' }}
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
