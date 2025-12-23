import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import CloseIcon from '../../../../assets/icons/close';
import { DrawerNavigationProp } from '@react-navigation/drawer';

export const CloseDrawer = (navigation: DrawerNavigationProp) => {
	return (
		<Pressable onPress={() => navigation.closeDrawer()}>
			<View style={styles.button}>
				<CloseIcon />
			</View>
		</Pressable>
	);
};
const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		right: 20,
	},
});
