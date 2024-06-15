// File: components/AlbumsSection.tsx
import { ScrollAreaHorizontalDemo } from '@/components/scroll';

export default function AlbumsSection() {
  return (
    <>
      <div className="w-full justify-start">
        <h1 className="text-white font-extrabold text-start">Albums</h1>
      </div>
      <div className="bg-white w-[99%] h-[95%] rounded-lg">
        <ScrollAreaHorizontalDemo />
      </div>
    </>
  );
}
