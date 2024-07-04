import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Image from "next/image";
import { useContext } from "react";
import { Context_favorites, Context_highlightedCardId, Context_selectedVideo } from "@/app/home";
import truncateText from "@/utils/truncateText";



export default function ListOfFavorite() {
	const favoritesContext = useContext(Context_favorites);
	const selectedVideoContext = useContext(Context_selectedVideo);
	const highlightedCardIdContext = useContext(Context_highlightedCardId);
	
	if (!favoritesContext || !selectedVideoContext || !highlightedCardIdContext) {
		return null;
	}

	const { favorites, setFavorites } = favoritesContext;
	const { selectedVideo, setSelectedVideo } = selectedVideoContext;
	const { highlightedCardId, setHighlightedCardId } = highlightedCardIdContext;




	return (
		<ScrollArea className="mt-5 w-[500px] bg-custom-dark rounded-sm h-[97%] pb-[100px]">
			<div className="p-2">

				{favorites.length > 0 ? (
					favorites.map((video: any) => (
						<div
							key={video.id}
							className={`group flex items-center gap-2 p-2 hover:bg-custom-yellow hover:text-custom-dark rounded-sm cursor-pointer ${highlightedCardId === video.id ? 'bg-custom-yellow text-custom-dark' : ''}`}
							onClick={() => setSelectedVideo(video)}
						>
							<Image
								src={video.snippet.thumbnails.default.url}
								alt={video.snippet.title}
								width={60}
								height={60}
								className="rounded-sm"
							/>
							<div className="flex flex-col">

								<span className={`group-hover:text-custom-dark ${highlightedCardId === video.id ? 'text-custom-dark' : 'text-white'} `}>{truncateText(video.snippet.title, 30)}</span>
								<span className="text-gray-400 text-sm">{video.snippet.channelTitle}</span>
							</div>

						</div>
					))
				) : (
					<p className="text-white text-center">No videos available</p>
				)}
			</div>
			<ScrollBar orientation="vertical" />
		</ScrollArea>
	);
};	