import React from 'react';
import {
	ActivityIndicator,
	Animated,
	GestureResponderEvent,
	Pressable,
	PressableProps,
	StyleSheet,
	Text,
} from 'react-native';
import { Colors, Fonts, Radius } from '../tokens';

export const Button = ({ text, isLoading, ...props }: PressableProps & { text: string; isLoading?: boolean }) => {
	const animatedValue = new Animated.Value(100);
	const color = animatedValue.interpolate({
		inputRange: [0, 100],
		outputRange: [Colors.primaryHover, Colors.primary],
	});

	const fadeIn = (e: GestureResponderEvent) => {
		Animated.timing(animatedValue, {
			toValue: 0,
			duration: 100,
			useNativeDriver: true,
		}).start();
		props.onPressIn?.(e);
	};
	const fadeOut = (e: GestureResponderEvent) => {
		Animated.timing(animatedValue, {
			toValue: 100,
			duration: 100,
			useNativeDriver: true,
		}).start();
		props.onPressOut?.(e);
	};
	return (
		<Pressable {...props} onPressIn={fadeIn} onPressOut={fadeOut}>
			<Animated.View
				style={{
					...style.button,
					backgroundColor: color,
				}}
			>
				{isLoading ? <ActivityIndicator size="large" color={Colors.white} /> : <Text style={style.text}>{text}</Text>}
			</Animated.View>
		</Pressable>
	);
};

const style = StyleSheet.create({
	button: {
		borderRadius: Radius.r10,
		height: 58,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: Colors.white,
		fontSize: Fonts.f18,
		fontFamily: 'FiraSans',
		fontWeight: 400,
	},
});
