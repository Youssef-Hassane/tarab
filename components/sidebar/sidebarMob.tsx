'use client';

import { SidebarItems } from '@/types';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '../ui/sheet';
import { Button } from '../ui/button';
import { LogOut, Menu, MoreHorizontal, Settings, X } from 'lucide-react';
import Link from 'next/link';
import { SidebarButtonSheet as SidebarButton } from './sidebar-button';
import { usePathname } from 'next/navigation';
import { Separator } from '../ui/separator';
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface SidebarMobileProps {
  sidebarItems: SidebarItems;
}

export function SidebarMob(props: SidebarMobileProps) {
  const pathname = usePathname();

  return (
    <Sheet >
      <SheetTrigger asChild className='bg-custom-dark'>
        <Button size='icon' variant='ghost' className='fixed top-3 left-3'>
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='px-3 py-4 bg-custom-dark' hideClose>
        <SheetHeader className='flex flex-row justify-between items-center space-y-0'>
          <span className='text-lg font-semibold text-custom-yellow mx-3'>
            TaRaB
          </span>
          <SheetClose asChild>
            <Button className='h-7 w-7 p-0 hover:bg-custom-yellow' variant='ghost'>
              <X size={15} />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className='h-full'>
          <div className='mt-5 flex flex-col w-full gap-1'>
            {props.sidebarItems.links.map((link, idx) => (
              <Link key={idx} href={link.href}>
                <SidebarButton
                  variant={pathname === link.href ? 'secondary' : 'ghost' }
                  icon={link.icon}
                  className='w-full hover:bg-custom-yellow'
                >
                  {link.label}
                </SidebarButton>
              </Link>
            ))}
            {props.sidebarItems.extras}
          </div>
          <div className='absolute w-full bottom-4 px-1 left-0'>
            <Separator className='absolute -top-3 left-0 w-full' />
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant='ghost' className='w-full justify-start'>
                  <div className='flex justify-between items-center w-full'>
                    <div className='flex gap-2'>
                      <Avatar className='h-5 w-5'>
                        <AvatarImage src='https://avatars.githubusercontent.com/u/78090820?v' />
                        <AvatarFallback>Youssef Hassane</AvatarFallback>
                      </Avatar>
                      <span>Youssef Hassane</span>
                    </div>
                    <MoreHorizontal size={20} />
                  </div>
                </Button>
              </DrawerTrigger>
              <DrawerContent className='mb-2 p-2 bg-custom-dark'>
                <div className='flex flex-col space-y-2 mt-2 '>
                  <Link href='/'>
                    <SidebarButton size='sm' icon={Settings} className='w-full hover:bg-custom-yellow'>
                      Account Settings
                    </SidebarButton>
                  </Link>
                  <SidebarButton size='sm' icon={LogOut} className='w-full hover:bg-custom-yellow'>
                    Log Out
                  </SidebarButton>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};