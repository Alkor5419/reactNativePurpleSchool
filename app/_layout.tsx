import React from 'react';
import { Stack } from 'expo-router';
import { Colors } from '../shared/tokens';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Notification } from '../shared/Notification/Notification';

export default function RootLayout() {
	return (
		<SafeAreaProvider>
			<Notification />
			<StatusBar style="light" />
			<Stack
				screenOptions={{
					headerShown: false,
					statusBarBackgroundColor: Colors.black,
					contentStyle: {
						backgroundColor: Colors.black,
					},
				}}
			>
				<Stack.Screen name="login" />
				<Stack.Screen
					name="restore"
					options={{
						presentation: 'modal',
					}}
				/>
			</Stack>
		</SafeAreaProvider>
	);
}
