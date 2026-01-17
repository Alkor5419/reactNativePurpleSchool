import React from 'react';
import { Redirect } from 'expo-router';
import { authAtom } from '../../entities/auth/model/auth.state';
import { useAtomValue } from 'jotai';
import { Drawer } from 'expo-router/drawer';
import { Colors, Fonts } from '../../shared/tokens';
import { MenuButton } from '../../features/layout/ui/MenuButton/MenuButton';
import CustomDrawer from '../../widgets/layout/ui/CustomDrawer/CustomDrawer';

export default function AppLayout() {
	const { accessToken } = useAtomValue(authAtom);
	if (!accessToken) {
		return <Redirect href="/login" />;
	}
	return (
		<Drawer
			drawerContent={props => <CustomDrawer {...props} />}
			screenOptions={({ navigation }) => ({
				headerStyle: {
					backgroundColor: Colors.blackLight,
				},
				headerTitleStyle: {
					color: Colors.white,
					fontFamily: 'FiraSans',
					fontSize: Fonts.f20,
				},
				headerLeft: () => {
					return <MenuButton navigation={navigation} />;
				},
				headerTitleAlign: 'center',
				sceneStyle: {
					backgroundColor: Colors.black,
				},
			})}
		>
			<Drawer.Screen name="index" options={{ title: 'Мои курсы' }} />
			<Drawer.Screen name="profile" options={{ title: 'Профиль' }} />
		</Drawer>
	);
}
