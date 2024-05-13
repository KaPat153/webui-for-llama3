import { OPENAI_API_BASE_URL } from '$lib/constants';
import { promptTemplate } from '$lib/utils';
import { getRequest, jsonRequest, getAPIHeaders } from '$lib/apis/helpers';

export const getOpenAIUrls = async (token: string = '') => {
	const res = await getRequest(`${OPENAI_API_BASE_URL}/urls`, token);
	return res.OPENAI_API_BASE_URLS;
};

export const updateOpenAIUrls = async (token: string = '', urls: string[]) => {
	const res = await jsonRequest(`${OPENAI_API_BASE_URL}/urls/update`, token, { urls });
	return res.OPENAI_API_BASE_URLS;
};

export const getOpenAIKeys = async (token: string = '') => {
	const res = await getRequest(`${OPENAI_API_BASE_URL}/keys`, token);
	return res.OPENAI_API_KEYS;
};

export const updateOpenAIKeys = async (token: string = '', keys: string[]) => {
	const res = await jsonRequest(`${OPENAI_API_BASE_URL}/keys/update`, token, { keys });
	return res.OPENAI_API_KEYS;
};

export const getOpenAIModels = async (token: string = '') => {
	const res = await getRequest(`${OPENAI_API_BASE_URL}/models`, token);
	const models = Array.isArray(res) ? res : res?.data ?? null;

	return models
		? models
				.map((model) => ({ id: model.id, name: model.name ?? model.id, external: true }))
				.sort((a, b) => {
					return a.name.localeCompare(b.name);
				})
		: models;
};

export const getOpenAIModelsDirect = async (
	base_url: string = 'https://api.openai.com/v1',
	api_key: string = ''
) => {
	let error = null;

	const res = await fetch(`${base_url}/models`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${api_key}`
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.catch((err) => {
			console.log(err);
			error = `OpenAI: ${err?.error?.message ?? 'Network Problem'}`;
			return null;
		});

	if (error) {
		throw error;
	}

	const models = Array.isArray(res) ? res : res?.data ?? null;

	return models
		.map((model) => ({ id: model.id, name: model.name ?? model.id, external: true }))
		.filter((model) => (base_url.includes('openai') ? model.name.includes('gpt') : true))
		.sort((a, b) => {
			return a.name.localeCompare(b.name);
		});
};

export const generateOpenAIChatCompletion = async (
	token: string = '',
	body: object,
	url: string = OPENAI_API_BASE_URL
): Promise<[Response | null, AbortController]> => {
	const controller = new AbortController();
	try {
		const res = await fetch(`${url}/chat/completions`, {
			signal: controller.signal,
			method: 'POST',
			headers: getAPIHeaders(token, 'application/json'),
			body: JSON.stringify(body)
		});
		return [res, controller];
	} catch (err) {
		console.log(err);
		return [null, controller];
	}
};

export const synthesizeOpenAISpeech = async (
	token: string = '',
	speaker: string = 'alloy',
	text: string = '',
	model: string = 'tts-1'
) => {
	return jsonRequest(`${OPENAI_API_BASE_URL}/audio/speech`, token, {
		model,
		input: text,
		voice: speaker
	});
};

export const generateTitle = async (
	token: string = '',
	template: string,
	model: string,
	prompt: string,
	url: string = OPENAI_API_BASE_URL
) => {
	template = promptTemplate(template, prompt);

	console.log(template);

	const res = await jsonRequest(`${url}/chat/completions`, token, {
		model: model,
		messages: [
			{
				role: 'user',
				content: template
			}
		],
		stream: false,
		// Restricting the max tokens to 50 to avoid long titles
		max_tokens: 50
	});

	return res?.choices[0]?.message?.content.replace(/["']/g, '') ?? 'New Chat';
};
