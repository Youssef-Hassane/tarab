// File: app/try/fetchData.tsx

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