// File: app/artists/page.tsx
"use client";
import { useEffect, useContext } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { fetchDefaultChannels } from '@/utils/fetchData';
import { Context_results, Context_isDrawerOpen, Context_results_Channels } from '../home';
import VideoDisplay from '@/components/VideoDisplay';
import ListOfVideoOfChannel from '@/components/ListOfVideoOfChannel';
import SearchSection from '@/components/SearchSection';
import FooterSection from '@/components/footer';
import TheCard from '@/components/card/TheCard';
import { FakeCardArtists, FakeCard } from '@/components/card/FakeCard';
import ListOfChannels from '@/components/ListOfChannels';
import { usePathname } from 'next/navigation';

export default function ArtistsPage() {
  const resultsContext = useContext(Context_results);
  const isDrawerOpenContext = useContext(Context_isDrawerOpen);
  const resultsChannelsContext = useContext(Context_results_Channels);

  // Check if contexts are available
  if (!resultsContext || !isDrawerOpenContext) {
    return <FakeCard where="Artists" />; // or some other placeholder
  }

  const { results, setResults } = resultsContext;
  const { isDrawerOpen, setIsDrawerOpen } = isDrawerOpenContext;

  const { resultsChannel, setResultsChannel } = resultsChannelsContext;

  const pathname = usePathname();

  useEffect(() => {
    const loadDefaultMusic = async () => {
      const channels = await fetchDefaultChannels();
      setResultsChannel(channels);
    };

    loadDefaultMusic();
  }, []);

  
  return (
    <div className="bg-custom-dark">
      <aside className="bg-custom-dark text-base-content rounded h-[65px] w-full ">
        <SearchSection where={"artists"} pathname={pathname} />
        <div className="bg-custom-dark w-full h-[calc(100vh-70px)] rounded-lg overflow-hidden pb-[70px] p-1">
          <ScrollArea className="rounded-md bg-custom-dark w-full h-full overflow-auto">
            <div className="">
              {resultsChannel && resultsChannel.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {resultsChannel.map((item: any) => (
                    <TheCard item={item} where={"artists"} key={item.id} />
                  ))}
                </div>
              ) : (
                <FakeCardArtists where={"artists"} />
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
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
      </aside>
    </div>
  );
}
