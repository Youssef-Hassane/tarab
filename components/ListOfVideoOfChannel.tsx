// File: components/ListOfVideoOfChannel.tsx
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import {
	Context_selectedVideo,
	Context_channelVideos,
	Context_highlightedCardId,
	Context_isDesktop
} from '../app/home';
import { useContext } from "react";
import Image from 'next/image';
import truncateText from '@/utils/truncateText';
import ListOfVideoOfChannelFake from "./ListOfVideoOfChannelFake";
import DownloadButton from "./DownloadButton";

export default function ListOfVideoOfChannel() {

	const isDesktopContext = useContext(Context_isDesktop);
	const isDesktop = isDesktopContext;

	const highlightedCardIdContext = useContext(Context_highlightedCardId);
	const channelVideosContext = useContext(Context_channelVideos);
	const selectedVideoContext = useContext(Context_selectedVideo);

	if (!channelVideosContext || !selectedVideoContext || !highlightedCardIdContext) {
		return null;
	}

	const { channelVideos } = channelVideosContext;
	const { selectedVideo, setSelectedVideo } = selectedVideoContext;

	const { highlightedCardId } = highlightedCardIdContext;

	if (!selectedVideo) {
		return null;
	}



	return (
		<ScrollArea className={` bg-custom-dark ${isDesktop ? "mt-5 w-[500px] rounded-sm h-[97%] pb-[100px]" : "h-[95%] w-auto rounded-sm"}`}>
			<div className="p-2">

				{channelVideos.length > 0 ? (
					channelVideos.map((video: any) => (
						<div
							key={video.id.videoId}
							className={`group flex items-center gap-2 p-2 hover:bg-custom-yellow hover:text-custom-dark rounded-sm cursor-pointer ${highlightedCardId === video.id.videoId ? 'bg-custom-yellow text-custom-dark' : ''}`}
							onClick={() => setSelectedVideo(video)}
						>
							<div className="flex justify-between w-full items-center">
								<div className="flex gap-2">
									{/* <Image
										src={video.snippet.thumbnails.default.url}
										alt={video.snippet.title}
										width={60}
										height={60}
										className="rounded-sm"
									/> */}

									<Avatar className={`rounded-sm w-[60px]  h-[60px]`}>
										<AvatarImage src={video.snippet.thumbnails.default.url} />
										<AvatarFallback></AvatarFallback>
									</Avatar>


									<div className="flex flex-col">

										<span className={`group-hover:text-custom-dark ${highlightedCardId === video.id.videoId ? 'text-custom-dark' : 'text-white'} `}>{truncateText(video.snippet.title, 30)}</span>
										<span className="text-gray-400 text-sm">{video.snippet.channelTitle}</span>
									</div>
								</div>
								<div className={`group-hover:block ${highlightedCardId === video.id.videoId ? 'block' : 'hidden'}`}>
									< DownloadButton type="small" video={video} />
								</div>

							</div>
						</div>
					))
				) : (
					<ListOfVideoOfChannelFake />
				)}

			</div>
			<ScrollBar orientation="vertical" />
		</ScrollArea>
	);
}


// components/ListOfVideoOfChannel.tsx

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatarImage";

export const ListOfVideoOfChannel2 = ({ channelVideos }) => {
	if (!channelVideos || channelVideos.length === 0) {
		return <div>No videos available</div>;
	}

	return (
		<div className="p-2">
			{channelVideos.map((video: any) => (
				<div
					key={video.id.videoId}
					className={`group flex items-center gap-2 p-2 hover:bg-custom-yellow hover:text-custom-dark rounded-sm cursor-pointer`}
					onClick={() => setSelectedVideo(video)}
				>
					{/* <Image
						src={video.snippet.thumbnails.default.url}
						alt={video.snippet.title}
						width={60}
						height={60}
						className="rounded-sm"
					/> */}

					<Avatar className={`rounded-sm w-[60px]  h-[60px]`}>
						<AvatarImage src={video.snippet.thumbnails.default.url} />
						<AvatarFallback></AvatarFallback>
					</Avatar>

					<div className="flex flex-col">
						<span className={`group-hover:text-custom-dark ${highlightedVideoId === video.id.videoId ? 'text-custom-dark' : 'text-white'}`}>
							{truncateText(video.snippet.title, 30)}
						</span>
						<span className="text-gray-400 text-sm">{video.snippet.channelTitle}</span>
					</div>
				</div>
			))}
		</div>
	);
};


