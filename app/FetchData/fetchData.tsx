// File: app/search/fetchData.tsx

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
  
  export const fetchDefaultChannels = async () => {
	const response = await fetch(
	  `https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&maxResults=50&q=تراكات&type=channel`,
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