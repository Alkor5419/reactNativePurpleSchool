import { Image, StyleSheet } from 'react-native';
import React from 'react';

export default function Avatar({ image }: { image: string | null }) {
	return (
		<>
			{image ? (
				<Image style={styles.profileImg} source={{ uri: image }} resizeMode="contain" />
			) : (
				<Image style={styles.profileImg} source={require('../../../../assets/profile.png')} resizeMode="contain" />
			)}
		</>
	);
}

const styles = StyleSheet.create({
	profileImg: {
		height: 70,
		width: 70,
		borderRadius: 35,
	},
});
