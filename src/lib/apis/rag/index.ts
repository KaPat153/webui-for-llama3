import { RAG_API_BASE_URL } from '$lib/constants';
import { formRequest, getRequest, jsonRequest } from '$lib/apis/helpers';

export const getRAGConfig = async (token: string) => {
	return getRequest(`${RAG_API_BASE_URL}/config`, token);
};

type ChunkConfigForm = {
	chunk_size: number;
	chunk_overlap: number;
};

type YoutubeConfigForm = {
	language: string[];
	translation?: string | null;
};

type RAGConfigForm = {
	pdf_extract_images?: boolean;
	chunk?: ChunkConfigForm;
	web_loader_ssl_verification?: boolean;
	youtube?: YoutubeConfigForm;
};

export const updateRAGConfig = async (token: string, payload: RAGConfigForm) => {
	return jsonRequest(`${RAG_API_BASE_URL}/config/update`, token, payload);
};

export const getRAGTemplate = async (token: string) => {
	const res = await getRequest(`${RAG_API_BASE_URL}/template`, token);
	return res.template ?? '';
};

export const getQuerySettings = async (token: string) => {
	return getRequest(`${RAG_API_BASE_URL}/query/settings`, token);
};

type QuerySettings = {
	k: number | null;
	r: number | null;
	template: string | null;
};

export const updateQuerySettings = async (token: string, settings: QuerySettings) => {
	return jsonRequest(`${RAG_API_BASE_URL}/query/settings/update`, token, settings);
};

export const uploadDocToVectorDB = async (token: string, collection_name: string, file: File) => {
	const data = new FormData();
	data.append('file', file);
	data.append('collection_name', collection_name);
	return formRequest(`${RAG_API_BASE_URL}/doc`, token, data);
};

export const uploadWebToVectorDB = async (token: string, collection_name: string, url: string) => {
	return jsonRequest(`${RAG_API_BASE_URL}/web`, token, {
		url: url,
		collection_name: collection_name
	});
};

export const uploadYoutubeTranscriptionToVectorDB = async (token: string, url: string) => {
	return jsonRequest(`${RAG_API_BASE_URL}/youtube`, token, { url });
};

export const queryDoc = async (
	token: string,
	collection_name: string,
	query: string,
	k: number | null = null
) => {
	return jsonRequest(`${RAG_API_BASE_URL}/query/doc`, token, {
		collection_name: collection_name,
		query: query,
		k: k
	});
};

export const queryCollection = async (
	token: string,
	collection_names: string,
	query: string,
	k: number | null = null
) => {
	return jsonRequest(`${RAG_API_BASE_URL}/query/collection`, token, {
		collection_names: collection_names,
		query: query,
		k: k
	});
};

export const scanDocs = async (token: string) => {
	return getRequest(`${RAG_API_BASE_URL}/scan`, token);
};

export const resetVectorDB = async (token: string) => {
	return getRequest(`${RAG_API_BASE_URL}/reset`, token);
};

export const getEmbeddingConfig = async (token: string) => {
	return getRequest(`${RAG_API_BASE_URL}/embedding`, token);
};

type OpenAIConfigForm = {
	key: string;
	url: string;
};

type EmbeddingModelUpdateForm = {
	openai_config?: OpenAIConfigForm;
	embedding_engine: string;
	embedding_model: string;
};

export const updateEmbeddingConfig = async (token: string, payload: EmbeddingModelUpdateForm) => {
	return jsonRequest(`${RAG_API_BASE_URL}/embedding/update`, token, payload);
};

export const getRerankingConfig = async (token: string) => {
	return getRequest(`${RAG_API_BASE_URL}/reranking`, token);
};

type RerankingModelUpdateForm = {
	reranking_model: string;
};

export const updateRerankingConfig = async (token: string, payload: RerankingModelUpdateForm) => {
	return jsonRequest(`${RAG_API_BASE_URL}/reranking/update`, token, payload);
};
