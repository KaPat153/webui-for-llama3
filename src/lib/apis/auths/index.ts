import { WEBUI_API_BASE_URL } from '$lib/constants';
import { deleteRequest, getRequest, jsonRequest } from '$lib/apis/helpers';

export const getSessionUser = async (token: string) => {
	return getRequest(`${WEBUI_API_BASE_URL}/auths/`, token);
};

export const userSignIn = async (email: string, password: string) => {
	return jsonRequest(`${WEBUI_API_BASE_URL}/auths/signin`, '', { email, password });
};

export const userSignUp = async (
	name: string,
	email: string,
	password: string,
	profile_image_url: string
) => {
	return jsonRequest(`${WEBUI_API_BASE_URL}/auths/signup`, '', {
		name,
		email,
		password,
		profile_image_url
	});
};

export const addUser = async (
	token: string,
	name: string,
	email: string,
	password: string,
	role: string = 'pending'
) => {
	return jsonRequest(`${WEBUI_API_BASE_URL}/auths/add`, token, {
		name,
		email,
		password,
		role
	});
};

export const updateUserProfile = async (token: string, name: string, profileImageUrl: string) => {
	return jsonRequest(`${WEBUI_API_BASE_URL}/auths/update/profile`, token, {
		name,
		profile_image_url: profileImageUrl
	});
};

export const updateUserPassword = async (token: string, password: string, newPassword: string) => {
	return jsonRequest(`${WEBUI_API_BASE_URL}/auths/update/password`, token, {
		password,
		new_password: newPassword
	});
};

export const getSignUpEnabledStatus = async (token: string) => {
	return getRequest(`${WEBUI_API_BASE_URL}/auths/signup/enabled`, token);
};

export const getDefaultUserRole = async (token: string) => {
	return getRequest(`${WEBUI_API_BASE_URL}/auths/signup/user/role`, token);
};

export const updateDefaultUserRole = async (token: string, role: string) => {
	return jsonRequest(`${WEBUI_API_BASE_URL}/auths/signup/user/role`, token, { role });
};

export const toggleSignUpEnabledStatus = async (token: string) => {
	return getRequest(`${WEBUI_API_BASE_URL}/auths/signup/enabled/toggle`, token);
};

export const getJWTExpiresDuration = async (token: string) => {
	return getRequest(`${WEBUI_API_BASE_URL}/auths/token/expires`, token);
};

export const updateJWTExpiresDuration = async (token: string, duration: string) => {
	return jsonRequest(`${WEBUI_API_BASE_URL}/auths/token/expires/update`, token, { duration });
};

export const createAPIKey = async (token: string) => {
	const res = await jsonRequest(`${WEBUI_API_BASE_URL}/auths/api_key`, token, {});
	return res.api_key;
};

export const getAPIKey = async (token: string) => {
	const res = await getRequest(`${WEBUI_API_BASE_URL}/auths/api_key`, token);
	return res.api_key;
};

export const deleteAPIKey = async (token: string) => {
	return deleteRequest(`${WEBUI_API_BASE_URL}/auths/api_key`, token);
};
