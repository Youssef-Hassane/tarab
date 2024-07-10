import Image from 'next/image';
import { CardHeader } from '@/components/ui/card';
import CardIconButton from '@/components/card/CardIconButton';
import FavoriteButton from '@/components/FavoriteButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useContext } from 'react';
import {Context_isDesktop} from "@/app/home"




export default function CardHeaderInfo({ item, where }) {

	const isDesktopContext = useContext(Context_isDesktop);
	const isDesktop = isDesktopContext;

	if (where === "try" || where ==="MobileTry") {
		return (
			<CardHeader className="text-white p-0 relative">
				<Image
					src={item.snippet.thumbnails.high.url}
					alt={item.snippet.title}
					className={`rounded-sm ${isDesktop ? "" : "h-[40px] w-[40px]"}`}
					width={500}
					height={500}
					priority
				/>
				{isDesktop ? <CardIconButton item={item} where={where} /> : null}
				<div className={`${isDesktop ? "" : "absolute -right-[155px] -top-[5px]"}`}><FavoriteButton item={item} /></div>
			</CardHeader>
		)
	}


	if (where === "artists" || where === "Mobile") {
		return (
			<CardHeader className="text-white p-0 relative ">
				<Avatar className={` p-0 m-0 ${isDesktop ? "h-[150px] w-[150px]" : "h-[40px] w-[40px]"}`}>
					<AvatarImage src={item.snippet.thumbnails.high.url} />
					<AvatarFallback></AvatarFallback>
				</Avatar>
				{isDesktop ? <CardIconButton item={item} where={where} /> : null}
				
				{/* <FavoriteButton item={item} /> */}
			</CardHeader>
		)

	}

}