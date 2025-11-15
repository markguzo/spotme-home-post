import OpenAI from "openai";

let openaiClient: OpenAI | null = null;

export const getOpenAIClient = (): OpenAI | null => {
  if (openaiClient) {
    return openaiClient;
  }

  const apiKey = localStorage.getItem("openai_api_key");
  if (!apiKey) {
    return null;
  }

  openaiClient = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true, // Note: In production, use a backend proxy
  });

  return openaiClient;
};

export const clearOpenAIClient = () => {
  openaiClient = null;
};

export const hasApiKey = (): boolean => {
  return !!localStorage.getItem("openai_api_key");
};

