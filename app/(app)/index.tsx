import { ActivityIndicator, FlatList, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { courseAtom, loadCourseAtom } from './course/model/course.state';
import CourseCard from '../../widgets/course/ui/CourseCard/CourseCard';
import { Colors, Gaps } from '../../shared/tokens';
import { StudentCourseDescription } from './course/model/course.model';
import { Button } from '../../shared/Button/Button';
import * as Notifications from 'expo-notifications';
export default function MyCourses() {
	const { isLoading, error, courses } = useAtomValue(courseAtom);
	const loadCourse = useSetAtom(loadCourseAtom);

	useEffect(() => {
		loadCourse();
	}, []);

	const renderCourse = ({ item }: { item: StudentCourseDescription }) => {
		return (
			<View style={styles.item}>
				<CourseCard {...item} />
			</View>
		);
	};
	const allowsNotifications = async () => {
		const settings = await Notifications.getPermissionsAsync();

		return settings.granted || settings.ios?.status == Notifications.IosAuthorizationStatus.PROVISIONAL;
	};
	const requestPermissions = async () => {
		return Notifications.requestPermissionsAsync({
			ios: {
				allowAlert: true,
				allowBadge: true,
				allowSound: true,
			},
		});
	};
	const scheduleNotification = async () => {
		const granted = await allowsNotifications();
		if (!granted) {
			await requestPermissions();
		}
		Notifications.scheduleNotificationAsync({
			content: {
				title: 'Курс по typescript',
				body: 'Не забывай учиться каждый день!',
				data: {
					alias: 'typescript',
				},
			},
			trigger: {
				type: 'timeInterval',
				seconds: 5,
			},
		});
	};
	return (
		// <ScrollView>
		// 	<View style={styles.wrapper}>
		// 		{courses.other?.length > 0 && courses.other.map(c => <CourseCard key={c.id} {...c} />)}
		// 	</View>
		// </ScrollView>
		<>
			{isLoading && <ActivityIndicator style={styles.activity} size="large" color={Colors.primary} />}
			<Button text="Напомнить" onPress={scheduleNotification} />
			{courses.other?.length > 0 && (
				<FlatList
					refreshControl={
						<RefreshControl
							tintColor={Colors.primary}
							titleColor={Colors.primary}
							refreshing={isLoading}
							onRefresh={loadCourse}
						/>
					}
					data={courses.other}
					keyExtractor={item => item.id.toString()}
					renderItem={renderCourse}
				/>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'column',
		gap: Gaps.g20,
		padding: 20,
	},
	item: {
		padding: 20,
	},
	activity: {
		marginTop: 30,
	},
});
