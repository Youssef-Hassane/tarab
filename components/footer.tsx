// File: components/footer.tsx

"use client";


import React, { useContext } from 'react';
import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Repeat1, Volume2, Volume1, Volume, VolumeX, Airplay, Cast } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { Button } from '@/components/ui/button';
import {
    Context_selectedVideo,
    Context_channelVideos,
    Context_playing,
    Context_volume,
    Context_oldVolume,
    Context_played,
    Context_playerRefs,
    Context_shuffle,
    Context_repeatMode,
} from '../app/home';
import { useMediaQuery } from 'usehooks-ts';
import truncateText from '@/utils/truncateText';

function ProgressBar({ played, onSeek }) {
    const handleSeek = (value: number[]) => {
        const seekValue = value[0] / 100;
        onSeek(seekValue);
    };

    return (
        <Slider
            value={[played * 100]}
            onValueChange={handleSeek}
            className="w-full"
            min={0}
            max={100}
        />
    );
}

export default function FooterSection({ inDrawer = false }) {
    const { selectedVideo, setSelectedVideo } = useContext(Context_selectedVideo);
    const { channelVideos } = useContext(Context_channelVideos);
    const { playing, setPlaying } = useContext(Context_playing);
    const { volume, setVolume } = useContext(Context_volume);
    const { oldVolume, setOldVolume } = useContext(Context_oldVolume);
    const { played, setPlayed } = useContext(Context_played);
    const playerRefs = useContext(Context_playerRefs);
    const { shuffle, setShuffle } = useContext(Context_shuffle);
    const { repeatMode, setRepeatMode } = useContext(Context_repeatMode);


    const isDesktop = useMediaQuery('(min-width: 640px)', { initializeWithValue: false });

    const handleSeek = (seekValue: number) => {
        setPlayed(seekValue);
        Object.values(playerRefs.current).forEach(player => {
            if (player && typeof player.seekTo === 'function') {
                player.seekTo(seekValue, 'fraction');
            }
        });
    };

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
        setShuffle((prevMode) => (prevMode === 'off' ? 'shuffle' : 'off'));
    };


    const handleRepeatClick = () => {
        setRepeatMode(prevMode => {
            if (prevMode === 'off') return 'repeat-one';
            if (prevMode === 'repeat-one') return 'repeat-all';
            return 'off';
        });
    };

    return (
        <div className={`${inDrawer
            ? 'bg-custom-dark text-base-content rounded h-[65px] fixed bottom-[40px] w-[95%] left-[2.5%]'
            : `bg-custom-dark text-base-content rounded h-[70px]  fixed bottom-0 left-0 z-50 ${isDesktop ? 'w-screen' : 'bg-custom-dark text-base-content rounded h-[65px] fixed bottom-[89px] w-[calc(100%-10px)] mx-[5px] border-gray-700 border-2 border-opacity-80'}`
            } 
          `}>
            <ProgressBar played={played} onSeek={handleSeek} />
            <div className={`${inDrawer
                ? 'flex items-center justify-between h-full w-full pl-5 pr-5'
                : 'flex items-center justify-between h-full w-full pl-5 pr-5 pb-2'
                }`}>
                <div>
                    {selectedVideo && selectedVideo.snippet && (
                        <>
                        {isDesktop && (
                            <h1 className="text-white text-[16px] group-hover:text-custom-dark">{selectedVideo.snippet.title}</h1>
                        )}
                        <h1 className="text-white text-[16px] group-hover:text-custom-dark">{truncateText(selectedVideo.snippet.title, 30)}</h1>
                            <h1 className="text-gray-500 text-[12px]">
                                {selectedVideo.snippet.channelTitle}
                                
                            </h1>
                        </>
                    )}
                </div>
                {isDesktop && (
                    <div>
                        <div className="flex gap-3 absolute left-1/2 transform -translate-x-1/2">
                            <Button onClick={handleShuffleClick} className={`group bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-full h-[50px] w-[50px]`}>
                                {shuffle === 'off' ? <Shuffle /> : <Shuffle size={24} className='text-custom-yellow group-hover:text-custom-dark' />}
                            </Button>
                            <Button onClick={handleSkipBack} className="bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-full h-[50px] w-[50px]">
                                <SkipBack size={24} />
                            </Button>
                            <Button onClick={() => setPlaying(!playing)} className="bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-full h-[50px] w-[50px]">
                                {playing ? <Pause size={24} /> : <Play size={24} />}
                            </Button>
                            <Button onClick={handleSkipForward} className="bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-full h-[50px] w-[50px]">
                                <SkipForward size={24} />
                            </Button>
                            <Button variant="ghost" onClick={handleRepeatClick} className="group bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-full h-[50px] w-[50px]">
                                {repeatMode === 'off' ? <Repeat /> : repeatMode === 'repeat-one' ? <Repeat1 className='text-custom-yellow group-hover:text-custom-dark' /> : <Repeat className="text-red-500 w-6 h-6" />}
                            </Button>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Button onClick={() => handleVolumeChange(volume === 0 ? oldVolume : 0)} className="bg-custom-dark hover:bg-custom-yellow rounded-full h-[50px] w-[50px]">
                                {volume > 0.8 ? <Volume2 size={24} /> : volume > 0.4 ? <Volume1 size={24} /> : volume > 0.1 ? <Volume size={24} /> : <VolumeX size={24} />}
                            </Button>
                            <Slider
                                value={[volume * 100]} // Wrap value in array
                                onValueChange={(value) => handleVolumeChange(value[0] / 100)} // Handle change
                                className="w-32"
                                min={0}
                                max={100}
                            />
                            <Button className="bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-full h-[50px] w-[50px]">
                                <Airplay size={24} />
                            </Button>
                            <Button className="bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-full h-[50px] w-[50px]">
                                <Cast size={24} />
                            </Button>
                        </div>
                    </div>
                )}
                <Button onClick={() => setPlaying(!playing)} className="bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-full h-[50px] w-[50px]">
                    {playing ? <Pause size={24} /> : <Play size={24} />}
                </Button>
            </div>
        </div>
    );
}
