// app/components/PersistentFooter.tsx
'use client';

import { useAudio } from '../contexts/AudioContext';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function PersistentFooter() {
  const { currentTrack, isPlaying, setIsPlaying } = useAudio();

  if (!currentTrack) return null;

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-custom-dark">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${currentTrack.id.videoId}`}
        playing={isPlaying}
        controls={true}
        width="100%"
        height="70px"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </footer>
  );
}