// File: app/downloads/page.tsx
'use client';

import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Heart } from 'lucide-react';
import {
  Context_selectedVideo,
  Context_playing,
  Context_playerRefs
} from '../home';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatarImage';

interface DownloadedVideo {
  id: string;
  title: string;
  filePath: string;
  thumbnailPath: string;
}

export default function Downloads() {
  const [downloadedVideos, setDownloadedVideos] = useState<DownloadedVideo[]>([]);
  const [highlightedCardId, setHighlightedCardId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const { selectedVideo, setSelectedVideo } = useContext(Context_selectedVideo);
  const { playing, setPlaying } = useContext(Context_playing);
  const playerRefs = useContext(Context_playerRefs);

  useEffect(() => {
    fetchDownloadedVideos();
  }, []);

  const fetchDownloadedVideos = async () => {
    try {
      const response = await fetch('/api/downloadedVideos');
      const videos = await response.json();
      setDownloadedVideos(videos);
    } catch (error) {
      console.error('Error fetching downloaded videos:', error);
    }
  };

  const handleCardClick = (video: DownloadedVideo) => {
    setSelectedVideo(video);
    setHighlightedCardId(video.id);
    setPlaying(true);

    // Play the video
    const player = playerRefs.current[video.id];
    if (player && typeof player.playVideo === 'function') {
      player.playVideo();
    }
  };

  const handleFavoriteClick = (videoId: string) => {
    setFavorites(prev =>
      prev.includes(videoId)
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Downloaded Videos</h1>
      <div className="flex flex-wrap gap-3">
        {downloadedVideos.map((video) => (
          <Card
            key={video.id}
            onClick={() => handleCardClick(video)}
            className={`group z-20 w-[170px] h-auto max-h-[230px] bg-custom-dark border-none hover:bg-custom-yellow hover:text-custom-dark rounded-sm ${highlightedCardId === video.id ? 'bg-custom-yellow text-custom-dark' : ''
              }`}
          >
            <div className="p-2">
              <CardHeader className="text-white p-0 relative">
                {/* <Image
                  src={video.thumbnailPath}
                  alt={video.title}
                  className="rounded-sm"
                  width={170}
                  height={96}
                  priority
                /> */}
                <Avatar className={`rounded-sm w-[170px]  h-[96px]`}>
                  <AvatarImage src={video.thumbnailPath} />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <Button
                  className={`button-icon bg-custom-yellow rounded-full w-[50px] h-[50px] absolute bottom-[-60px] right-1 flex items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:bottom-1 group-hover:opacity-100 shadow-xl z-50 ${highlightedCardId === video.id
                      ? 'bg-custom-yellow text-custom-dark bottom-1 opacity-100'
                      : ''
                    }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(video);
                  }}
                >
                  {playing && selectedVideo?.id === video.id ? (
                    <Pause size={24} color="white" />
                  ) : (
                    <Play size={24} color="white" />
                  )}
                </Button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteClick(video.id);
                  }}
                  className="absolute top-2 right-2 text-white"
                >
                  {favorites.includes(video.id) ? (
                    <Heart className="text-red-500 fill-red-500" />
                  ) : (
                    <Heart className="text-white" />
                  )}
                </button>
              </CardHeader>
              <div className="w-full pt-2 flex flex-col text-start">
                <h1 className={`text-[16px] ${highlightedCardId === video.id ? 'text-custom-dark' : 'text-white'
                  } group-hover:text-custom-dark`}>
                  {truncateText(video.title, 30)}
                </h1>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}