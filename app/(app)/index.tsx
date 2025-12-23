import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSetAtom } from 'jotai';
import { logoutAtom } from '../../entities/auth/model/auth.state';

import { Button } from '../../shared/Button/Button';

export default function MyCourses() {
	const logout = useSetAtom(logoutAtom);

	return (
		<View>
			<Text>111</Text>
			<Button text="Выход" onPress={logout} />
		</View>
	);
}

const styles = StyleSheet.create({});
