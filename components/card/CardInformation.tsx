import ChannelName from "@/components/ChannelName";
import NameOfSong from "@/components/NameOfSong";
import { Context_isDesktop } from "@/app/home";
import { useContext } from "react";
import FavoriteButton from "../FavoriteButton";




export default function CardInformation({ item, where }) {

	const isDesktopContext = useContext(Context_isDesktop);
	const isDesktop = isDesktopContext;

	return (
		<div>
			<div className={` ${isDesktop ? 'pt-2 w-full flex flex-col text-start' : 'items-center'}`}>
				<NameOfSong item={item} where={where} />
				{where === "try" || where === "MobileTry" ? <ChannelName item={item} /> : <p className="text-gray-500 text-[10px]"> Artists</p>} 
			</div>
		</div>
	);
};