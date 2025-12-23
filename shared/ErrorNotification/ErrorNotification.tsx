import React, { useEffect, useState } from 'react';
import { ErrorNotificationProps } from './ErrorNotification.props';
import { Animated, StyleSheet, Text } from 'react-native';
import { Colors, Fonts } from '../tokens';

export const ErrorNotification = ({ error }: ErrorNotificationProps) => {
	const [isShown, setIsShown] = useState<boolean>(false);
	const animatedValue = new Animated.Value(-100);
	useEffect(() => {
		if (!error) {
			return;
		}
		setIsShown(true);

		const timerId = setTimeout(() => setIsShown(false), 3000);

		return () => {
			clearTimeout(timerId);
		};
	}, [error]);
	const onEnter = () => {
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start();
	};
	if (!isShown) {
		return <></>;
	}

	return (
		<Animated.View
			style={{
				...styles.error,
				transform: [
					{
						translateY: animatedValue,
					},
				],
			}}
			onLayout={onEnter}
		>
			<Text style={styles.errorText}>{error}</Text>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	error: {
		position: 'absolute',
		width: '100%',
		backgroundColor: Colors.red,
		padding: 15,
	},
	errorText: {
		fontSize: Fonts.f16,
		color: Colors.white,
		textAlign: 'center',
	},
});
