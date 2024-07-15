import CardHeaderInfo from "@/components/card/CardHeader";
import CardInformation from "@/components/card/CardInformation";
import Card from "@/components/ui/card";
import { Context_isDesktop, Context_highlightedChannelId, Context_selectedVideo, Context_isDrawerOpen, Context_playing, Context_channelVideos, Context_highlightedCardId } from "../../app/home";
import { useContext } from "react";
import { fetchChannelVideos } from "@/utils/fetchData";


export default function TheCard({ item, where }) {

	const selectedVideoContext = useContext(Context_selectedVideo);
	const isDrawerOpenContext = useContext(Context_isDrawerOpen);
	const playingContext = useContext(Context_playing);
	const channelVideosContext = useContext(Context_channelVideos);
	const highlightedCardIdContext = useContext(Context_highlightedCardId);
	const highlightedChannelIdContext = useContext(Context_highlightedChannelId);

	if (!highlightedChannelIdContext || !selectedVideoContext || !isDrawerOpenContext || !playingContext || !channelVideosContext || !highlightedCardIdContext) {
		return null;
	}

	const { selectedVideo, setSelectedVideo } = selectedVideoContext;
	const { isDrawerOpen, setIsDrawerOpen } = isDrawerOpenContext;
	const { playing, setPlaying } = playingContext;
	const { channelVideos, setChannelVideos } = channelVideosContext;
	const { highlightedCardId, setHighlightedCardId } = highlightedCardIdContext;
	const { highlightedChannelId, setHighlightedChannelId } = highlightedChannelIdContext;

	const handleCardClick = async (video) => {
		setSelectedVideo(video);
		setIsDrawerOpen(true);
		setPlaying(true);
/* 		console.log(video);
 */		const channelVideosData = await fetchChannelVideos(video.snippet.channelId);
		setChannelVideos(channelVideosData);

	};

	const handleCardClickArtist = async (channel: any) => {
		const channelVideosData = await fetchChannelVideos(channel.id.channelId);
		setChannelVideos(channelVideosData);

		if (channelVideosData.length > 0) {
			const lastVideo = channelVideosData[channelVideosData.length - 1];
			setSelectedVideo(lastVideo);
			setIsDrawerOpen(true);
			setPlaying(true);
			setHighlightedChannelId(channel.id.channelId); // Highlight the selected channel card
		}
	};

	const handleCardClickMylist = async (video) => {
		setSelectedVideo(video);
		setIsDrawerOpen(true);
		setPlaying(true);
		const channelVideosData = await fetchChannelVideos(video.snippet.channelId);
		setChannelVideos(channelVideosData);

	};

	const handleCardClickIcon = async (video) => {
		if (selectedVideo?.id === video.id) {
			setPlaying(!playing);
		} else {
			setSelectedVideo(video);
			setPlaying(true);
		}

		const channelVideosData2 = await fetchChannelVideos(video.snippet.channelId);
		setChannelVideos(channelVideosData2);
		setHighlightedCardId(video.id);
	};

	const handleClick = (item, where) => {
		if (where === "try" || where === "MobileTry") {
			return () => handleCardClick(item);
		} else if (where === "artists" || where === "Mobile") {
			return () => handleCardClickArtist(item);
		} else if (where === "mylist") {
			return () => handleCardClickMylist(item);
		}
	};

	const getCardKey = (item, where) => {
		if (where === "try" || where === "MobileTry") {
			return item.id.videoId;
		} else if (where === "artists" || where === "Mobile") {
			return item.id.channelId;
		} else if (where === "mylist") {
			return item.id;
		}
	};

	const getCardClassName = (item, where) => {
		if (where === "try") {
			return `group z-20 w-[170px] h-auto max-h-[230px] bg-custom-dark border-none hover:bg-custom-yellow hover:text-custom-dark rounded-sm ${highlightedCardId === item.id.videoId ? 'bg-custom-yellow text-custom-dark' : ''}`;
		} else if (where === "artists") {
			return `group w-[170px] h-auto max-h-[230px] bg-custom-dark border-none hover:bg-custom-yellow hover:text-custom-dark rounded-sm ${highlightedChannelId === item.id.channelId ? 'bg-custom-yellow text-custom-dark' : ''}`;
		} else if (where === "mylist") {
			return `group z-20 w-[170px] h-auto max-h-[230px] bg-custom-dark border-none hover:bg-custom-yellow hover:text-custom-dark rounded-sm ${highlightedCardId === item.id ? 'bg-custom-yellow text-custom-dark' : ''}`;
		} else if (where === "Mobile") {
			return `group w-auto h-auto max-h-[230px] bg-custom-dark border-[1px] border-gray-700 hover:bg-custom-yellow hover:text-custom-dark rounded-sm ${highlightedChannelId === item.id.channelId ? 'bg-custom-yellow text-custom-dark' : ''}`;
		} else if (where === "MobileTry") {
			return `group w-auto h-auto max-h-[230px] bg-custom-dark border-[1px] border-gray-700 hover:bg-custom-yellow hover:text-custom-dark rounded-sm ${highlightedCardId === item.id.videoId ? 'bg-custom-yellow text-custom-dark' : ''}`;
		}
	};

	const isDesktopContext = useContext(Context_isDesktop);
	const isDesktop = isDesktopContext;

	return (
		<Card
			key={getCardKey(item, where)}
			onClick={handleClick(item, where)}
			className={getCardClassName(item, where)}
		>
			<div className={`p-2 ${isDesktop ? 'flex flex-col' : 'flex flex-row gap-2'}`}>
				<CardHeaderInfo item={item} where={where} />
				<CardInformation item={item} where={where} />
				
			</div>
		</Card>
	);
}