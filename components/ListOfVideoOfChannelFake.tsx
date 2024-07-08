import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";


function CardSkeleton({ where }) {
	return (
		<div className="p-2">
			<div className={`flex items-center gap-2 pl-2 rounded-sm cursor-pointer`}>
				<Skeleton className={where === 'home' ? "flex gap-2" : "flex flex-col gap-2"} />
				<div className="flex flex-col gap-2">
					<Skeleton className={`h-4 w-[145px]`}></Skeleton>
					<Skeleton className="h-4 w-[110px]"></Skeleton>
				</div>
			</div>
		</div>
	);
}

export default function ListOfVideoOfChannelFake({ where }) {
	return (

		<ScrollArea className="mt-5 w-[500px] bg-custom-dark rounded-sm h-[97%] pb-[100px]">
			{[...Array(40)].map((_, index) => (
				<CardSkeleton key={index} where={where} />
			))}
			<ScrollBar orientation="vertical" />
		</ScrollArea>

	);
};
