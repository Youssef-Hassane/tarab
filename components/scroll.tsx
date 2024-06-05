import * as React from "react"
import Image from "next/image"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { MusicCard, ArtistsCard, ExploreCard } from "./MusicCard"

export interface Artwork {
	artist: string
	art: string
}

export const works: Artwork[] = [
	{
		artist: "Ornella Binni",
		art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
	},
	{
		artist: "Tom Byrom",
		art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
	},
	{
		artist: "Vladimir Malyavko",
		art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
	},
]

export function ScrollAreaHorizontalDemo() {
	return (
		<ScrollArea className="rounded-md bg-custom-dark ">
			<div className="flex p-2">
				<div className="flex w-max gap-2 ">

					<MusicCard /><MusicCard /><MusicCard /><MusicCard /><MusicCard /><MusicCard />
					<MusicCard /><MusicCard /><MusicCard /><MusicCard /><MusicCard /><MusicCard />
					<MusicCard /><MusicCard /><MusicCard /><MusicCard /><MusicCard /><MusicCard />

				</div>
			</div>

			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	)
}

export function ScrollAreaHorizontalDemoArtists() {
	return (
		<ScrollArea className="rounded-md bg-custom-dark ">
			<div className="flex p-2">
				<div className="flex w-max gap-2 ">

					<ArtistsCard /><ArtistsCard /><ArtistsCard /><ArtistsCard /><ArtistsCard /><ArtistsCard />
					<ArtistsCard /><ArtistsCard /><ArtistsCard /><ArtistsCard /><ArtistsCard /><ArtistsCard />
					<ArtistsCard /><ArtistsCard /><ArtistsCard /><ArtistsCard /><ArtistsCard /><ArtistsCard />

				</div>
			</div>

			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	)
}

export function ScrollAreaHorizontalDemoExplore() {
	return (
		<ScrollArea className="rounded-md bg-custom-dark ">
			<div className="flex p-2">
				<div className="flex w-max gap-2 ">

				<ExploreCard /><ExploreCard /><ExploreCard /><ExploreCard /><ExploreCard /><ExploreCard />
				<ExploreCard /><ExploreCard /><ExploreCard /><ExploreCard /><ExploreCard /><ExploreCard />
				<ExploreCard /><ExploreCard /><ExploreCard /><ExploreCard /><ExploreCard /><ExploreCard />

				</div>
			</div>

			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	)
}