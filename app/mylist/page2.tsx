"use client";
import { useState, useEffect, useRef, useContext } from 'react';
import { Play, Pause, Heart, HeartCrack } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Card, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import { Drawer, DrawerContent, DrawerTitle, } from "@/components/ui/drawer";

import { fetchDefaultMusic, fetchChannelVideos } from '@/utils/fetchData';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import FooterSection from '@/components/footer';
import InformationOfTheChannel from '@/components/InformationOfTheChannel';
import { Context_isDesktop } from '../home';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatarImage';


export default function MyList({ where }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedVideo, setSelectedVideo]: any = useState(null);
  const [playing, setPlaying] = useState(false);
  const [highlightedCardId, setHighlightedCardId] = useState(null); // Track highlighted card ID

  const [results, setResults] = useState([]);
  const [channelVideos, setChannelVideos] = useState<any[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [oldVolume, setOldVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const playerRefs = useRef<{ [key: string]: ReactPlayer | null }>({}); // Ref for both players
  const [shuffle, setShuffle] = useState<'off' | 'shuffle'>('off');
  const [repeatMode, setRepeatMode] = useState<'off' | 'repeat-all' | 'repeat-one'>('off'); // Repeat mode state
  const [url, setUrl] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const videoEndProcessingRef = useRef(false); // Ref to track if video end logic is being processed

  const isDesktopContext = useContext(Context_isDesktop);
  const isDesktop = isDesktopContext;


  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const supabase = createClientComponentClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('listOfSongs')
          .eq('id', user.id)
          .single();

        if (error) {
          setError('Error fetching favorites');
          console.error(error);
          setLoading(false);
          return;
        }

        if (!data || !data.listOfSongs || data.listOfSongs.length === 0) {
          setError('No favorites found');
          setLoading(false);
          return;
        }

        const videoIds = data.listOfSongs;
        const videoDataPromises = videoIds.map(async (videoId) => {
          const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&part=snippet&id=${videoId}`);
          const videoData = await response.json();
          return videoData.items[0];
        });

        const videoData = await Promise.all(videoDataPromises);
        setFavorites(videoData);
      } catch (err) {
        setError('An error occurred while fetching favorites');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    const loadDefaultMusic = async () => {
      const items = await fetchDefaultMusic();
      setResults(items);
    };

    loadDefaultMusic();


  }, []);

  const handleVideoEnd = () => {
    if (videoEndProcessingRef.current) return;
    videoEndProcessingRef.current = true;

    setTimeout(() => {
      videoEndProcessingRef.current = false;
    }, 1000);

    if (repeatMode === 'repeat-one') {
      playerRefs.current['player2']?.seekTo(0, 'fraction');
      playerRefs.current['player1']?.seekTo(0, 'fraction');
      setPlaying(true);
    } else if (repeatMode === 'repeat-all') {
      const currentIndex = favorites.findIndex(video => video.id === selectedVideo.id);
      const nextIndex = (currentIndex + 1) % favorites.length;
      setSelectedVideo(favorites[nextIndex]);
      setPlaying(true);
    } else {
      setPlaying(false);
    }

    if (shuffle === 'shuffle') {
      const randomIndex = Math.floor(Math.random() * favorites.length);
      setSelectedVideo(favorites[randomIndex]);
      setPlaying(true);
    }
  };


  const handleSeek = (seekValue: number) => {
    setPlayed(seekValue);
    Object.values(playerRefs.current).forEach(player => {
      if (player && typeof player.seekTo === 'function') {
        player.seekTo(seekValue, 'fraction');
      }
    });

  }; const handleShuffleClick = () => {
    setShuffle((prevMode) => {
      if (prevMode === 'off') return 'shuffle';
      return 'off';


    });
  };

  const handleSkipBack = () => {
    if (favorites.length > 0 && selectedVideo) {
      const currentIndex = favorites.findIndex(video => video.id === selectedVideo.id);
      if (currentIndex > 0) {
        setSelectedVideo(favorites[currentIndex - 1]);
      } else {
        // If at the first video, go to the last one
        setSelectedVideo(favorites[favorites.length - 1]);
      }
    }
  };

  const handleSkipForward = () => {
    if (favorites.length > 0 && selectedVideo) {
      const currentIndex = favorites.findIndex(video => video.id === selectedVideo.id);
      if (currentIndex < favorites.length - 1) {
        setSelectedVideo(favorites[currentIndex + 1]);
      } else {
        // If at the last video, go to the first one
        setSelectedVideo(favorites[0]);
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


  const handleRepeatClick = () => {
    setRepeatMode(prevMode => {
      if (prevMode === 'off') return 'repeat-one';
      if (prevMode === 'repeat-one') return 'repeat-all';
      return 'off';
    });
  };

  const handleCardClick = async (video) => {
    setSelectedVideo(video);
    setIsDrawerOpen(true);
    setPlaying(true);
    const channelVideosData = await fetchChannelVideos(video.snippet.channelId);
    setChannelVideos(channelVideosData);

  };

  const handleCardClickIcon = async (video) => {
    if (selectedVideo?.id === video.id) {
      setPlaying(!playing);
    } else {
      setSelectedVideo(video);
      setPlaying(true);
    }

    const channelVideosData2 = await fetchChannelVideos(video.snippet.channelId);
    setChannelVideos(channelVideosData2);
    setHighlightedCardId(video.id);
  };

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
      setHighlightedCardId(selectedVideo.id);
      setUrl(`https://www.youtube.com/watch?v=${selectedVideo.id}`);
    }
  }, [selectedVideo]); // Watch for changes in selectedVideo


  const handleCardClickRemove = async (videoId: string) => {
    const supabase = createClientComponentClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const isFavorite = favorites.some(video => video.id === videoId);

      if (isFavorite) {
        const updatedFavorites = favorites.filter(video => video.id !== videoId);
        setFavorites(updatedFavorites);

        const videoIds = updatedFavorites.map(video => video.id);
        const { error } = await supabase
          .from('profiles')
          .update({ listOfSongs: videoIds })
          .eq('id', user.id);

        if (error) {
          console.error('Error updating favorites:', error);
        }
      }
    }
  };


  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-white">{error}</div>;
  }

  return (
    <div className={`bg-custom-dark text-base-content rounded w-full pb-[70px] p-2`}>
      <h1 className="text-2xl font-bold mb-4 text-white">My List</h1>
      <div className="bg-custom-dark w-full rounded-lg overflow-hidden  p-1">
        <ScrollArea className="rounded-md bg-custom-dark w-full h-full overflow-auto">
          <div className={`flex gap-3 ${where === 'home' ? '' : 'flex-wrap'}`}>
            {favorites && favorites.filter(video => video?.snippet?.thumbnails?.high?.url).map((video: any) => (
              <Card onClick={() => handleCardClick(video)} key={video.id}
                className={`group z-20 w-[170px] h-auto max-h-[230px] bg-custom-dark border-none hover:bg-custom-yellow hover:text-custom-dark rounded-sm ${highlightedCardId === video.id ? 'bg-custom-yellow text-custom-dark' : ''}`}
              >

                <div className="p-2">
                  <CardHeader className="text-white p-0 relative">
                    {/*  <Image
                      src={video.snippet.thumbnails.high.url}
                      alt={video.snippet.title}
                      className="rounded-sm"
                      width={500}
                      height={500}
                      priority
                    /> */}
                    <Avatar className={`rounded-sm ${isDesktop ? "h-[115px] w-[154px]" : "h-[40px] w-[40px]"}`}>
                      <AvatarImage src={video.snippet.thumbnails.high.url} />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>



                    <Button
                      className={`button-icon bg-custom-yellow rounded-full w-[50px] h-[50px] absolute bottom-[-60px] right-1 flex items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:bottom-1 group-hover:opacity-100 shadow-xl z-50 ${highlightedCardId === video.id
                        ? 'bg-custom-yellow text-custom-dark bottom-1 opacity-100'
                        : ''
                        }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClickIcon(video);

                      }}
                    >
                      {playing && selectedVideo?.id === video.id ? (
                        <Pause size={24} color="white" /> // Assuming 'color' prop for 'Pause' component
                      ) : (
                        <Play size={24} color="white" /> // Assuming 'color' prop for 'Play' component
                      )}
                    </Button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClickRemove(video.id);
                      }}
                      className="absolute top-2 right-2 text-white`"
                    >
                      {favorites.includes(video) ? (
                        <Heart className="text-red-500 fill-red-500" />
                      ) : (
                        <Heart className="text-white" />
                      )}
                    </button>

                  </CardHeader>
                  <div className="w-full pt-2 flex flex-col text-start">
                    <h1 className={`text-[16px] ${highlightedCardId === video.id ? 'text-custom-dark' : 'text-white'} group-hover:text-custom-dark`}>
                      {truncateText(video.snippet.title, 30)}
                    </h1>
                    <h1 className="text-gray-500 text-[12px]">
                      {video.snippet.channelTitle}
                    </h1>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerContent className="bg-custom-yellow h-[90%] w-[95%] left-[2.5%] p-5">
              <div className='bg-custom-dark w-full h-[99%] rounded-sm flex '>
                <InformationOfTheChannel />
                <div className="mt-5 flex flex-col items-center justify-center w-[1080px] h-[97%] pb-[100px] ">
                  {selectedVideo && (
                    <ReactPlayer
                      ref={el => playerRefs.current['player1'] = el}
                      url={`https://www.youtube.com/watch?v=${selectedVideo.id}`}
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

                    {favorites.length > 0 ? (
                      favorites.filter(video => video?.snippet?.thumbnails?.high?.url).map((video: any) => (
                        <div
                          key={video.id}
                          className={`group flex items-center gap-2 p-2 hover:bg-custom-yellow hover:text-custom-dark rounded-sm cursor-pointer ${highlightedCardId === video.id ? 'bg-custom-yellow text-custom-dark' : ''}`}
                          onClick={() => setSelectedVideo(video)}
                        >


                          {/* <Image
                            src={video.snippet.thumbnails.default.url}
                            alt={video.snippet.title}
                            width={60}
                            height={60}
                            className="rounded-sm"
                          /> */}


                          <Avatar className={`rounded-sm ${isDesktop ? "h-[115px] w-[154px]" : "h-[40px] w-[40px]"}`}>
                            <AvatarImage src={video.snippet.thumbnails.default.url} />
                            <AvatarFallback></AvatarFallback>
                          </Avatar>

                          <div className="flex flex-col">

                            <span className={`group-hover:text-custom-dark ${highlightedCardId === video.id ? 'text-custom-dark' : 'text-white'} `}>{truncateText(video.snippet.title, 30)}</span>
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

                <FooterSection inDrawer />

              </div>
            </DrawerContent>
          </Drawer>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div >
  );
}








