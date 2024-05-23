import { WEBUI_API_BASE_URL } from '$lib/constants';
import { deleteRequest, getRequest, jsonRequest } from '$lib/apis/helpers';

export const getUserPermissions = async (token: string) => {
	return getRequest(`${WEBUI_API_BASE_URL}/users/permissions/user`, token);
};

export const updateUserPermissions = async (token: string, permissions: object) => {
	return jsonRequest(`${WEBUI_API_BASE_URL}/users/permissions/user`, token, permissions);
};

export const updateUserRole = async (token: string, id: string, role: string) => {
	return jsonRequest(`${WEBUI_API_BASE_URL}/users/update/role`, token, { id, role });
};

export const getUsers = async (token: string) => {
	const res = await getRequest(`${WEBUI_API_BASE_URL}/users/`, token);
	return res || [];
};

export const getUserById = async (token: string, userId: string) => {
	let error = null;

	const res = await fetch(`${WEBUI_API_BASE_URL}/users/${userId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = err.detail;
			return null;
		});

	if (error) {
		throw error;
	}

	return res;
};

export const deleteUserById = async (token: string, userId: string) => {
	return deleteRequest(`${WEBUI_API_BASE_URL}/users/${userId}`, token);
};

type UserUpdateForm = {
	profile_image_url: string;
	email: string;
	name: string;
	password: string;
};

export const updateUserById = async (token: string, userId: string, user: UserUpdateForm) => {
	return jsonRequest(`${WEBUI_API_BASE_URL}/users/${userId}/update`, token, {
		profile_image_url: user.profile_image_url,
		email: user.email,
		name: user.name,
		password: user.password !== '' ? user.password : undefined
	});
};
