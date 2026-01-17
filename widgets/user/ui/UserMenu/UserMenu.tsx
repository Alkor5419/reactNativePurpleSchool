import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Fonts, Gaps, Colors } from '../../../../shared/tokens';
import Avatar from '../../../../entities/user/ui/Avatar/Avatar';
import { User } from '../../../../entities/user/model/user.model';

export default function UserMenu({ user }: { user: User | null }) {
	if (!user) return null;
	return (
		<View style={styles.container}>
			<Avatar image={user.photo ?? null} />
			<Text style={styles.name}>{user.name}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		gap: Gaps.g8,
		marginTop: 30,
		marginBottom: 40,
	},
	name: { fontSize: Fonts.f16, fontFamily: 'FiraSans', color: Colors.white },
});
