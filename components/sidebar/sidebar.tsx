'use client'

import { CloudDownload, Bell, Bookmark, Search, Home, List, Mail, MoreHorizontal, User, Users, Disc, AudioWaveform, MicVocal, GalleryHorizontalEnd } from 'lucide-react';
import { SidebarDes } from './sidebarDes';
import { SidebarItems } from '@/types';
import { SidebarButton } from './sidebar-button';
import { useMediaQuery } from 'usehooks-ts';
import { SidebarMob } from './sidebarMob';

const sidebarItems: SidebarItems = {
	links: [
		{ label: 'Home', href: '/home', icon: Home },
		{ label: 'Search', href: '/search', icon: Search },
		{ label: 'Artists', href: '/artists', icon: MicVocal },
		{ label: 'Songs', href: '/song', icon: AudioWaveform },
		{ label: 'My list', href: '/mylist', icon: List, },
		
		
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

const sidebarItemsMobile: SidebarItems = {
	links: [
		{ href: '/home', icon: Home },
		{ href: '/search', icon: Search },
		{ href: '/artists', icon: MicVocal },
		{ href: '/mylist', icon: List, },
		{ href: '/downloads', icon: CloudDownload },
		
	]
}


export function Sidebar() {

	const isDesktop = useMediaQuery('(min-width: 640px)', { initializeWithValue: false });

	if (!isDesktop) {
		return (<SidebarMob sidebarItems={sidebarItemsMobile} />);
	}
	return (
		<div>
			<SidebarDes sidebarItems={sidebarItems} />
			
		</div>

	);
}
