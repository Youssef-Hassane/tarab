// File: app/
import { redirect } from 'next/navigation';
import TopArtists from "@/components/Home/TopArtists";
import TopSongs from "@/components/Home/TopSongs";
import { Separator } from "@/components/ui/separator";
import { cookies } from 'next/headers';
import MyList from '../mylist/page';

export default async function HomePage() {


	return (
		<main className="bg-custom-dark h-[100%] w-[100%] ">
			<div className="bg-custom-dark h-[330px]">
				<TopArtists />
			</div>
			<Separator />
			<div className="bg-custom-dark h-[320px]">
				<TopSongs />
			</div>
			<Separator />
			<div className='bg-custom-dark p-4 h-[350px]'>
				<MyList where={"home"}/>
			</div>

		</main>
	);
}
