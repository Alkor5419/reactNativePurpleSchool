import { atom } from 'jotai';
import { User } from './user.model';
import { authAtom } from '../../auth/model/auth.state';
import { API } from '../api/api';
import axios, { AxiosError } from 'axios';

export const profileAtom = atom<UserState>({ profile: null, isLoading: false, error: null });

export const updateProfileAtom = atom(
	async get => get(profileAtom),
	async (get, set, { photo }: { photo: string }) => {
		const { accessToken } = await get(authAtom);
		try {
			const { data } = await axios.patch<unknown>(
				API.profile,
				{
					photo,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				},
			);

			set(profileAtom, {
				isLoading: false,
				profile: data,
				error: null,
			});
		} catch (error) {
			console.log(error);
			if (error instanceof AxiosError) {
				set(profileAtom, {
					isLoading: false,
					profile: null,
					error: error.response?.data.message,
				});
			}
		}
	},
);
export const loadProfileAtom = atom(
	async get => get(profileAtom),
	async (get, set) => {
		const { accessToken } = await get(authAtom);
		set(profileAtom, {
			isLoading: true,
			profile: null,
			error: null,
		});
		try {
			const { data } = await axios.get<unknown>(API.profile, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});

			set(profileAtom, {
				isLoading: false,
				profile: data.profile,
				error: null,
			});
		} catch (error) {
			console.log(error);
			if (error instanceof AxiosError) {
				set(profileAtom, {
					isLoading: false,
					profile: null,
					error: error.response?.data.message,
				});
			}
		}
	},
);
export interface UserState {
	profile: User | null;
	isLoading: boolean;
	error: string | null;
}
