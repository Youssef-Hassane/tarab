// File: app/search/page.tsx
"use client";
import { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import { Drawer, DrawerContent, DrawerTitle, } from "@/components/ui/drawer";
import FooterOfTheMainPage from './footerOfTheMainPage';
import FooterOfTheDrawer from './footerOfTheDrawer';
import { fetchDefaultMusic, fetchChannelVideos } from './fetchData';
import * as React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ArtistData {
  id: number;
  ArtistsName: string;
  ImageURL: string;
  ChannelName: string;
  ListOfSongs: string;
}





export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedVideo, setSelectedVideo]: any = useState(null);
  const [channelVideos, setChannelVideos] = useState<any[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [oldVolume, setOldVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const playerRefs = useRef<{ [key: string]: ReactPlayer | null }>({}); // Ref for both players
  const [highlightedCardId, setHighlightedCardId] = useState<string | null>(null); // Track highlighted card ID
  const [shuffle, setShuffle] = useState<'off' | 'shuffle'>('off');
  const [repeatMode, setRepeatMode] = useState<'off' | 'repeat-all' | 'repeat-one'>('off'); // Repeat mode state

  useEffect(() => {
    const loadDefaultMusic = async () => {
      const items = await fetchDefaultMusic();
      setResults(items);
    };

    loadDefaultMusic();
  }, []);

  const handleCardClick = async (video: any) => {
    setSelectedVideo(video);
    setIsDrawerOpen(true);
    setPlaying(true);

    const channelVideosData = await fetchChannelVideos(video.snippet.channelId);
    setChannelVideos(channelVideosData);
  };

  const handleCardClickIcon = async (video: any) => {
    setSelectedVideo(video);
    if (selectedVideo?.id.videoId === video.id.videoId) {
      setPlaying(!playing); // Toggle playing state to pause/play
    } else {
      setPlaying(true); // Start playing the clicked video
    }

    const channelVideosData2 = await fetchChannelVideos(video.snippet.channelId);
    setChannelVideos(channelVideosData2);
    setHighlightedCardId(video.id.videoId); // Highlight card on interaction
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };










  function TopArtists() {
    const [artistsData, setArtistsData] = useState<ArtistData[] | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);

    useEffect(() => {
      const fetchArtistsData = async () => {
        const supabase = createClientComponentClient();

        console.log('Fetching artists data...');

        const { data, error } = await supabase.from('topArtists').select('*');

        if (error) {
          setFetchError('Could not fetch data');
          console.error('Error fetching data:', error);
          setArtistsData(null);
        } else {
          setArtistsData(data);
          setFetchError(null);
          console.log('Data fetched successfully:', data);
        }
      };

      fetchArtistsData();
    }, []);


    return (
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Top Artists</h1>
        {fetchError && <p className="text-red-500">{fetchError}</p>}
        {artistsData ? (
          <div className="flex gap-4">
            {artistsData.map((artist: any) => (
              <Card className="group w-[170px] h-auto max-h-[230px] bg-custom-dark border-none hover:bg-custom-yellow hover:text-custom-dark rounded-sm"
                onClick={() => handleCardClick(artist)}
              >
                <div className="group w-full h-full bg-custom-dark border-none hover:bg-custom-yellow hover:text-custom-dark rounded-sm p-0 cursor-pointer">
                  <div className="p-2">
                    <CardHeader className="text-white p-0 relative">

                      <Avatar className='h-[150px] w-[150px] p-0 m-0'>
                        <AvatarImage src={artist.ImageURL} />
                        <AvatarFallback></AvatarFallback>
                      </Avatar>
                      <Button
                        className={`button-icon bg-custom-yellow rounded-full w-[50px] h-[50px] absolute bottom-[-60px] right-1 flex items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:bottom-1 group-hover:opacity-100 shadow-xl z-50 ${highlightedCardId === artist.id
                          ? 'bg-custom-yellow text-custom-dark bottom-1 opacity-100'
                          : ''
                          }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClickIcon(artist);
                        }}
                      >
                        {playing && selectedVideo?.id.videoId === (channelVideos[channelVideos.length - 1]?.id.videoId ?? '') ? (
                          <Pause size={24} color="white" />
                        ) : (
                          <Play size={24} color="white" />
                        )}
                      </Button>
                    </CardHeader>

                    <div className="w-full text-white pt-2 flex flex-col text-start ">
                      <h1 className="text-white text-[16px] group-hover:text-custom-dark">{artist.ArtistsName}</h1>
                      <h1 className="text-gray-500 text-[12px]">{artist.ChannelName}</h1>

                    </div>
                  </div>
                </div>

              </Card>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    );
  }



















  return (
    <main className="w-full h-screen bg-custom-dark">
      <div className='flex justify-center items-center w-full h-[300px] pl-[65px] pr-[65px]'>
        <Carousel className="w-full  bg-custom-dark h-full flex justify-center items-center">
          <CarouselContent className="-ml-1 gap-2">
            {results.map((item: any, index) => (
              <CarouselItem key={item.id.videoId} className="pl-1 basis-1/1">
                <div className="p-1 h-auto max-h-[240px]">
                  <Card
                    key={item.id.videoId}
                    onClick={() => handleCardClick(item)}
                    className={`group z-20 w-[170px] h-[230px] bg-custom-dark border-none hover:bg-custom-yellow hover:text-custom-dark rounded-sm ${highlightedCardId === item.id.videoId ? 'bg-custom-yellow text-custom-dark' : ''}`}
                  >
                    <div className="p-2">
                      <CardHeader className="text-white p-0 relative">
                        <Image
                          src={item.snippet.thumbnails.high.url}
                          alt={item.snippet.title}
                          className="rounded-sm"
                          width={500}
                          height={500}
                          priority
                        />
                        <Button
                          className={`button-icon bg-custom-yellow rounded-full w-[50px] h-[50px] absolute bottom-[-60px] right-1 flex items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:bottom-1 group-hover:opacity-100 shadow-xl z-50 ${highlightedCardId === item.id.videoId
                            ? 'bg-custom-yellow text-custom-dark bottom-1 opacity-100'
                            : ''
                            }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClickIcon(item);
                          }}
                        >
                          {playing && selectedVideo?.id.videoId === item.id.videoId ? (
                            <Pause size={24} color="white" /> // Assuming 'color' prop for 'Pause' component
                          ) : (
                            <Play size={24} color="white" /> // Assuming 'color' prop for 'Play' component
                          )}
                        </Button>
                      </CardHeader>
                      <div className="w-full pt-2 flex flex-col text-start">
                        <h1 className={`text-[16px] ${highlightedCardId === item.id.videoId ? 'text-custom-dark' : 'text-white'} group-hover:text-custom-dark`}>
                          {truncateText(item.snippet.title, 35)}
                        </h1>
                        <h1 className="text-gray-500 text-[12px]">
                          {item.snippet.channelTitle}
                        </h1>
                      </div>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <Separator />
      <div>
        <TopArtists />
      </div>
    </main>
  );
}
