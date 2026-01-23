import { Image, StyleSheet, Text, View } from 'react-native';
import { Input } from '../shared/Input/Input';
import { Colors, Gaps } from '../shared/tokens';
import { Button } from '../shared/Button/Button';
import { ErrorNotification } from '../shared/ErrorNotification/ErrorNotification';
import { useEffect, useState } from 'react';
import { Link, router } from 'expo-router';
import { authAtom, loginAtom } from '../entities/auth/model/auth.state';
import { useAtom, useSetAtom } from 'jotai';

export default function Login() {
	const [form, setForm] = useState<{ email: string; password: string }>({
		email: '',
		password: '',
	});
	const [{ error, accessToken, isLoading }] = useAtom(authAtom);
	const [errorForm, setErrorForm] = useState<string | undefined>();
	const login = useSetAtom(loginAtom);
	useEffect(() => {
		if (accessToken) router.replace('/(app)');
	}, [accessToken]);

	const submit = () => {
		if (!form.email) {
			setErrorForm('Не введен логин');
			return;
		}
		if (!form.password) {
			setErrorForm('Не введен пароль');
			return;
		}

		login(form);
	};
	const handleChangeInput = (e: string, name: string) => {
		setForm(prev => ({ ...prev, [name]: e }));
	};
	return (
		<View style={styles.mainContainer}>
			<ErrorNotification error={error} />
			<View style={styles.container}>
				<Image style={styles.logo} source={require('../assets/logo.png')} resizeMode="contain" />

				<View style={styles.content}>
					<Input
						placeholder="Email"
						autoCapitalize="none"
						value={form.email}
						onChangeText={text => handleChangeInput(text, 'email')}
					/>
					<Input placeholder="Пароль" isPassword onChangeText={text => handleChangeInput(text, 'password')} />
					{errorForm ? <Text style={styles.error}>{errorForm}</Text> : null}
					<Button isLoading={isLoading} text="Войти" onPress={submit} />
				</View>

				<Link href={'/restore'}>
					<Text style={styles.text}>Восстановить пароль</Text>
				</Link>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 55,
	},
	mainContainer: {
		flex: 1,
		backgroundColor: Colors.black,
	},
	content: {
		justifyContent: 'center',
		gap: Gaps.g16,
		marginBottom: 50,
		width: '100%',
	},
	logo: {
		marginBottom: 50,
		width: 220,
	},
	text: {
		color: Colors.white,
		fontFamily: 'FiraSans',
		fontWeight: 400,
	},
	error: {
		color: Colors.red,
	},
});
