import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import React from 'react';
import { StudentCourseDescription } from '../../../../app/(app)/course/model/course.model';
import Chip from '../../../../shared/Chip/Chip';
import { Button } from '../../../../shared/Button/Button';
import { Colors, Fonts, Gaps, Radius } from '../../../../shared/tokens';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import CourseProgress from '../../../../entities/course/ui/CourseProgress/CourseProgress';

export default function CourseCard({ image, tariffs, title, courseOnDirection, alias }: StudentCourseDescription) {
	return (
		<View style={styles.card}>
			<Image source={{ uri: image }} height={200} style={styles.image} />
			<View style={styles.header}>
				<CourseProgress totalLessons={120} passedLessons={40} />
				<Text style={styles.title}>{title}</Text>
				<View style={styles.chips}>
					{courseOnDirection.length > 0 &&
						courseOnDirection.map(c => <Chip text={c.direction.name} key={c.direction.name} />)}
				</View>
				{tariffs && (
					<MaskedView maskElement={<Text style={styles.tarrif}>Тариф &laquo;{tariffs[0].name}&raquo;</Text>}>
						<LinearGradient colors={['#D77BE5', '#6C38CC']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
							<Text style={{ ...styles.tarrif, ...styles.tarrifWithOpacity }}>
								Тариф &laquo;{tariffs[0].name}&raquo;
							</Text>
						</LinearGradient>
					</MaskedView>
				)}
			</View>

			<View style={styles.footer}>
				<Button text="Купить" onPress={() => Linking.openURL(`https://purpleschool.ru/course/${alias}`)} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: 'column',
		borderRadius: Radius.r10,
		backgroundColor: Colors.blackLight,
	},
	image: {
		borderRadius: Radius.r10,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	title: {
		fontSize: Fonts.f21,
		color: Colors.white,
		fontWeight: 500,
		marginBottom: 12,
	},
	chips: { flexDirection: 'row', gap: Gaps.g10 },
	header: { paddingHorizontal: 24, paddingVertical: 18 },
	footer: {
		backgroundColor: Colors.violetDark,
		paddingHorizontal: 24,
		paddingVertical: 20,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	tarrif: {
		fontSize: Fonts.f16,
		fontFamily: 'FiraSans',
		marginTop: 10,
	},
	tarrifWithOpacity: {
		opacity: 0,
	},
});
