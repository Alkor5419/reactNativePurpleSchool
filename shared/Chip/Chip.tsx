import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors, Fonts, Radius } from '../tokens';

export default function Chip({ text }: { text: string }) {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{text}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderColor: Colors.border,
		borderRadius: Radius.r17,
		borderWidth: 1,
	},
	text: { fontFamily: 'FiraSans', fontSize: Fonts.f14, color: Colors.white, fontWeight: 400 },
});
