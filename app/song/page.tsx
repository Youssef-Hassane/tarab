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
  Context_results,
  Context_selectedVideo,
  Context_isDrawerOpen,
  Context_playerRefs,
  Context_highlightedCardId,
  Context_favorites,
  Context_url,
  Context_message,
  Context_downloadProgress,
  Context_isDownloading
} from '../home';
import VideoDisplay from '@/components/VideoDisplay';
import ListOfVideoOfChannel from '@/components/ListOfVideoOfChannel';
import InformationOfTheChannel from '@/components/InformationOfTheChannel';
import SearchSection from '@/components/SearchSection';

import TheCard from '@/components/card/TheCard';
import {FakeCard} from '@/components/card/FakeCard';



export default function TryPage() {
  const resultsContext = useContext(Context_results);
  const selectedVideoContext = useContext(Context_selectedVideo);
  const isDrawerOpenContext = useContext(Context_isDrawerOpen);
  const highlightedCardIdContext = useContext(Context_highlightedCardId);
  const favoritesContext = useContext(Context_favorites);
  const urlContext = useContext(Context_url);
  const messageContext = useContext(Context_message);
  const downloadProgressContext = useContext(Context_downloadProgress);
  const isDownloadingContext = useContext(Context_isDownloading);
  const playerRefsContext = useContext(Context_playerRefs);


  // Check if contexts are available
  if (!resultsContext || !selectedVideoContext || !isDrawerOpenContext || !favoritesContext || !urlContext || !messageContext || !downloadProgressContext || !isDownloadingContext) {
    return <FakeCard />; // or some other placeholder
  }

  const { results, setResults } = resultsContext;
  const { selectedVideo, setSelectedVideo } = selectedVideoContext;
  const { isDrawerOpen, setIsDrawerOpen } = isDrawerOpenContext;
  const { favorites, setFavorites } = favoritesContext;
  const { url, setUrl } = urlContext;
  const { highlightedCardId, setHighlightedCardId } = highlightedCardIdContext;
  const localPlayerRefs = useRef<{ [key: string]: ReactPlayer | null }>({}); // Create a local ref if the context is not available  
  const playerRefs = playerRefsContext || localPlayerRefs; // Use the context ref if available, otherwise use the local ref

  useEffect(() => {
    const loadDefaultMusic = async () => {
      const items = await fetchDefaultMusic();
      setResults(items);
    };

    loadDefaultMusic();
  }, [setResults]);



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

  return (
    <div className="bg-custom-dark">
      <aside className="bg-custom-dark text-base-content rounded h-[65px] w-full ">
        <SearchSection />
        <div className="bg-custom-dark w-full h-[calc(100vh-70px)] rounded-lg overflow-hidden pb-[70px] p-1">
          <ScrollArea className="rounded-md bg-custom-dark w-full h-full overflow-auto">
            <div className="">
            {results && results.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {results.map((item: any) => (
                    <TheCard item={item} where={"try"} />
                  ))}
                </div>
              ) : (
                  <FakeCard where={"try"} />
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
            <ScrollBar orientation="vertical" />
          </ScrollArea >
        </div >
      </aside >
    </div >
  );
}




