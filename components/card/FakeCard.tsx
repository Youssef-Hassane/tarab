import { Skeleton } from "../ui/skeleton";


function CardSkeleton() {
	return (

		<div className="flex flex-col space-y-3 h-[205px] w-[170px]">
			<Skeleton className="h-[115px] w-[145px] rounded-xl" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-[145px]" />
				<Skeleton className="h-4 w-[110px]" />
			</div>
		</div>

	);
}

function CardSkeletonArtists() {
	return (

		<div className="flex flex-col space-y-3 h-[205px] w-[170px] rounded-full">
			<Skeleton className="h-[150px] w-[150px] rounded-full " />
			<div className="space-y-2">
				<Skeleton className="h-4 w-[145px]" />
				<Skeleton className="h-4 w-[110px]" />
			</div>
		</div>

	);
}

export function FakeCard({where}) {
	return (

		<div className={`flex gap-3 p-2 ${where === 'home' ? 'justify-center' : 'flex-wrap justify-center'}`}>
			{[...Array(40)].map((_, index) => (
				<CardSkeleton key={index} />
			))}
		</div>

	);
};

export function FakeCardArtists({ where }) {
	return (
		<div className={`flex gap-3 p-2 ${where === 'home' ? 'justify-center ' : 'flex-wrap justify-center'}`}>
			{[...Array(40)].map((_, index) => (
				<CardSkeletonArtists key={index} />
			))}
		</div>
	);
};