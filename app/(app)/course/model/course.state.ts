import { atom } from 'jotai';
import { API } from '../api/api';
import axios, { AxiosError } from 'axios';
import { StudentCourseDescription } from './course.model';
import { authAtom } from '../../../../entities/auth/model/auth.state';

export const courseAtom = atom<CourseState>({ courses: [], isLoading: false, error: null });

export const loadCourseAtom = atom(
	async get => get(courseAtom),
	async (get, set) => {
		try {
			const { accessToken } = await get(authAtom);
			set(courseAtom, {
				isLoading: true,
				courses: [],
				error: null,
			});
			const { data } = await axios.get<StudentCourseDescription[]>(API.my, {
				params: {
					studentCourse: 'dontMy',
				},
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			set(courseAtom, {
				isLoading: false,
				courses: data,
				error: null,
			});
		} catch (error) {
			console.log(error);
			if (error instanceof AxiosError) {
				set(courseAtom, {
					isLoading: false,
					courses: [],
					error: error.response?.data.message,
				});
			}
		}
	},
);
export interface CourseState {
	courses: StudentCourseDescription[];
	isLoading: boolean;
	error: string | null;
}
