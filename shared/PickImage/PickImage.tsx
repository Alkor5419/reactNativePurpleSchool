import { Pressable, Text, StyleSheet, Alert } from 'react-native';
import React from 'react';
import CloudIcon from '../../assets/icons/cloud';
import { Colors, Fonts, Gaps } from '../tokens';
import {
	launchImageLibraryAsync,
	MediaTypeOptions,
	PermissionStatus,
	useMediaLibraryPermissions,
} from 'expo-image-picker';
import FormData from 'form-data';
import { FILE_API } from '../api';
import axios, { AxiosError } from 'axios';
import { UploadResponse } from './PickerImage.interface';
interface PickImageProps {
	onUpload: (uri: string) => void;
	onError: (error: string) => void;
}

export default function PickImage({ onUpload, onError }: PickImageProps) {
	const [libraryPermissions, requestLibraryPermission] = useMediaLibraryPermissions();
	const upload = async () => {
		const isPermissionGranted = await verifyMediaPermissions();
		if (!isPermissionGranted) {
			onError('Недостаточно прав');
		}
		const asset = await pickImage();
		if (!asset) {
			onError('Не выбрано изображение');
			return;
		}
		const uploadedUrl = await uploadToServer(asset.uri, asset.fileName ?? '');
		if (!uploadedUrl) {
			onError('Не удалось загрузить изображение');
			return;
		}
		onUpload(uploadedUrl);
	};
	const verifyMediaPermissions = async () => {
		if (libraryPermissions?.status === PermissionStatus.UNDETERMINED) {
			const res = await requestLibraryPermission();
			return res.granted;
		}
		if (libraryPermissions?.status === PermissionStatus.DENIED) {
			Alert.alert('Недостаточно прав для доступа к камере');
			return false;
		}
		return true;
	};
	const pickImage = async () => {
		const result = await launchImageLibraryAsync({
			mediaTypes: MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.5,
		});
		if (!result.assets) {
			return;
		}
		return result.assets[0];
	};
	const uploadToServer = async (uri: string, fileName: string) => {
		const formData = new FormData();
		formData.append('files', {
			uri,
			name: fileName,
			type: 'image/jpeg',
		});
		try {
			const { data } = await axios.post<UploadResponse>(FILE_API.uploadImage, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			return data.urls.original;
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error);
			}
			return null;
		}
	};
	return (
		<Pressable onPress={upload} style={styles.button}>
			<CloudIcon />
			<Text style={styles.text}>Загрузить изображение</Text>
		</Pressable>
	);
}
const styles = StyleSheet.create({
	button: {
		width: 230,
		height: 58,
		borderRadius: 10,
		backgroundColor: Colors.violetDark,
		paddingHorizontal: 19,
		paddingVertical: 17,
		gap: Gaps.g10,
		alignItems: 'center',
		flexDirection: 'row',
	},
	text: {
		fontFamily: 'FiraSans',
		fontSize: Fonts.f14,
		color: Colors.white,
	},
});
