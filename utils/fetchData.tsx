// File: app/FetchData/fetchData.ts
import { getNextApiKey, switchApiKey } from '@/utils/apiKeyManager';

const fetchWithRetry = async (url: string, retries: number = 3): Promise<any> => {
    for (let i = 0; i < retries; i++) {
        const apiKey = getNextApiKey();
        try {
            const response = await fetch(`${url}&key=${apiKey}`, {
                next: {
                    revalidate: 3000,
                },
            });
            if (response.ok) {
                const data = await response.json();
                return data.items;
            } else if (response.status === 403) {
                console.warn(`API key ${apiKey} has exceeded its quota. Switching to the next key.`);
                switchApiKey();
            } else {
                throw new Error(`API request failed with status ${response.status}`);
            }
        } catch (error) {
            console.error(`Attempt ${i + 1} failed: ${error.message}`);
            switchApiKey();
        }
    }
    throw new Error('All API keys have exceeded their quotas.');
};

export const fetchDefaultMusic = async () => {
    const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=تراكات Official Music Video&type=video';
    return await fetchWithRetry(url);
};

export const fetchChannelVideos = async (channelId: string) => {
    const url = `https://www.googleapis.com/youtube/v3/search?channelId=${channelId}&part=snippet&maxResults=50&type=video`;
    return await fetchWithRetry(url);
};

export const fetchTopMusicInEgypt = async () => {
    const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=top+music+Egypt&type=video&regionCode=EG&videoCategoryId=10';
    return await fetchWithRetry(url);
};

export const fetchDefaultChannels = async () => {
    try {
        const searchUrl = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=تراكات+music&type=channel';
        const searchData = await fetchWithRetry(searchUrl);

        if (!searchData || searchData.length === 0) {
            return [];
        }

        const channelIds = searchData.map((channel: any) => channel.id.channelId).join(',');

        const detailsUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelIds}`;
        const detailsData = await fetchWithRetry(detailsUrl);

        const filteredChannels = searchData.filter((channel: any) => {
            const details = detailsData.find((item: any) => item.id === channel.id.channelId);
            return details && details.statistics.subscriberCount > 10000;
        });

        return filteredChannels;
    } catch (error) {
        console.error('An error occurred while fetching channels:', error);
        return [];
    }
};

export const SearchForVideosFetch = async (query: string) => {
    if (!query) return [];
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${query} Official Music Video&type=video`;
    return await fetchWithRetry(url);
};

export const FetchSuggestionsVideos = async (query: string) => {
    if (!query) return [];
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&maxResults=50`;
    return await fetchWithRetry(url);
};

export const FetchSuggestionsChannels = async (query: string) => {
    if (!query) return [];
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${query}&maxResults=50`;
    return await fetchWithRetry(url);
};

export const SearchForChannelsFetch = async (query: string) => {
    if (!query) return [];

    try {
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${query}&type=channel`;
        const searchData = await fetchWithRetry(searchUrl);

        if (!searchData || searchData.length === 0) {
            return [];
        }

        const channelIds = searchData.map((channel: any) => channel.id.channelId).join(',');

        const detailsUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelIds}`;
        const detailsData = await fetchWithRetry(detailsUrl);

        const filteredChannels = searchData.filter((channel: any) => {
            const details = detailsData.find((item: any) => item.id === channel.id.channelId);
            return details && details.statistics.subscriberCount > 1000000;
        });

        return filteredChannels;
    } catch (error) {
        console.error('An error occurred while fetching channels:', error);
        return [];
    }
};



