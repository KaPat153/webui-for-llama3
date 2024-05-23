import { WEBUI_API_BASE_URL } from '$lib/constants';
import { jsonRequest } from '$lib/apis/helpers';

export const setDefaultModels = (token: string, models: string) => {
	return jsonRequest(`${WEBUI_API_BASE_URL}/configs/default/models`, token, { models });
};

export const setDefaultPromptSuggestions = (token: string, promptSuggestions: string) => {
	return jsonRequest(`${WEBUI_API_BASE_URL}/configs/default/suggestions`, token, {
		suggestions: promptSuggestions
	});
};
