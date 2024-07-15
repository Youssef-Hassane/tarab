// File: app/home.tsx
'use client';

import { redirect } from 'next/navigation';
import TopArtists from "@/components/Home/TopArtists";
import TopArtistsMobile from "@/components/Home/TopArtistsMobile";
import TopSongs from "@/components/Home/TopSongs";
import { Separator } from "@/components/ui/separator";
import { cookies } from 'next/headers';
import MyList from '../mylist/page';
import { useContext } from 'react';
import { Context_isDesktop } from '../home';

export default function HomePage() {
	const isDesktopContext = useContext(Context_isDesktop);
	const isDesktop = isDesktopContext;

	return (
		<div className="bg-custom-dark h-[100%] w-[100%] ">
			<div className="bg-custom-dark h-auto">
				<TopArtists />
			</div>
			<Separator />
			<div className="bg-custom-dark h-[320px]">
				<TopSongs />
			</div>
			<Separator />
			<div className='bg-custom-dark p-4 h-[350px]'>
				<MyList where={"home"} />
			</div>
		</div>
	);
}
