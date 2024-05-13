import { OLLAMA_API_BASE_URL } from '$lib/constants';
import { promptTemplate } from '$lib/utils';
import { formRequest, getRequest, jsonRequest, getAPIHeaders } from '$lib/apis/helpers';

export const getOllamaUrls = async (token: string = '') => {
	const res = await getRequest(`${OLLAMA_API_BASE_URL}/urls`, token);
	return res.OLLAMA_BASE_URLS;
};

export const updateOllamaUrls = async (token: string = '', urls: string[]) => {
	const res = await jsonRequest(`${OLLAMA_API_BASE_URL}/urls/update`, token, { urls });
	return res.OLLAMA_BASE_URLS;
};

export const getOllamaVersion = async (token: string = '') => {
	const url = `${OLLAMA_API_BASE_URL}/api/version`;
	const res = await getRequest(url, token);
	return res?.version ?? '';
};

export const getOllamaModels = async (token: string = '') => {
	const url = `${OLLAMA_API_BASE_URL}/api/tags`;
	const res = await getRequest(url, token);
	return (res.models ?? [])
		.map((model) => ({ id: model.model, name: model.name ?? model.model, ...model }))
		.sort((a, b) => a.name.localeCompare(b.name));
};

// TODO: migrate to backend
export const generateTitle = async (
	token: string = '',
	template: string,
	model: string,
	prompt: string
) => {
	template = promptTemplate(template, prompt);

	console.log(template);

	const body = {
		model: model,
		prompt: template,
		stream: false,
		options: {
			// Restrict the number of tokens generated to 50
			num_predict: 50
		}
	};
	const res = await jsonRequest(`${OLLAMA_API_BASE_URL}/api/generate`, token, body);
	return res?.response.replace(/["']/g, '') ?? 'New Chat';
};

export const generatePrompt = async (token: string = '', model: string, conversation: string) => {
	if (conversation === '') {
		conversation = '[no existing conversation]';
	}

	return jsonRequest(`${OLLAMA_API_BASE_URL}/api/generate`, token, {
		model: model,
		prompt: `Conversation:
		${conversation}

		As USER in the conversation above, your task is to continue the conversation. Remember, Your responses should be crafted as if you're a human conversing in a natural, realistic manner, keeping in mind the context and flow of the dialogue. Please generate a fitting response to the last message in the conversation, or if there is no existing conversation, initiate one as a normal person would.
		
		Response:
		`
	});
};

export const generateEmbeddings = async (token: string = '', model: string, text: string) => {
	return jsonRequest(`${OLLAMA_API_BASE_URL}/api/embeddings`, token, {
		model,
		prompt: text
	});
};

export const generateTextCompletion = async (token: string = '', model: string, text: string) => {
	return jsonRequest(`${OLLAMA_API_BASE_URL}/api/generate`, token, {
		model: model,
		prompt: text,
		stream: true
	});
};

export const generateChatCompletion = async (token: string = '', body: object) => {
	const controller = new AbortController();
	const res = await fetch(`${OLLAMA_API_BASE_URL}/api/chat`, {
		signal: controller.signal,
		method: 'POST',
		headers: getAPIHeaders(token, 'application/json'),
		body: JSON.stringify(body)
	});
	return [res, controller];
};

export const cancelOllamaRequest = async (token: string = '', requestId: string) => {
	return getRequest(`${OLLAMA_API_BASE_URL}/cancel/${requestId}`, token);
};

export const createModel = async (token: string, tagName: string, content: string) => {
	return jsonRequest(`${OLLAMA_API_BASE_URL}/api/create`, token, {
		name: tagName,
		modelfile: content
	});
};

export const deleteModel = async (token: string, tagName: string, urlIdx: string | null = null) => {
	const url = `${OLLAMA_API_BASE_URL}/api/delete${urlIdx !== null ? `/${urlIdx}` : ''}`;
	return jsonRequest(url, token, { name: tagName }, 'DELETE');
};

export const pullModel = async (token: string, tagName: string, urlIdx: string | null = null) => {
	const url = `${OLLAMA_API_BASE_URL}/api/pull${urlIdx !== null ? `/${urlIdx}` : ''}`;
	return jsonRequest(url, token, { name: tagName });
};

export const downloadModel = async (
	token: string,
	download_url: string,
	urlIdx: string | null = null
) => {
	const url = `${OLLAMA_API_BASE_URL}/models/download${urlIdx !== null ? `/${urlIdx}` : ''}`;
	return jsonRequest(url, token, { url: download_url });
};

export const uploadModel = async (token: string, file: File, urlIdx: string | null = null) => {
	const url = `${OLLAMA_API_BASE_URL}/models/upload${urlIdx !== null ? `/${urlIdx}` : ''}`;
	const body = new FormData();
	body.append('file', file);
	return formRequest(url, token, body);
};
