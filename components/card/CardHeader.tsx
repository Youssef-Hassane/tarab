import Image from 'next/image';
import { CardHeader } from '@/components/ui/card';
import CardIconButton from '@/components/card/CardIconButton';
import FavoriteButton from '@/components/FavoriteButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';




export default function CardHeaderInfo({ item, where }) {


	if (where === "try") {
		return (
			<CardHeader className="text-white p-0 relative">
				<Image
					src={item.snippet.thumbnails.high.url}
					alt={item.snippet.title}
					className="rounded-sm"
					width={500}
					height={500}
					priority
				/>
				<CardIconButton item={item} where={where} />
				<FavoriteButton item={item} />
			</CardHeader>
		)
	}


	if (where === "artists") {
		return (
			<CardHeader className="text-white p-0 relative">
				<Avatar className='h-[150px] w-[150px] p-0 m-0'>
					<AvatarImage src={item.snippet.thumbnails.high.url} />
					<AvatarFallback></AvatarFallback>
				</Avatar>
				<CardIconButton item={item} where={where} />
				{/* <FavoriteButton item={item} /> */}
			</CardHeader>
		)

	}

}