// File: components/ArtistsSection.tsx
import { ScrollAreaHorizontalDemoArtists } from '@/components/scroll';

export default function ArtistsSection() {
  return (
    <>
      <div className="w-full justify-start">
        <h1 className="text-white font-extrabold text-start">Artists</h1>
      </div>
      <div className="bg-white w-[99%] h-[95%] rounded-lg">
        <ScrollAreaHorizontalDemoArtists />
      </div>
    </>
  );
}
