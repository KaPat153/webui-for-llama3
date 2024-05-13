import { WEBUI_API_BASE_URL } from '$lib/constants';
import { deleteRequest, getRequest, jsonRequest } from '$lib/apis/helpers';

export const createNewDoc = async (
	token: string,
	collection_name: string,
	filename: string,
	name: string,
	title: string,
	content: object | null = null
) => {
	return jsonRequest(`${WEBUI_API_BASE_URL}/documents/create`, token, {
		collection_name: collection_name,
		filename: filename,
		name: name,
		title: title,
		...(content ? { content: JSON.stringify(content) } : {})
	});
};

export const getDocs = async (token: string = '') => {
	return getRequest(`${WEBUI_API_BASE_URL}/documents/`, token);
};

export const getDocByName = async (token: string, name: string) => {
	return getRequest(`${WEBUI_API_BASE_URL}/documents/name/${name}`, token);
};

type DocUpdateForm = {
	name: string;
	title: string;
};

export const updateDocByName = async (token: string, name: string, form: DocUpdateForm) => {
	return jsonRequest(`${WEBUI_API_BASE_URL}/documents/name/${name}/update`, token, form);
};

type TagDocForm = {
	name: string;
	tags: string[];
};

export const tagDocByName = async (token: string, name: string, form: TagDocForm) => {
	return jsonRequest(`${WEBUI_API_BASE_URL}/documents/name/${name}/tags`, token, form);
};

export const deleteDocByName = async (token: string, name: string) => {
	return deleteRequest(`${WEBUI_API_BASE_URL}/documents/name/${name}/delete`, token);
};
