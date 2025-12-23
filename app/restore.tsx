import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link, Stack } from 'expo-router';
import { Colors } from '../shared/tokens';

export default function Restore() {
	return (
		<View>
			<Stack.Screen options={{ title: 'Восстановить пароль' }} />
			<Link href={'/'}>
				<Text style={styles.text}>Restore</Text>
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		color: Colors.white,
		fontFamily: 'FiraSans',
		fontWeight: 400,
	},
});
