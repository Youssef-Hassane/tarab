// File: app/home.tsx
'use client';
import TopArtists from "@/components/Home/TopArtists";
import TopSongs from "@/components/Home/TopSongs";
import { Separator } from "@/components/ui/separator";
import MyList from '../mylist/page';
import { use, useEffect } from "react";
import { useRouter } from 'next/navigation';


export default function HomePage() {
	const router = useRouter();

	useEffect(() => {
		router.refresh();
	}, []);

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
