// File: components/footer.tsx
import { Button } from "./ui/button";
import { Cast, Airplay, Pause, SkipForward, SkipBack, Repeat1, Repeat, Shuffle, Play } from 'lucide-react';
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { VolumeX, Volume, Volume1, Volume2 } from 'lucide-react';

type SliderProps = React.ComponentProps<typeof Slider>

export function FooterSection() {
	return (
		<aside className="bg-custom-dark text-base-content rounded h-[65px]  w-screen fixed bottom-0 ">

			<div className="flex items-center justify-between h-full w-full pl-5 pr-5">
				<div h-auto w-auto>
					<h1 className="text-white text-[16px] group-hover:text-custom-dark">Song Name</h1>
					<h1 className="text-gray-500 text-[12px]">Artists</h1>
				</div>
				<div className="flex gap-3">
					<Button className="bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-[100%] h-[50px] w-[50px]">
						<Shuffle size={24} />
					</Button>
					<Button className="bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-[100%] h-[50px] w-[50px]">
						<SkipBack size={24} />
					</Button>
					<Button className="bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-[100%] h-[50px] w-[50px]">
						<Play />
					</Button>
					<Button className="bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-[100%] h-[50px] w-[50px]">
						<SkipForward size={24} />
					</Button>
					<Button className="bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-[100%] h-[50px] w-[50px]">
						<Repeat size={24} />
					</Button>
				</div>
				<div className="flex gap-2 items-center">
					<Button className="bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-[100%] h-[50px] w-[50px]">
						<Volume2 className="" />
					</Button>

					<Slider
						defaultValue={[50]}
						max={100}
						step={1}
						className="w-32 hover:color-red-500"
					/>

					<Button className="bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-[100%] h-[50px] w-[50px]">
						<Airplay size={24} />
					</Button>
					<Button className="bg-custom-dark text-white hover:bg-custom-yellow hover:text-custom-dark rounded-[100%] h-[50px] w-[50px]">
						<Cast size={24} />
					</Button>
				</div>
			</div>
		</aside>
	)

}