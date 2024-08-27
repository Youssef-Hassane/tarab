// File: components/Home/TopArtists.tsx
import { useEffect, useContext } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { fetchDefaultChannels } from '@/utils/fetchData';
import { Context_results_Channels, Context_isDrawerOpen, Context_isDesktop } from '@/app/home';
import VideoDisplay from '@/components/VideoDisplay';
import ListOfVideoOfChannel from '@/components/ListOfVideoOfChannel';
import FooterSection from '@/components/footer';
import TheCard from '@/components/card/TheCard';
import { FakeCardArtists, FakeCard } from '@/components/card/FakeCard';
import ListOfChannels from '@/components/ListOfChannels';

export default function TopArtists() {
	const isDesktopContext = useContext(Context_isDesktop);
	const isDesktop = isDesktopContext;

	const resultsContext = useContext(Context_results_Channels);
	const isDrawerOpenContext = useContext(Context_isDrawerOpen);



	const { resultsChannel, setResultsChannel } = resultsContext;
	const { isDrawerOpen, setIsDrawerOpen } = isDrawerOpenContext;


	useEffect(() => {
		const loadDefaultMusic = async () => {
			const channels = await fetchDefaultChannels();
			setResultsChannel(channels);
		};

		loadDefaultMusic();
	}, [setResultsChannel]);

	// Check if contexts are available
	if (!resultsContext || !isDrawerOpenContext) {
		return <FakeCardArtists where="home" />;
	}

	return (
		<div className="bg-custom-dark p-4">
			<h1 className="text-2xl font-bold mb-4 text-white">Top Artists</h1>
			<aside className="bg-custom-dark text-base-content rounded w-full ">
				<div className="bg-custom-dark w-full rounded-lg overflow-hidden p-1">
					<ScrollArea className=" bg-custom-dark w-full overflow-auto">
						<div className="">
							{resultsChannel && resultsChannel.length > 0 ? (
								<div className={`${isDesktop ? "flex gap-3 h-[240px]" : "grid grid-cols-10 gap-1 w-[1800px]"}`}>
									{resultsChannel.map((item: any) => (
										<div className=''>
											{isDesktop ? (<TheCard item={item} where={"artists"} key={item.id} />) : (<TheCard item={item} where={"Mobile"} key={item.id} />)}

										</div>
									))}
								</div>
							) : (
								<FakeCardArtists where={"home"} />
							)}
							<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
								<DrawerContent className="bg-custom-yellow h-[90%] w-[95%] left-[2.5%] p-5">
									<div className='bg-custom-dark w-full h-[99%] rounded-sm flex '>
										<ScrollArea className="mt-5 w-[500px] bg-custom-dark rounded-sm h-[97%] pb-[100px]">
											<div className="p-2">
												{resultsChannel && resultsChannel.map((item) => (
													<ListOfChannels item={item} key={item.id} />
												))}
											</div>
										</ScrollArea>
										<VideoDisplay />
										<ListOfVideoOfChannel />
										<FooterSection inDrawer={true} />
									</div>
								</DrawerContent>
							</Drawer>
						</div>
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				</div>
			</aside>
		</div>
	);
}
