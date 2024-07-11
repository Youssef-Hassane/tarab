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
  Context_isDownloading,
  Context_isDesktop
} from '../home';
import VideoDisplay from '@/components/VideoDisplay';
import ListOfVideoOfChannel from '@/components/ListOfVideoOfChannel';
import InformationOfTheChannel from '@/components/InformationOfTheChannel';
import SearchSection from '@/components/SearchSection';
import TheCard from '@/components/card/TheCard';
import { FakeCard } from '@/components/card/FakeCard';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';

export default function TryPage() {
  const isDesktopContext = useContext(Context_isDesktop);
  const isDesktop = isDesktopContext;

  // Always call hooks at the top level
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

  const pathname = usePathname();

  const localPlayerRefs = useRef<{ [key: string]: ReactPlayer | null }>({});
  const playerRefs = playerRefsContext || localPlayerRefs;

  const { results, setResults } = resultsContext || {};
  const { selectedVideo, setSelectedVideo } = selectedVideoContext || {};
  const { isDrawerOpen, setIsDrawerOpen } = isDrawerOpenContext || {};
  const { favorites, setFavorites } = favoritesContext || {};
  const { url, setUrl } = urlContext || {};
  const { highlightedCardId, setHighlightedCardId } = highlightedCardIdContext || {};

  // Fetch default music data
  useEffect(() => {
    const loadDefaultMusic = async () => {
      const items = await fetchDefaultMusic();
      setResults?.(items);
    };

    loadDefaultMusic();
  }, []);

  // Fetch user's favorites from Supabase
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
          setFavorites?.(data[0]?.listOfSongs || []);
        }
      }
    };

    fetchFavorites();
  }, [setFavorites]);

  // Update highlighted card when selected video changes
  useEffect(() => {
    if (selectedVideo) {
      setHighlightedCardId?.(selectedVideo.id.videoId);
    }
  }, [selectedVideo, setHighlightedCardId]);

  // Update URL when selected video changes
  useEffect(() => {
    if (selectedVideo) {
      setUrl?.(`https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`);
    }
  }, [selectedVideo, setHighlightedCardId, setUrl]);

  if (!resultsContext || !selectedVideoContext || !isDrawerOpenContext || !favoritesContext || !urlContext || !messageContext || !downloadProgressContext || !isDownloadingContext) {
    return <FakeCard />; // or some other placeholder
  }

  return (
    <div className="bg-custom-dark">
      <aside className="bg-custom-dark text-base-content h-[65px]">
        <SearchSection where={"search"} pathname={pathname} />
        <div className="bg-custom-dark h-[calc(100vh-70px)] pb-[70px] p-1">
          <ScrollArea className="bg-custom-dark h-full overflow-hidden">
            <div className="">
              {results && results.length > 0 ? (
                <div className={`${isDesktop ? "flex flex-wrap gap-3 w-full" : "grid grid-cols-2 gap-1"}`}>
                  {results.map((item: any, index: number) => (
                    <div className=''>
                      {isDesktop ? (<TheCard item={item} where={"try"} key={item.id.videoId} />) : (<TheCard item={item} where={"MobileTry"} key={item.id.videoId} />)}

                    </div>
                  ))}
                </div>
              ) : (
                <FakeCard where={"search"} />
              )}
              <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent className="bg-custom-yellow h-[90%] w-[95%] left-[2.5%] p-5">
                  <div className='bg-custom-dark w-full h-[99%] rounded-sm flex'>
                    <InformationOfTheChannel />
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