/* // File: app/search/fetchData.tsx

import { FakeCard } from "@/components/card/FakeCard";
import { getNextApiKey } from "./apiKeyManager";

export const fetchDefaultMusic = async () => {
	const response = await fetch(
		`https://www.googleapis.com/youtube/v3/search?key=${getNextApiKey()}&part=snippet&maxResults=50&q=تراكات Official Music Video&type=video`,
		{
			next: {
				revalidate: 3000,
			}
		}
	);
	const data = await response.json();
	return data.items;
};

export const fetchChannelVideos = async (channelId: string) => {
	const response = await fetch(
		`https://www.googleapis.com/youtube/v3/search?key=${getNextApiKey()}&channelId=${channelId}&part=snippet&maxResults=50&type=video`,
		{
			next: {
				revalidate: 3000,
			}
		}
	);
	const data = await response.json();
	return data.items;
};

export const fetchTopMusicInEgypt = async () => {
	const response = await fetch(
		`https://www.googleapis.com/youtube/v3/search?key=${getNextApiKey()}&part=snippet&maxResults=50&q=top+music+Egypt&type=video&regionCode=EG&videoCategoryId=10`, // videoCategoryId 10 is for music
		{
			next: {
				revalidate: 3000,
			}
		}
	);
	const data = await response.json();
	return data.items;
};


export const fetchDefaultChannels = async () => {
	try {
		const searchResponse = await fetch(
			`https://www.googleapis.com/youtube/v3/search?key=${getNextApiKey()}&part=snippet&maxResults=50&q=تراكات+music&type=channel`,
			{
				next: {
					revalidate: 3000,
				},
			}
		);

		if (!searchResponse.ok) {
			throw new Error('Failed to fetch channels');
		}

		const searchData = await searchResponse.json();
		const channels = searchData.items;

		if (!channels || channels.length === 0) {
			return [];
		}

		// Get channel IDs from search results
		const channelIds = channels.map((channel: any) => channel.id.channelId).join(',');

		// Fetch channel details
		const detailsResponse = await fetch(
			`https://www.googleapis.com/youtube/v3/channels?key=${getNextApiKey()}&part=statistics&id=${channelIds}`,
			{
				next: {
					revalidate: 3000,
				},
			}
		);

		if (!detailsResponse.ok) {
			throw new Error('Failed to fetch channel details');
		}

		const detailsData = await detailsResponse.json();

		// Filter channels with more than 1M subscribers
		const filteredChannels = channels.filter((channel: any) => {
			const details = detailsData.items.find((item: any) => item.id === channel.id.channelId);
			return details && details.statistics.subscriberCount > 1000;
		});

		return filteredChannels;
	} catch (error) {
		console.error('An error occurred while fetching channels:', error);
		return [];
	}
};


export const SearchForVideosFetch = async (query: any) => {
	if (!query) return;
	const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${getNextApiKey()}&part=snippet&maxResults=50&q=${query} Official Music Video&type=video`);
	const data = await response.json();
	return data.items;
};

export const FetchSuggestionsVideos = async (query) => {
	if (!query) return;
	const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${getNextApiKey()}&maxResults=50`);
	const data = await response.json();
	return data.items;
};

export const FetchSuggestionsChannels = async (query) => {
	if (!query) return;
	const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${query}&key=${getNextApiKey()}&maxResults=50`);
	const data = await response.json();
	return data.items;
};

export const SearchForChannelsFetch = async (query: string) => {
	if (!query) return [];

	try {
		const searchResponse = await fetch(
			`https://www.googleapis.com/youtube/v3/search?key=${getNextApiKey()}&part=snippet&maxResults=50&q=${query}&type=channel`,
			{
				next: {
					revalidate: 3000,
				},
			}
		);

		if (!searchResponse.ok) {
			throw new Error('Failed to fetch channels');
		}

		const searchData = await searchResponse.json();
		console.log(searchData); // Log API response
		const channels = searchData.items;

		if (!channels || channels.length === 0) {
			return [];
		}

		const channelIds = channels.map((channel: any) => channel.id.channelId).join(',');

		const detailsResponse = await fetch(
			`https://www.googleapis.com/youtube/v3/channels?key=${getNextApiKey()}&part=statistics&id=${channelIds}`,
			{
				next: {
					revalidate: 3000,
				},
			}
		);

		if (!detailsResponse.ok) {
			throw new Error('Failed to fetch channel details');
		}

		const detailsData = await detailsResponse.json();

		const filteredChannels = channels.filter((channel: any) => {
			const details = detailsData.items.find((item: any) => item.id === channel.id.channelId);
			return details && details.statistics.subscriberCount > 1000000;
		});

		return filteredChannels;
	} catch (error) {
		console.error('An error occurred while fetching channels:', error);
		return [];
	}
};


 */

/* 

  export const fetchDefaultChannels = async () => {
	const searchResponse = await fetch(
	  `https://www.googleapis.com/youtube/v3/search?key=${getNextApiKey()}&part=snippet&maxResults=50&q=تراكات&type=channel`,
	  {
		next: {
		  revalidate: 3000,
		}
	  }
	);
	const searchData = await searchResponse.json();
	const channels = searchData.items;
  
	// Get channel IDs from search results
	const channelIds = channels.map((channel: any) => channel.id.channelId).join(',');
  
	// Fetch channel details
	const detailsResponse = await fetch(
	  `https://www.googleapis.com/youtube/v3/channels?key=${getNextApiKey()}&part=statistics&id=${channelIds}`,
	  {
		next: {
		  revalidate: 3000,
		}
	  }
	);
	const detailsData = await detailsResponse.json();
  
	// Filter channels with more than 1M subscribers and have videos
	const filteredChannels = [];
  
	for (const channel of channels) {
	  const details = detailsData.items.find((item: any) => item.id === channel.id.channelId);
	  if (details && details.statistics.subscriberCount > 1000) {
		const videos = await fetchChannelVideos(channel.id.channelId);
		if (videos.length > 0) {
		  filteredChannels.push(channel);
		}
	  }
	}
	return filteredChannels;
}; */

