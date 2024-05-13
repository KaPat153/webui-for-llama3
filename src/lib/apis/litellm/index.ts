import { LITELLM_API_BASE_URL } from '$lib/constants';
import { getRequest, jsonRequest } from '$lib/apis/helpers';

export const getLiteLLMModels = async (token: string = '') => {
	const res = await getRequest(`${LITELLM_API_BASE_URL}/v1/models`, token);

	const models = Array.isArray(res) ? res : res?.data ?? null;

	if (!models) {
		return null;
	}
	return models
		.map((model) => ({
			id: model.id,
			name: model.name ?? model.id,
			external: true,
			source: 'LiteLLM'
		}))
		.sort((a, b) => a.name.localeCompare(b.name));
};

export const getLiteLLMModelInfo = async (token: string = '') => {
	const res = await getRequest(`${LITELLM_API_BASE_URL}/model/info`, token);
	return Array.isArray(res) ? res : res?.data ?? null;
};

type AddLiteLLMModelForm = {
	name: string;
	model: string;
	api_base: string;
	api_key: string;
	rpm: string;
	max_tokens: string;
};

export const addLiteLLMModel = async (token: string = '', payload: AddLiteLLMModelForm) => {
	return jsonRequest(`${LITELLM_API_BASE_URL}/model/new`, token, {
		model_name: payload.name,
		litellm_params: {
			model: payload.model,
			...(payload.api_base === '' ? {} : { api_base: payload.api_base }),
			...(payload.api_key === '' ? {} : { api_key: payload.api_key }),
			...(isNaN(parseInt(payload.rpm)) ? {} : { rpm: parseInt(payload.rpm) }),
			...(payload.max_tokens === '' ? {} : { max_tokens: payload.max_tokens })
		}
	});
};

export const deleteLiteLLMModel = async (token: string = '', id: string) => {
	return jsonRequest(`${LITELLM_API_BASE_URL}/model/delete`, token, { id });
};
