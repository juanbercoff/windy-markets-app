import React from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

const Profile = () => {
	const { colors } = useTheme();
	return (
		<View style={styles.container}>
			<List.Subheader style={styles.title}>Profile</List.Subheader>
			<Divider focusable />
			<List.Section focusable>
				<List.Item title="FAQ" onPress={() => console.log('asd')} />
				<Divider focusable />
				<List.Item title="Change password" onPress={() => console.log('asd')} />
				<Divider focusable />
				<List.Item title="Logout" onPress={() => console.log('asd')} />
			</List.Section>
		</View>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#121212',
	},
	title: {
		textAlign: 'center',
	},
});
