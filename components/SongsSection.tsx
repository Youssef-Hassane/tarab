// File: components/SongsSection.tsx
import { ScrollAreaHorizontalDemo } from '@/components/scroll';

export default function SongsSection() {
  return (
    <>
      <div className="w-full justify-start">
        <h1 className="text-white font-extrabold text-start">Songs</h1>
      </div>
      <div className="bg-white w-[99%] h-[95%] rounded-lg">
        <ScrollAreaHorizontalDemo />
      </div>
    </>
  );
}
