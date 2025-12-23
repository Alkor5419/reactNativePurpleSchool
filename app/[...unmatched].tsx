import { Image, StyleSheet, Text } from 'react-native';
import React from 'react';
import { Colors } from '../shared/tokens';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UnmatchedCustom() {
	return (
		<SafeAreaView style={styles.content}>
			<Image style={styles.image} source={require('../assets/images/ErrorLogo.png')} resizeMode="contain" />
			<Text style={styles.text}>Ооо... что-то пошло не так. Попробуйте вернуться на главный экран приложения</Text>
			<Link href={'/'}>
				<Text style={styles.link}>На главный экран</Text>
			</Link>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 35,
	},
	image: {
		width: 204,
		height: 282,
	},
	text: {
		color: Colors.white,
		fontFamily: 'FiraSans',
		fontSize: 18,
		fontWeight: 400,
		textAlign: 'center',
		marginTop: 50,
		marginBottom: 50,
	},
	link: {
		color: Colors.link,
		fontFamily: 'FiraSans',
		fontSize: 18,
		fontWeight: 400,
	},
});
