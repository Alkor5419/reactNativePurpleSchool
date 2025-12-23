import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { Colors, Gaps } from '../../../../shared/tokens';
import { CustomLink } from '../../../../shared/CustomLink/CustomLink';
import { CloseDrawer } from '../../../../features/layout/ui/CloseDrawer/CloseDrawer';
import { useAtom, useSetAtom } from 'jotai';
import { logoutAtom } from '../../../auth/model/auth.state';
import { loadProfileAtom } from '../../../user/model/user.state';
import UserMenu from '../../../user/ui/UserMenu/UserMenu';
import ProfileIcon from '../../../../assets/icons/profile';
import HatIcon from '../../../../assets/icons/hat';
import MenuItem from '../MenuItem/MenuItem';
const MENU = [
	{ text: 'Профиль', icon: <ProfileIcon />, path: 'profile' },
	{ text: 'Курсы', icon: <HatIcon />, path: 'index' },
];
export default function CustomDrawer(props: DrawerContentComponentProps) {
	const logout = useSetAtom(logoutAtom);
	const [profile, loadProfile] = useAtom(loadProfileAtom);

	useEffect(() => {
		loadProfile();
	}, []);
	useEffect(() => {
		console.log(profile);
	}, [profile]);
	return (
		<DrawerContentScrollView contentContainerStyle={styles.scrollView} {...props}>
			<View style={styles.content}>
				<CloseDrawer {...props.navigation} />
				<UserMenu user={profile.profile} />
				{MENU.map(menu => (
					<MenuItem drawer={props} {...menu} key={menu.path} />
				))}
			</View>
			<View style={styles.footer}>
				<CustomLink onPress={() => logout()} text="Выход" href={'/login'} />
				<Image style={styles.logo} source={require('../../../../assets/logo.png')} resizeMode="contain" />
			</View>
		</DrawerContentScrollView>
	);
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: Colors.black,
	},
	content: {
		flex: 1,
	},
	footer: {
		gap: Gaps.g50,
		alignItems: 'center',
		marginBottom: 40,
	},
	logo: {
		width: 160,
	},
});
