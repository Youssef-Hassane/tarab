// File: utils/apiKeyManager.ts
let apiKeys = process.env.NEXT_PUBLIC_YOUTUBE_API_KEYS?.split(',') || [];
let currentKeyIndex = 0;

export const getNextApiKey = () => {
    if (apiKeys.length === 0) {
        throw new Error('No API keys available');
    }
    const apiKey = apiKeys[currentKeyIndex];
	console.log(apiKey);
    return apiKey;
};

export const switchApiKey = () => {
    currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
};
