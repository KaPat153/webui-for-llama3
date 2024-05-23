import { WEBUI_BASE_URL } from '$lib/constants';
import { getRequest, jsonRequest } from '$lib/apis/helpers';

export const getBackendConfig = async () => {
	return getRequest(`${WEBUI_BASE_URL}/api/config`);
};

export const getChangelog = async () => {
	return getRequest(`${WEBUI_BASE_URL}/api/changelog`);
};

export const getVersionUpdates = async () => {
	return getRequest(`${WEBUI_BASE_URL}/api/version/updates`);
};

export const getModelFilterConfig = async (token: string) => {
	return getRequest(`${WEBUI_BASE_URL}/api/config/model/filter`, token);
};

export const updateModelFilterConfig = async (
	token: string,
	enabled: boolean,
	models: string[]
) => {
	return jsonRequest(`${WEBUI_BASE_URL}/api/config/model/filter`, token, {
		enabled: enabled,
		models: models
	});
};

export const getWebhookUrl = async (token: string) => {
	const res = await getRequest(`${WEBUI_BASE_URL}/api/webhook`, token);
	return res.url;
};

export const updateWebhookUrl = async (token: string, url: string) => {
	const res = await jsonRequest(`${WEBUI_BASE_URL}/api/webhook`, token, { url });
	return res.url;
};
