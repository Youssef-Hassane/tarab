// File: components/suggestions.tsx
import Image from 'next/image';
import truncateText from '@/utils/truncateText';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatarImage';


export default function ListOfSuggestions({ suggestion }) {

	return (
		<div className="flex justify-between w-full items-center">
			<div className="flex gap-2">
				{suggestion.snippet?.thumbnails?.default?.url && (
					<>
						{/* <Image
						src={suggestion.snippet.thumbnails.default.url}
						alt={suggestion.snippet.title || 'No Title'}
						width={60}
						height={60}
						className="rounded-sm"
					/> */}

						<Avatar className={`rounded-sm w-[60px]  h-[60px]`}>
							<AvatarImage src={suggestion.snippet.thumbnails.default.url} />
							<AvatarFallback></AvatarFallback>
						</Avatar>
					</>
				)}
				<div className="flex flex-col">
					<span className="group-hover:text-custom-dark">
						{truncateText(suggestion.snippet?.title || 'No Title', 30)}
					</span>
					<span className="text-gray-400 text-sm">
						{suggestion.snippet?.channelTitle || 'Unknown Channel'}
					</span>
				</div>
			</div>
		</div>
	);
}
