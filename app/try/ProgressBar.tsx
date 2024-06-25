// File: app/try/ProgressBar.tsx

import { Slider } from "@/components/ui/slider";

export default function ProgressBar({ played, onSeek }) {
  const handleSeek = (value: number[]) => {
    const seekValue = value[0] / 100;
    onSeek(seekValue);
  };

  return (
    <Slider
      value={[played * 100]} // Convert played fraction to percentage
      onValueChange={handleSeek}
      className="w-full"
      min={0}
      max={100}
    />
  );
}
 