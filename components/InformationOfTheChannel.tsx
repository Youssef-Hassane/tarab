import Image from 'next/image';
import { ScrollArea } from './ui/scroll-area';
import { Context_selectedVideo } from '../app/home';
import { useContext } from 'react';
import { DrawerTitle } from './ui/drawer';
import DownloadButton from './DownloadButton';


export default function InformationOfTheChannel() {

	const selectedVideoContext = useContext(Context_selectedVideo);

	if (!selectedVideoContext) {
		return null;
	}

	const { selectedVideo, setSelectedVideo } = selectedVideoContext;


	if (!selectedVideo) {
		return null;
	}

	return (
		<ScrollArea className="mt-5 w-[500px] bg-custom-dark rounded-sm h-[97%] pb-[100px]">
			{selectedVideo && (
				<div className="flex flex-col items-center bg-custom-dark p-6 text-start">
					<Image
						src={selectedVideo.snippet.thumbnails.high.url}
						alt={selectedVideo.snippet.title}
						className="rounded-sm"
						width={300}
						height={300}
						priority
					/>
					<DrawerTitle className="text-white text-2xl mt-4">{selectedVideo.snippet.title}</DrawerTitle>
					<p className="text-white mt-2 ">{selectedVideo.snippet.channelTitle}</p>
					<p className="text-gray-400 mt-2">{selectedVideo.snippet.description}</p>
					<DownloadButton type="normal" video={"video"}/>
				</div>
			)}
		</ScrollArea>
	)

}