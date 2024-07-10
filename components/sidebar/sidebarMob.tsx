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

      <div className='fixed -bottom-[18px] bg-custom-dark w-full h-[100px] z-50 '>
      <Separator />

        <div className='flex justify-between items-center py-1 px-1'>
          {props.sidebarItems.links.map((link, idx) => (
            <Link key={idx} href={link.href}>
              <SidebarButton
                variant={pathname === link.href ? 'secondary' : 'ghost'}
                icon={link.icon}
                className=' h-[50px] hover:bg-custom-yellow flex flex-col rounded-[100%] justify-center items-center gap-0'
              >

              </SidebarButton>
            </Link>
          ))}

        </div>
      </div>
    </Sheet>
  );
};