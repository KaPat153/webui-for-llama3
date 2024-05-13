/* eslint-disable @typescript-eslint/no-explicit-any */
import { WEBUI_API_BASE_URL } from '$lib/constants';
import { getRequest, jsonRequest } from '$lib/apis/helpers';

export const createNewModelfile = async (token: string, modelfile: object) => {
	return jsonRequest(`${WEBUI_API_BASE_URL}/modelfiles/create`, token, { modelfile });
};

export const getModelfiles = async (token: string = '') => {
	const res = await getRequest<any[]>(`${WEBUI_API_BASE_URL}/modelfiles/`, token);
	return res.map((modelfile) => modelfile.modelfile);
};

export const getModelfileByTagName = async (token: string, tagName: string) => {
	const res = await jsonRequest(`${WEBUI_API_BASE_URL}/modelfiles/`, token, {
		tag_name: tagName
	});
	return res.modelfile;
};

export const updateModelfileByTagName = async (
	token: string,
	tagName: string,
	modelfile: object
) => {
	return jsonRequest(`${WEBUI_API_BASE_URL}/modelfiles/update`, token, {
		tag_name: tagName,
		modelfile: modelfile
	});
};

export const deleteModelfileByTagName = async (token: string, tagName: string) => {
	return jsonRequest(
		`${WEBUI_API_BASE_URL}/modelfiles/delete`,
		token,
		{ tag_name: tagName },
		'DELETE'
	);
};
