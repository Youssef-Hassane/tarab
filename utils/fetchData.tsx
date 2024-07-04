// File: app/search/fetchData.tsx

import { FakeCard } from "@/components/card/FakeCard";

export const fetchDefaultMusic = async () => {
	const response = await fetch(
		`https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&maxResults=50&q=تراكات Official Music Video&type=video`,
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
		`https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet&maxResults=50&type=video`,
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
		`https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&maxResults=50&q=top+music+Egypt&type=video&regionCode=EG&videoCategoryId=10`, // videoCategoryId 10 is for music
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
			`https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&maxResults=50&q=تراكات+music&type=channel`,
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
			`https://www.googleapis.com/youtube/v3/channels?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=statistics&id=${channelIds}`,
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
	const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&maxResults=50&q=${query} Official Music Video&type=video`);
	const data = await response.json();
	return data.items;
};

export const FetchSuggestionsVideos = async (query) => {
	if (!query) return;
	const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&maxResults=50`);
	const data = await response.json();
	return data.items;
};

export const FetchSuggestionsChannels = async (query) => {
	if (!query) return;
	const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${query}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&maxResults=50`);
	const data = await response.json();
	return data.items;
};

export const SearchForChannelsFetch = async (query: string) => {
	if (!query) return [];

	try {
		const searchResponse = await fetch(
			`https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&maxResults=50&q=${query}&type=channel`,
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
			`https://www.googleapis.com/youtube/v3/channels?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=statistics&id=${channelIds}`,
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




/* 

  export const fetchDefaultChannels = async () => {
	const searchResponse = await fetch(
	  `https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&maxResults=50&q=تراكات&type=channel`,
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
	  `https://www.googleapis.com/youtube/v3/channels?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=statistics&id=${channelIds}`,
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

