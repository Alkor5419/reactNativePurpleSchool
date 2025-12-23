import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { IAuthResponse, ILoginRequest } from './auth.interfaces';
import axios, { AxiosError } from 'axios';
import { API } from '../api/api';

const storage = createJSONStorage<AuthState>(() => AsyncStorage);
const INITIAL_STATE = {
	accessToken: null,
	isLoading: false,
	error: undefined,
};
export const authAtom = atomWithStorage<AuthState>('auth', INITIAL_STATE, storage);
export const loginAtom = atom(
	get => get(authAtom),
	async (_get, set, { email, password }: ILoginRequest) => {
		set(authAtom, {
			isLoading: true,
			accessToken: null,
			error: undefined,
		});
		try {
			const { data } = await axios.post<IAuthResponse>(API.login, {
				email,
				password,
			});

			set(authAtom, {
				isLoading: false,
				accessToken: data.accessToken,
				error: undefined,
			});
		} catch (error) {
			console.log(error);
			if (error instanceof AxiosError) {
				set(authAtom, {
					isLoading: false,
					accessToken: null,
					error: error.response?.data.message,
				});
			}
		}
	},
);

export const logoutAtom = atom(null, async (_, set) => {
	set(authAtom, INITIAL_STATE);
});

export interface AuthState {
	accessToken: string | null;
	isLoading: boolean;
	error: string | undefined;
}
