// File: components/footer.tsx
import { Button } from "./ui/button";
import { Cast, Airplay, Pause, SkipForward, SkipBack, Repeat1, Repeat, Shuffle, Play } from 'lucide-react';
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { VolumeX, Volume, Volume1, Volume2 } from 'lucide-react';

type SliderProps = React.ComponentProps<typeof Slider>



export function ProgressBar() {
  const handleSeek = (value: number[]) => {    
  };

  return (
    <Slider
      value={[0]} // Convert played fraction to percentage
      
      className="w-full"
      min={0}
      max={100}
    />
  );
}
 

export function FooterSection() {
	return (
		<div className="bg-custom-dark text-base-content rounded h-[70px] w-screen fixed bottom-0 left-0 z-20">
			<ProgressBar />
			<div className="flex items-center justify-between h-full w-full pl-5 pr-5 pb-2">
				<div>

					<h1 className="text-white text-[16px] group-hover:text-custom-dark"></h1>
					<h1 className="text-gray-500 text-[12px]"></h1>

				</div>
				<div className="flex gap-3 absolute left-1/2 transform -translate-x-1/2">
					<Button className={`group bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-full h-[50px] w-[50px]`}>
						<Shuffle />
					</Button>
					<Button className="bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-full h-[50px] w-[50px]">
						<SkipBack size={24} />
					</Button>
					<Button className="bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-full h-[50px] w-[50px]">
						<Play size={24} />
					</Button>
					<Button className="bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-full h-[50px] w-[50px]">
						<SkipForward size={24} />
					</Button>
					<Button variant="ghost" className="group bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-full h-[50px] w-[50px]">
						<Repeat />
					</Button>
				</div>
				<div className="flex gap-2 items-center">
					<Button className="bg-custom-dark hover:bg-custom-yellow rounded-full h-[50px] w-[50px]">
						<Volume2 size={24} />
					</Button>
					<Slider
					value={[60]}
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
	)

}