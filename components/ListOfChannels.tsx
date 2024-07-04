import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Context_highlightedChannelId, Context_selectedVideo, Context_isDrawerOpen, Context_playing, Context_channelVideos, Context_highlightedCardId } from "../app/home";
import { useContext } from "react";
import { fetchChannelVideos } from "@/utils/fetchData";
import { Pause, Play } from "lucide-react";




export default function ListOfChannels({ item }) {


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


	const handleCardClick = async (item: any) => {
		const channelVideosData = await fetchChannelVideos(item.id.channelId);
		setChannelVideos(channelVideosData);
	
		if (channelVideosData.length > 0) {
		  const lastVideo = channelVideosData[channelVideosData.length - 1];
		  setSelectedVideo(lastVideo);
		  setIsDrawerOpen(true);
		  setPlaying(true);
		  setHighlightedChannelId(item.id.channelId); // Highlight the selected channel card
		}
	  };



	return (


		<div
			key={item.snippet.channelId}
			className={`group flex items-center gap-2 hover:bg-custom-yellow hover:text-custom-dark rounded-sm cursor-pointer ${highlightedChannelId === item.id.channelId ? 'bg-custom-yellow text-custom-dark' : ''} `}
			onClick={() => handleCardClick(item)}
		>
			<div className="p-2 w-full">
				<div className="text-white p-0 flex gap-2 justify-center relative w-full">
					<Avatar className='h-[50px] w-[50px] p-0 m-0'>
						<AvatarImage src={item.snippet.thumbnails.high.url} />
						<AvatarFallback></AvatarFallback>
					</Avatar>
					<div className="w-full text-white pt-2 flex flex-col text-start">
						<span className={`group-hover:text-custom-dark ${highlightedChannelId === item.id.channelId ? 'text-custom-dark' : 'text-white'} `}>{item.snippet.title}</span>
						<h1 className="text-gray-500 text-[12px]">Artist</h1>
					</div>
					<Avatar className="bg-custom-yellow rounded-[100%] h-[50px] w-[50px] absolute bottom-[-60px] right-1 flex items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:bottom-1 group-hover:opacity-100 shadow-lg shadow-custom-dark/50">
						{highlightedChannelId === item.id.channelId && playing ? (
							<Pause size={24} color="white" />
						) : (
							<Play size={24} color="white" />
						)}
					</Avatar>
				</div>

			</div>
		</div>
	)
}