import ChannelName from "@/components/ChannelName";
import NameOfSong from "@/components/NameOfSong";





export default function CardInformation({ item, where }) {



	return (
		<div className="w-full pt-2 flex flex-col text-start">
			<NameOfSong item={item} where={where}/>
			<ChannelName item={item} />
		</div>
	);
};