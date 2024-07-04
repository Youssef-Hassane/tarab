// File: app/
import { redirect } from 'next/navigation';
import TopArtists from "@/components/Home/TopArtists";
import TopSongs from "@/components/Home/TopSongs";
import { Separator } from "@/components/ui/separator";
import { cookies } from 'next/headers';
import MyList from '../mylist/page';

export default async function HomePage() {


	return (
		<main className="bg-custom-dark h-[100%] w-[100%]">
			<div className="bg-custom-dark">
				<TopArtists />
			</div>
			<Separator />
			<div className="bg-custom-dark">
				<TopSongs />
			</div>
			<Separator />
			<div className='p-4'>
				<h1 className="text-2xl font-bold mb-4">My List</h1>
				<MyList />
			</div>

		</main>
	);
}
