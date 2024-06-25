// File: app/search/page.tsx
"use client";
import { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import { Drawer, DrawerContent, DrawerTitle, } from "@/components/ui/drawer";
import FooterOfTheMainPage from './footerOfTheMainPage';
import FooterOfTheDrawer from './footerOfTheDrawer';
import { fetchDefaultMusic, fetchChannelVideos } from './fetchData';




export default function main() {
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
  const [highlightedCardId, setHighlightedCardId] = useState(null); // Track highlighted card ID
  const [shuffle, setShuffle] = useState<'off' | 'shuffle'>('off');
  const [repeatMode, setRepeatMode] = useState<'off' | 'repeat-all' | 'repeat-one'>('off'); // Repeat mode state


  useEffect(() => {
    const loadDefaultMusic = async () => {
      const items = await fetchDefaultMusic();
      setResults(items);
    };

    loadDefaultMusic();


  }, []);



  const handleSearch = async () => {
    if (!query) return;
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&maxResults=50&q=${query} Official Music Video&type=video`);
    const data = await response.json();
    setResults(data.items);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };



  const handleCardClick = async (video) => {
    setSelectedVideo(video);
    setIsDrawerOpen(true);
    setPlaying(true);

    const channelVideosData = await fetchChannelVideos(video.snippet.channelId);
    setChannelVideos(channelVideosData);

  };


  const handleCardClickIcon = async (video) => {
    setSelectedVideo(video);
    if (selectedVideo?.id.videoId === video.id.videoId) {
      setPlaying(!playing);
    } else {
      setPlaying(true);
    }

    const channelVideosData2 = await fetchChannelVideos(video.snippet.channelId);
    setChannelVideos(channelVideosData2);
    setHighlightedCardId(video.id.videoId);
  };

  useEffect(() => {
    // This effect ensures that highlightedCardId is updated after selectedVideo changes
    if (selectedVideo) {
      setHighlightedCardId(selectedVideo.id.videoId);
    }
  }, [selectedVideo]); // Watch for changes in selectedVideo


  const handleSkipBack = () => {
    if (channelVideos.length > 0 && selectedVideo) {
      const currentIndex = channelVideos.findIndex(video => video.id.videoId === selectedVideo.id.videoId);
      if (currentIndex > 0) {
        setSelectedVideo(channelVideos[currentIndex - 1]);
      } else {
        // If at the first video, go to the last one
        setSelectedVideo(channelVideos[channelVideos.length - 1]);
      }
    }
  };

  const handleSkipForward = () => {
    if (channelVideos.length > 0 && selectedVideo) {
      const currentIndex = channelVideos.findIndex(video => video.id.videoId === selectedVideo.id.videoId);
      if (currentIndex < channelVideos.length - 1) {
        setSelectedVideo(channelVideos[currentIndex + 1]);
      } else {
        // If at the last video, go to the first one
        setSelectedVideo(channelVideos[0]);
      }
    }
  };

  const handleVolumeChange = (value: any) => {
    if (value === 0) {
      setOldVolume(volume);
      setVolume(0);
    } else {
      setVolume(value);
    }
  };



  const handleShuffleClick = () => {
    setShuffle((prevMode) => {
      if (prevMode === 'off') return 'shuffle';
      return 'off';


    });
  };

  const handleVideoEnd = () => {

    if (repeatMode === 'repeat-one') {
      playerRefs.current['player2']?.seekTo(0, 'fraction');
      playerRefs.current['player1']?.seekTo(0, 'fraction');
      setPlaying(true);
    } else if (repeatMode === 'repeat-all') {
      const currentIndex = channelVideos.findIndex(video => video.id.videoId === selectedVideo.id.videoId);
      if (currentIndex < channelVideos.length - 1) {
        setSelectedVideo(channelVideos[currentIndex + 1]);
      } else {
        setSelectedVideo(channelVideos[0]); // Start from the first video when the list ends
      }
      setPlaying(true);
    } else {
      setPlaying(false);
    }
    if (shuffle === 'shuffle') {
      // Pick a random video from the list
      const randomIndex = Math.floor(Math.random() * channelVideos.length);
      setSelectedVideo(channelVideos[randomIndex]);
      setPlaying(true);
    }
  };

  const handleRepeatClick = () => {
    setRepeatMode(prevMode => {
      if (prevMode === 'off') return 'repeat-one';
      if (prevMode === 'repeat-one') return 'repeat-all';
      return 'off';
    });
  };

  const handleSeek = (seekValue: number) => {
    setPlayed(seekValue);
    Object.values(playerRefs.current).forEach(player => {
      if (player && typeof player.seekTo === 'function') {
        player.seekTo(seekValue, 'fraction');
      }
    });

  };









  const [url, setUrl] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleDownload = async () => {
    try {
      const res = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (res.ok) {
        setMessage('Download complete. \nCheck your downloads folder.');
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    // This effect ensures that highlightedCardId is updated after selectedVideo changes
    if (selectedVideo) {
      setHighlightedCardId(selectedVideo.id.videoId);
      setUrl(`https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`);
    }
  }, [selectedVideo]); // Watch for changes in selectedVideo








  return (
    <div className="bg-custom-dark">
      <aside className="bg-custom-dark text-base-content rounded h-[65px] w-full ">
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
        <div className="bg-custom-dark w-full h-[calc(100vh-70px)] rounded-lg overflow-hidden pb-[70px] p-1">
          <ScrollArea className="rounded-md bg-custom-dark w-full h-full overflow-auto">
            <div className="">
              {results.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {results.map((item: any) => (
                    <Card
                      key={item.id.videoId}
                      onClick={() => handleCardClick(item)}
                      className={`group z-20 w-[170px] h-auto max-h-[230px] bg-custom-dark border-none hover:bg-custom-yellow hover:text-custom-dark rounded-sm ${highlightedCardId === item.id.videoId ? 'bg-custom-yellow text-custom-dark' : ''
                        }`}
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
              ) : (
                <div className="text-center">Loading...</div>
              )}
              <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent className="bg-custom-yellow h-[90%] w-[95%] left-[2.5%] p-5">
                  <div className='bg-custom-dark w-full h-[99%] rounded-sm flex '>
                    <ScrollArea className="mt-5 w-[500px] bg-custom-dark rounded-sm h-[97%] pb-[100px]">
                      {selectedVideo && (
                        <div className="flex flex-col items-center bg-custom-dark p-6 text-start">
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
                          <div className='flex flex-col m-8 gap-5 w-full'>
                            <h1>Download YouTube Video</h1>
                            <button className='w-full justify-center text-white bg-custom-dark h-10 rounded-sm hover:bg-custom-yellow hover:text-custom-dark' onClick={handleDownload}>Download</button>
                            {message && <p className='text-center text-green-600'>{message}</p>}
                          </div>
                        </div>
                      )}
                    </ScrollArea>
                    <div className="mt-5 flex flex-col items-center justify-center w-[1080px] h-[97%] pb-[100px] ">
                      {selectedVideo && (
                        <ReactPlayer
                          ref={el => playerRefs.current['player1'] = el}
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
                          volume={0}
                          played={played}
                          onProgress={(progress) => setPlayed(progress.played)}
                          onEnded={handleVideoEnd}
                          onSeek={handleSeek}
                        />
                      )}
                    </div>
                    <ScrollArea className="mt-5 w-[500px] bg-custom-dark rounded-sm h-[97%] pb-[100px]">
                      <div className="p-2">

                        {channelVideos.length > 0 ? (
                          channelVideos.map((video: any) => (
                            <div
                              key={video.id.videoId}
                              className={`group flex items-center gap-2 p-2 hover:bg-custom-yellow hover:text-custom-dark rounded-sm cursor-pointer ${highlightedCardId === video.id.videoId ? 'bg-custom-yellow text-custom-dark' : ''}`}
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

                                <span className={`group-hover:text-custom-dark ${highlightedCardId === video.id.videoId ? 'text-custom-dark' : 'text-white'} `}>{truncateText(video.snippet.title, 30)}</span>
                                <span className="text-gray-400 text-sm">{video.snippet.channelTitle}</span>
                              </div>

                            </div>
                          ))
                        ) : (
                          <p className="text-white text-center">No videos available</p>
                        )}
                      </div>
                      <ScrollBar orientation="vertical" />
                    </ScrollArea>

                    <FooterOfTheDrawer
                      selectedVideo={selectedVideo}
                      playing={playing}
                      shuffle={shuffle}
                      repeatMode={repeatMode}
                      volume={volume}
                      oldVolume={oldVolume}
                      handleShuffleClick={handleShuffleClick}
                      handleSkipBack={handleSkipBack}
                      handleSkipForward={handleSkipForward}
                      handleRepeatClick={handleRepeatClick}
                      handleVolumeChange={handleVolumeChange}
                      setPlaying={setPlaying}
                      played={played}
                      onSeek={handleSeek}
                    />


                  </div>
                </DrawerContent>
              </Drawer>
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>

      </aside>

      {/* player of the main page */}
      <div>
        {selectedVideo && (
          <ReactPlayer
            ref={el => playerRefs.current['player2'] = el}
            url={`https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`}
            playing={playing}
            controls={false}
            width="0"
            height="0"
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
            onEnded={handleVideoEnd}
          />
        )}
      </div>
      {/* footer of the main page */}
      {selectedVideo && (
        <FooterOfTheMainPage
          selectedVideo={selectedVideo}
          playing={playing}
          shuffle={shuffle}
          repeatMode={repeatMode}
          volume={volume}
          oldVolume={oldVolume}
          handleShuffleClick={handleShuffleClick}
          handleSkipBack={handleSkipBack}
          handleSkipForward={handleSkipForward}
          handleRepeatClick={handleRepeatClick}
          handleVolumeChange={handleVolumeChange}
          setPlaying={setPlaying}
          played={played}
          onSeek={handleSeek}
        />
      )}

    </div>
  );
}




