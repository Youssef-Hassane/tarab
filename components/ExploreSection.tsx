// File: components/ExploreSection.tsx
import { ScrollAreaHorizontalDemoExplore } from '@/components/scroll';

export default function ExploreSection() {
  return (
    <>
      <div className="w-full justify-start">
        <h3 className="text-white font-extrabold text-start">Explore</h3>
      </div>
      <div className="bg-white w-[99%] h-[95%] rounded-lg">
        <ScrollAreaHorizontalDemoExplore />
      </div>
    </>
  );
}
