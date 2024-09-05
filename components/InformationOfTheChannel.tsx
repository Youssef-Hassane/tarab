import Image from 'next/image';
import { ScrollArea } from './ui/scroll-area';
import { Context_selectedVideo, Context_isDesktop } from '../app/home';
import { useContext } from 'react';
import { DrawerTitle } from './ui/drawer';
import DownloadButton from './DownloadButton';
import truncateText from '@/utils/truncateText';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatarImage';


export default function InformationOfTheChannel() {

	const selectedVideoContext = useContext(Context_selectedVideo);

	const isDesktopContext = useContext(Context_isDesktop);
	const isDesktop = isDesktopContext;

	if (!selectedVideoContext) {
		return null;
	}

	const { selectedVideo, setSelectedVideo } = selectedVideoContext;



	if (!selectedVideo) {
		return null;
	}

	if (!isDesktop) {
		return (
			<div className=" w-auto bg-custom-dark h-auto rounded-sm">
				{selectedVideo && (
					<div className="flex flex-row items-center bg-custom-dark p-3 text-start gap-2 rounded-sm">
						{/* <Image
							src={selectedVideo.snippet.thumbnails.high.url}
							alt={selectedVideo.snippet.title}
							className="rounded-sm w-[60px]"
							width={300}
							height={300}
							priority
						/> */}

						<Avatar className={`rounded-sm w-[60px] h-[300px]`}>
							<AvatarImage src={selectedVideo.snippet.thumbnails.high.url} />
							<AvatarFallback></AvatarFallback>
						</Avatar>

						<div className='flex flex-col'>
							<DrawerTitle className="text-white text-[12px]">{truncateText(selectedVideo.snippet.title, 35)}</DrawerTitle>
							<p className="text-gray-400  text-[10px]">{selectedVideo.snippet.channelTitle}</p>
						</div>
					</div>
				)}
			</div>
		);
	};

	return (
		<ScrollArea className="mt-5 w-[500px] bg-custom-dark rounded-sm h-[97%] pb-[100px]">
			{selectedVideo && (
				<div className="flex flex-col items-center bg-custom-dark p-6 text-start">
					{/* <Image
						src={selectedVideo.snippet.thumbnails.high.url}
						alt={selectedVideo.snippet.title}
						className="rounded-sm"
						width={300}
						height={300}
						priority
					/> */}

					<Avatar className={`rounded-sm w-[300px]  h-[300px]`}>
						<AvatarImage src={selectedVideo.snippet.thumbnails.high.url} />
						<AvatarFallback></AvatarFallback>
					</Avatar>

					<DrawerTitle className="text-white text-2xl mt-4">{selectedVideo.snippet.title}</DrawerTitle>
					<p className="text-white mt-2 ">{selectedVideo.snippet.channelTitle}</p>
					<p className="text-gray-400 mt-2">{selectedVideo.snippet.description}</p>
					<DownloadButton type="normal" video={"video"} />
				</div>
			)}
		</ScrollArea>
	)

}