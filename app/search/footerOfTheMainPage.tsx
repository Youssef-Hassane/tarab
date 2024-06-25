// File: app/search/footerOfTheMainPage.tsx

import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Repeat1, Volume2, Volume1, Volume, VolumeX, Airplay, Cast } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { Button } from '@/components/ui/button';
import ProgressBar from './ProgressBar';
import { usePlayer } from '../PlayerContext';

export default function FooterOfTheMainPage({ selectedVideo, playing, shuffle, repeatMode, volume, oldVolume, handleShuffleClick, handleSkipBack, handleSkipForward, handleRepeatClick, handleVolumeChange, setPlaying, played, onSeek }) {

  return (
    <div className="bg-custom-dark text-base-content rounded h-[70px] w-screen fixed bottom-0 left-0 z-50">
      <ProgressBar played={played} onSeek={onSeek} />
      <div className="flex items-center justify-between h-full w-full pl-5 pr-5 pb-2">
        <div>
          {selectedVideo && (
            <>
              <h1 className="text-white text-[16px] group-hover:text-custom-dark">{selectedVideo.snippet.title}</h1>
              <h1 className="text-gray-500 text-[12px]">{selectedVideo.snippet.channelTitle}</h1>
            </>
          )}
        </div>
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
    </div>
  );
}
