import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { PressableProps } from 'react-native/types_generated/index';
import MenuIcon from '../../../../assets/icons/menu';
import { Colors } from '../../../../shared/tokens';

export const MenuButton = ({
	text,
	isLoading,
	navigation,
	...props
}: PressableProps & { navigation: any; text: string; isLoading?: boolean }) => {
	const [clicked, setClicked] = useState<boolean>(false);
	return (
		<Pressable
			{...props}
			onPress={() => navigation.toggleDrawer()}
			onPressIn={() => setClicked(true)}
			onPressOut={() => setClicked(false)}
		>
			<View style={{ ...styles.button, backgroundColor: clicked ? Colors.violetDark : Colors.blackLight }}>
				<MenuIcon />
			</View>
		</Pressable>
	);
};
const styles = StyleSheet.create({
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		paddingHorizontal: 20,
	},
});
