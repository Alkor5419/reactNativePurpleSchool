import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { User } from '../../model/user.model';
import { Fonts, Gaps, Colors } from '../../../../shared/tokens';

export default function UserMenu({ user }: { user: User | null }) {
	if (!user) return null;
	return (
		<View style={styles.container}>
			{user.photo ? (
				<Image style={styles.profileImg} source={{ uri: user.photo }} resizeMode="contain" />
			) : (
				<Image style={styles.profileImg} source={require('../../../../assets/profile.png')} resizeMode="contain" />
			)}
			<Text style={styles.name}>{user.name}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	profileImg: {
		height: 70,
		width: 70,
		borderRadius: 35,
	},
	container: {
		alignItems: 'center',
		gap: Gaps.g8,
		marginTop: 30,
		marginBottom: 40,
	},
	name: { fontSize: Fonts.f16, fontFamily: 'FiraSans', color: Colors.white },
});
