// File: app/home.tsx
'use client';
import TopArtists from "@/components/Home/TopArtists";
import TopSongs from "@/components/Home/TopSongs";
import { Separator } from "@/components/ui/separator";
import MyList from '../mylist/page';


export default function HomePage() {

	return (
		<div className="bg-red-500 h-[100%] w-[100%] ">
			<div className="bg-custom-dark h-auto">
				<TopArtists />
			</div>
			<Separator />
			<div className="bg-custom-dark h-[320px]">
				<TopSongs />
			</div>
			<Separator />
			<div className='bg-custom-dark p-4 h-[100%]'>
				<MyList where={"home"} />
			</div>
		</div>
	);
}
