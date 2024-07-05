// File: app/try/page.tsx
"use client";
import { useState, useEffect, useRef, useContext } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import ReactPlayer from 'react-player';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { fetchDefaultMusic } from '@/utils/fetchData';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import FooterSection from '@/components/footer';
import {
  Context_results_Songs,
  Context_selectedVideo,
  Context_isDrawerOpen,
  Context_playerRefs,
  Context_highlightedCardId,
  Context_favorites,
  Context_url,
  Context_message,
  Context_downloadProgress,
  Context_isDownloading
} from '@/app/home';
import VideoDisplay from '@/components/VideoDisplay';
import ListOfVideoOfChannel from '@/components/ListOfVideoOfChannel';
import InformationOfTheChannel from '@/components/InformationOfTheChannel';
import SearchSection from '@/components/SearchSection';
import TheCard from '@/components/card/TheCard';
import { FakeCard } from '@/components/card/FakeCard';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';




export default function TopSongs() {
  const resultsContext = useContext(Context_results_Songs);
  const selectedVideoContext = useContext(Context_selectedVideo);
  const isDrawerOpenContext = useContext(Context_isDrawerOpen);
  const highlightedCardIdContext = useContext(Context_highlightedCardId);
  const favoritesContext = useContext(Context_favorites);
  const urlContext = useContext(Context_url);
  const messageContext = useContext(Context_message);
  const downloadProgressContext = useContext(Context_downloadProgress);
  const isDownloadingContext = useContext(Context_isDownloading);
  const playerRefsContext = useContext(Context_playerRefs);




  const { resultsSong, setResultsSong } = resultsContext;
  const { selectedVideo, setSelectedVideo } = selectedVideoContext;
  const { isDrawerOpen, setIsDrawerOpen } = isDrawerOpenContext;
  const { favorites, setFavorites } = favoritesContext;
  const { url, setUrl } = urlContext;
  const { highlightedCardId, setHighlightedCardId } = highlightedCardIdContext;



  useEffect(() => {
    const loadDefaultMusic = async () => {
      const items = await fetchDefaultMusic();
      setResultsSong(items);
    };

    loadDefaultMusic();
  }, [setResultsSong]);



  useEffect(() => {
    const fetchFavorites = async () => {
      const supabase = createClientComponentClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('listOfSongs')
          .eq('id', user.id);

        if (error) {
          console.error(error);
        } else {
          setFavorites(data[0]?.listOfSongs || []);
        }
      }
    };

    fetchFavorites();
  }, [setFavorites]);

  useEffect(() => {
    // This effect ensures that highlightedCardId is updated after selectedVideo changes
    if (selectedVideo) {
      setHighlightedCardId(selectedVideo.id.videoId);
    }
  }, [selectedVideo]); // Watch for changes in selectedVideo


  useEffect(() => {
    if (selectedVideo) {
      setHighlightedCardId(selectedVideo.id.videoId);
      setUrl(`https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`);
    }
  }, [selectedVideo, setHighlightedCardId, setUrl]);

  // Check if contexts are available
  if (!resultsContext || !selectedVideoContext || !isDrawerOpenContext || !favoritesContext || !urlContext || !messageContext || !downloadProgressContext || !isDownloadingContext) {
    return <FakeCard />; // or some other placeholder
  }

  return (
    <div className="bg-custom-dark p-4">
      <h1 className="text-2xl font-bold mb-4">Top Songs</h1>
      <aside className="bg-custom-dark text-base-content rounded w-full ">
        <div className="bg-custom-dark w-full rounded-lg overflow-hidden p-1">
          <ScrollArea className="rounded-md bg-custom-dark w-full h-full overflow-auto">
            <div className="">
              {resultsSong && resultsSong.length > 0 ? (
                <div className="flex gap-3">
                  {resultsSong.map((item: any) => (
                    <TheCard item={item} where={"try"} key={item.id.videoId} />
                  ))}
                </div>
              ) : (
                <FakeCard where={"search"} />
              )}
              <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent className="bg-custom-yellow h-[90%] w-[95%] left-[2.5%] p-5">
                  <div className='bg-custom-dark w-full h-[99%] rounded-sm flex '>
                    <InformationOfTheChannel />
                    <VideoDisplay />
                    <ListOfVideoOfChannel />
                    <FooterSection inDrawer={true} />
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea >
        </div >
      </aside >
    </div >
  );
}




