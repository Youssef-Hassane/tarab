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
        <div className='fixed bottom-0 bg-red-500 w-full'>
          <div className='flex w-full gap-2 justify-between'>
            {props.sidebarItems.links.map((link, idx) => (
              <Link key={idx} href={link.href}>
                <SidebarButton
                  variant={pathname === link.href ? 'secondary' : 'ghost' }
                  icon={link.icon}
                  className='w-full h-full hover:bg-custom-yellow flex flex-col'
                >
                  {link.label}
                </SidebarButton>
              </Link>
            ))}
            {props.sidebarItems.extras}
          </div>
        </div>
    </Sheet>
  );
};