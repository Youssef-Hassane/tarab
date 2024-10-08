
import { SidebarButton } from "./sidebar-button";
import { SidebarItems } from "@/types";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Avatar as AvatarI, AvatarFallback as AvatarFallbackI, AvatarImage as AvatarImageI } from "../ui/avatarImage";

import { LogOut, MoreHorizontal, Settings, CircleUser } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from 'next/image';


import { useRouter } from 'next/navigation';




import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';

interface SidebarProps {
	sidebarItems: SidebarItems;
}

export function SidebarDes(props: SidebarProps) {



	const [userData, setUserData] = useState<{ first_name: string; last_name: string } | null>(null);

	useEffect(() => {
		const fetchUserData = async () => {
			const supabase = createClientComponentClient();
			const { data: { user } } = await supabase.auth.getUser();

			if (user) {
				const { data } = await supabase.from('profiles').select('first_name, last_name').eq('id', user.id).single();
				setUserData(data);
			}
		};

		fetchUserData();
	}, []);



	const pathname = usePathname();

	const [user, setUser] = useState<User | null>(null);
	const router = useRouter();
	const supabase = createClientComponentClient();
	const handleLogout = async () => {
		await supabase.auth.signOut();
		router.push('/login');
		router.refresh();
		setUser(null);
	};


	return (
		<aside className="bg-custom-dark h-screen w-[270px] max-w-xs fixed left-0 top-0 border-r mb-[70px] z-50">
			<div className="h-full px-3 py-4 ">

				{/* <Image
					src="/logo-text.png"
					alt="logo"
					className='mx-3'
					width={100}
					height={100}
					priority
				/> */}

				<AvatarI className={`rounded-none mx-3 w-[100px] h-[31.250px]`}>
					<AvatarImageI src="/logo-text.png" />
					<AvatarFallbackI></AvatarFallbackI>
				</AvatarI>

				<div className="mt-5">
					<div className="flex flex-col gap-1 w-full">
						{props.sidebarItems.links.map((link, index) => (
							<Link key={index} href={link.href}>
								<SidebarButton variant={pathname === link.href ? 'secondary' : 'ghost'} className="w-full hover:bg-custom-yellow" icon={link.icon}>
									{link.label}
								</SidebarButton>
							</Link>
						))}
						{
							props.sidebarItems.extras
						}
					</div>
					<div className='absolute left-0 bottom-[75px] w-full px-3 bg-custom-dark'>
						<Separator className='absolute -top-3 left-0 w-full' />
						<Popover >
							<PopoverTrigger asChild>
								<Button variant='ghost' className='w-full justify-start'>
									<div className='flex justify-between items-center w-full'>
										<div className='flex gap-2'>
											<Avatar className='h-5 w-5'>
												<CircleUser />
											</Avatar>
											<span>{userData ? `${userData.first_name} ${userData.last_name}` : 'Loading...'}</span>
										</div>
										<MoreHorizontal size={20} />
									</div>
								</Button>
							</PopoverTrigger>
							<PopoverContent className='mb-2 w-56 p-3 rounded-sm'>
								<div className='space-y-1'>
									<Link href='/'>
										<SidebarButton size='sm' className='w-full'>

											<div className='flex justify-between w-full'>
												<Settings color="#171b24" size={20} />
												<p className='text-custom-dark pl-2'>Account Settings</p>
											</div>
										</SidebarButton>
									</Link>
									<SidebarButton
										size='sm'
										className='w-full'
										onClick={handleLogout}
									>
										<div className='flex justify-between w-full'>
											<LogOut color="#171b24" size={20} />
											<p className='text-custom-dark pl-2'>Log Out</p>
										</div>
									</SidebarButton>


								</div>
							</PopoverContent>
						</Popover>
					</div>
				</div>
			</div>

		</aside>
	)
}

