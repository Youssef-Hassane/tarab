// File: app/.tsx

"use client";
import { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, VolumeX, Volume, Volume1, Volume2, Shuffle, Repeat, Airplay, Cast } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle,} from "@/components/ui/drawer";
import React, { useRef } from 'react';



export default function SearchSection() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [channelVideos, setChannelVideos] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [oldVolume, setOldVolume] = useState(0.8);

  const [played, setPlayed] = useState(0);
  const playerRef = useRef(null);


  useEffect(() => {
    const fetchDefaultMusic = async () => {
      const apiKey = 'AIzaSyDqDuEDaWkxNw6Pxo36x-MuF4yXrNEVTg4';
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&maxResults=50&q=تراكات&type=video`
      );
      const data = await response.json();
      setResults(data.items);
    };

    fetchDefaultMusic();
  }, []);

  const handleSearch = async () => {
    if (!query) return;

    const apiKey = 'AIzaSyDqDuEDaWkxNw6Pxo36x-MuF4yXrNEVTg4';
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&maxResults=50&q=${query}&type=video`
    );
    const data = await response.json();
    setResults(data.items);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  const fetchChannelVideos = async (channelId) => {
    const apiKey = 'AIzaSyBd3kWlXBn-ru42KFlmJq1TKFLkftdUU40';
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&maxResults=50&type=video`
    );
    const data = await response.json();
    setChannelVideos(data.items);
  };

  const handleCardClick = (video) => {
    setSelectedVideo(video);
    setIsDrawerOpen(true);
    setPlaying(true);
    fetchChannelVideos(video.snippet.channelId);
  };

  const handleSkipBack = () => {
    if (channelVideos.length > 0 && selectedVideo) {
      const currentIndex = channelVideos.findIndex(video => video.id.videoId === selectedVideo.id.videoId);
      if (currentIndex > 0) {
        setSelectedVideo(channelVideos[currentIndex - 1]);
      }
    }
  };

  const handleSkipForward = () => {
    if (channelVideos.length > 0 && selectedVideo) {
      const currentIndex = channelVideos.findIndex(video => video.id.videoId === selectedVideo.id.videoId);
      if (currentIndex < channelVideos.length - 1) {
        setSelectedVideo(channelVideos[currentIndex + 1]);
      }
    }
  };


  const ProgressBar = () => {
    const handleSeek = (value) => {
      const player = playerRef.current;
      if (player) {
        player.seekTo(value, 'fraction');
      }
    };

    return (
      <Slider
        value={[played * 100]}
        onValueChange={(value) => handleSeek(value[0] / 100)}
        className="w-full"
        min={0}
        max={100}
      />
    );
  };



  return (
    <aside className="bg-custom-dark text-base-content rounded h-[65px] w-full">
      <div className="flex items-center h-full pl-5 pr-5 gap-2 justify-center">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-gray-700 text-white text-[16px] w-[400px] h-[40px] rounded-sm p-3 focus-visible:outline-none"
        />
        <Button
          onClick={handleSearch}
          className="bg-custom-yellow text-custom-dark hover:text-custom-yellow w-[150px]"
        >
          Search
        </Button>
      </div>

      <div className="bg-custom-dark w-full h-[calc(100vh-65px)] rounded-lg overflow-hidden pb-[65px]">
        <ScrollArea className="rounded-md bg-custom-dark w-full h-full overflow-auto">
          <div className="">
            <div className="flex flex-wrap gap-3">
              {results.map((item) => (
                <Card
                  key={item.id.videoId}
                  onClick={() => handleCardClick(item)}
                  className="group w-[170px] h-auto max-h-[230px] bg-custom-dark border-none hover:bg-custom-yellow hover:text-custom-dark rounded-sm"
                >
                  <div className="p-2">
                    <CardHeader className="text-white p-0 relative">
                      <Image
                        src={item.snippet.thumbnails.high.url}
                        alt={item.snippet.title}
                        className="rounded-sm"
                        width={300}
                        height={300}
                        priority
                      />
                      <div className="bg-custom-yellow rounded-full w-[50px] h-[50px] absolute bottom-[-60px] right-1 flex items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:bottom-1 group-hover:opacity-100 shadow-xl">
                        <Play size={30} />
                      </div>
                    </CardHeader>
                    <div className="w-full text-white pt-2 flex flex-col text-start">
                      <h1 className="text-white text-[16px] group-hover:text-custom-dark">
                        {truncateText(item.snippet.title, 30)}
                      </h1>
                      <h1 className="text-gray-500 text-[12px]">
                        {item.snippet.channelTitle}
                      </h1>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerContent className="bg-custom-yellow h-[90%] w-[95%] left-[2.5%] p-5">
                {/*  the drawer content */}
                <div className='bg-custom-dark w-full h-full rounded-sm flex '>
                  <DrawerClose className="absolute top-5 right-5 text-white text-2xl cursor-pointer">×</DrawerClose>
                  <DrawerHeader>
                    {selectedVideo && (
                      <div className="flex flex-col items-center bg-custom-dark w-[400px] h-[500px] p-4 text-start">

                        <Image
                          src={selectedVideo.snippet.thumbnails.high.url}
                          alt={selectedVideo.snippet.title}
                          className="rounded-sm"
                          width={300}
                          height={300}
                          priority
                        />

                        <DrawerTitle className="text-white text-2xl mt-4">{selectedVideo.snippet.title}</DrawerTitle>
                        <p className="text-white mt-2 ">{selectedVideo.snippet.channelTitle}</p>
                        <p className="text-gray-400 mt-2">{selectedVideo.snippet.description}</p>
                      </div>
                    )}

                  </DrawerHeader>
                  <div className="mt-5 flex flex-col items-center justify-center w-[1080px] h-[760px] ">
                    {selectedVideo && (
                      <ReactPlayer
                        ref={playerRef}
                        url={`https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`}
                        playing={playing}
                        controls={false}
                        width="100%"
                        height="100%"
                        config={{
                          youtube: {
                            playerVars: {
                              controls: 0,
                              modestbranding: 0,
                              rel: 0,
                              showinfo: 0,
                            },
                          },
                        }}
                        volume={volume}
                        played={played}
                        onProgress={(progress) => setPlayed(progress.played)}
                      />
                    )}
                  </div>

                  <ScrollArea className="mt-5 w-[500px] h-[760px] bg-custom-dark rounded-sm">
                    <div className="p-2">
                      {channelVideos.map((video) => (
                        <div
                          key={video.id.videoId}
                          className="flex items-center gap-2 p-2 hover:bg-custom-yellow hover:text-custom-dark rounded-sm cursor-pointer"
                          onClick={() => setSelectedVideo(video)}
                        >
                          <Image
                            src={video.snippet.thumbnails.default.url}
                            alt={video.snippet.title}
                            width={60}
                            height={60}
                            className="rounded-sm"
                          />
                          <div className="flex flex-col">
                            <span className="text-white">{truncateText(video.snippet.title, 30)}</span>
                            <span className="text-gray-400 text-sm">{video.snippet.channelTitle}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <ScrollBar orientation="vertical" />
                  </ScrollArea>


                  {/* Footer Section */}
                  <aside className="bg-custom-dark text-base-content rounded h-[65px] fixed bottom-[40px] w-[95%] left-[2.5%]">
                    <ProgressBar />
                    <div className="flex items-center justify-between h-full w-full pl-5 pr-5">
                      <div>
                        {selectedVideo && (
                          <>
                            <h1 className="text-white text-[16px] group-hover:text-custom-dark">{selectedVideo.snippet.title}</h1>
                            <h1 className="text-gray-500 text-[12px]">{selectedVideo.snippet.channelTitle}</h1>
                          </>
                        )}
                      </div>
                      <div className="flex gap-3">


                        <Button onClick={handleSkipBack} className="bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-[100%] h-[50px] w-[50px]">
                          <SkipBack size={24} />
                        </Button>
                        <Button onClick={() => setPlaying(!playing)} className="bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-[100%] h-[50px] w-[50px]">
                          {playing ? <Pause size={24} /> : <Play size={24} />}
                        </Button>
                        <Button onClick={handleSkipForward} className="bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-[100%] h-[50px] w-[50px]">
                          <SkipForward size={24} />
                        </Button>
                        <Button className="bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-[100%] h-[50px] w-[50px]">
                          <Repeat size={24} />
                        </Button>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Button onClick={() => {
                          /* console.log(volume, oldVolume); */
                          setVolume(volume === 0 ? oldVolume : 0);
                          /*  console.log(volume, oldVolume); */
                          setOldVolume(volume);
                          /* console.log(volume, oldVolume); */
                        }} className="bg-custom-dark  hover:bg-custom-yellow  rounded-[100%] h-[50px] w-[50px]">
                          {volume > 0.8 ? (
                            <Volume2 size={24} />
                          ) : volume > 0.4 ? (
                            <Volume1 size={24} />
                          ) : volume > 0.1 ? (
                            <Volume size={24} />
                          ) : (
                            <VolumeX size={24} />
                          )}                        </Button>
                        <Slider
                          value={[volume * 100]} // Wrap value in array
                          onValueChange={(value) => setVolume(value[0] / 100)} // Handle change
                          className="w-32"
                          min={0}
                          max={100}
                        />
                        <Button className="bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-[100%] h-[50px] w-[50px]">
                          <Airplay size={24} />
                        </Button>
                        <Button className="bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-[100%] h-[50px] w-[50px]">
                          <Cast size={24} />
                        </Button>
                      </div>
                    </div>
                  </aside>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </aside>
  );
}




