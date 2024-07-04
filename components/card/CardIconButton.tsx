import { Pause, Play } from "lucide-react";
import { Button } from "../ui/button";
import { Context_highlightedChannelId, Context_selectedVideo, Context_playing, Context_channelVideos, Context_highlightedCardId } from "../../app/home";
import { useContext } from "react";
import { fetchChannelVideos } from "../../utils/fetchData";

export default function CardIconButton({ item, where }) {

	const selectedVideoContext = useContext(Context_selectedVideo);
	const playingContext = useContext(Context_playing);
	const channelVideosContext = useContext(Context_channelVideos);
	const highlightedCardIdContext = useContext(Context_highlightedCardId);
	const highlightedChannelIdContext = useContext(Context_highlightedChannelId);

	if (!highlightedChannelIdContext || !selectedVideoContext || !playingContext || !channelVideosContext || !highlightedCardIdContext) {
		return null;
	}

	const { selectedVideo, setSelectedVideo } = selectedVideoContext;
	const { playing, setPlaying } = playingContext;
	const { channelVideos, setChannelVideos } = channelVideosContext;
	const { highlightedCardId, setHighlightedCardId } = highlightedCardIdContext;
	const { highlightedChannelId, setHighlightedChannelId } = highlightedChannelIdContext;

	const handleCardClickIcon = async (video) => {
		setSelectedVideo(video);
		if (selectedVideo?.id.videoId === video.id.videoId) {
			setPlaying(!playing);
		} else {
			setPlaying(true);
		}

		const channelVideosData2 = await fetchChannelVideos(video.snippet.channelId);
		setChannelVideos(channelVideosData2);
		setHighlightedCardId(video.id.videoId);
	};

	const handleCardClickIconArtists = async (channel) => {
		const channelVideosData = await fetchChannelVideos(channel.id.channelId);
		setChannelVideos(channelVideosData);

		if (channelVideosData.length > 0) {
			const lastVideo = channelVideosData[channelVideosData.length - 1];

			if (selectedVideo?.id.videoId === lastVideo.id.videoId) {
				setPlaying(!playing);
			} else {
				setSelectedVideo(lastVideo);
				setPlaying(true);
			}

			setHighlightedChannelId(channel.id.channelId);
		}
	};

	const handleClick = (item, where) => {
		if (where === "try") {
			return handleCardClickIcon(item);
		} else if (where === "artists") {
			return handleCardClickIconArtists(item);
		}
	};

	const getCardClassName = (item, where) => {
		if (where === "try") {
			return `button-icon bg-custom-yellow rounded-full w-[50px] h-[50px] absolute bottom-[-60px] right-1 flex items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:bottom-1 group-hover:opacity-100 shadow-xl z-50 ${highlightedCardId === item.id.videoId ? 'bg-custom-yellow text-custom-dark bottom-1 opacity-100' : ''}`;
		} else if (where === "artists") {
			return `button-icon bg-custom-yellow rounded-full w-[50px] h-[50px] absolute bottom-[-60px] right-1 flex items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:bottom-1 group-hover:opacity-100 shadow-xl z-50 ${highlightedChannelId === item.id.channelId ? 'bg-custom-yellow text-custom-dark bottom-1 opacity-100' : ''}`;
		}
	};

	const thePlayButton = (where) => {

		if (where === "try") {
			return (
				<div>
					{playing && selectedVideo?.id.videoId === item.id.videoId ? (
						<Pause size={24} color="white" />
					) : (
						<Play size={24} color="white" />
					)}
				</div>
			);
		} else if (where === "artists") {

			return (
				<div>
					{highlightedChannelId === item.id.channelId && playing ? (
						<Pause size={24} color="white" />
					) : (
						<Play size={24} color="white" />
					)}
				</div>
			);
		}
	}


	return (
		<Button
			className={getCardClassName(item, where)}
			onClick={(e) => {
				e.stopPropagation();
				handleClick(item, where);
			}}
		>

			{thePlayButton(where)}

		</Button>
	);
}
