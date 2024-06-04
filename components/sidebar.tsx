'use client'

import { Bell, Bookmark, Home, List, Mail, MoreHorizontal, User, Users, Disc, AudioWaveform, MicVocal, GalleryHorizontalEnd } from 'lucide-react';
import { SidebarDes } from './sidebarDes';
import { SidebarItems } from '@/types';
import { SidebarButton } from './sidebar-button';
import { useMediaQuery } from 'usehooks-ts';
import { SidebarMob } from './sidebarMob';

const sidebarItems: SidebarItems = {
	links: [
		{ label: 'Home', href: '/', icon: Home },
		{ label: 'Explore', href: '/item/explore', icon: Disc },
		{ label: 'Artists', href: '/item/artists', icon: MicVocal },
		{ label: 'Songs', href: '/item/songs', icon: AudioWaveform },
		{ label: 'My list', href: '/item/list', icon: List, },
		{ label: 'Albums', href: '/item/albums', icon: GalleryHorizontalEnd },
		{ label: 'Profile', href: '/item/profile', icon: User },
	],
	extras: (
	  <div className='flex flex-col gap-2'>
		<SidebarButton icon={MoreHorizontal} className='w-full'>
		  More
		</SidebarButton>
		<SidebarButton
		  className='w-full justify-center text-white'
		  variant='default'
		>
		  Upload Song
		</SidebarButton>
	  </div>
	),
	
}

export function Sidebar() {

	const isDesktop = useMediaQuery('(min-width: 640px)',{initializeWithValue: false});

	if(!isDesktop) {
		return (<SidebarMob sidebarItems={sidebarItems}/>);
	}
	return (
		
		<SidebarDes sidebarItems={sidebarItems}/>
	);
}
