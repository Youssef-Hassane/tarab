"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Pause, Play } from 'lucide-react';


export function MusicCard() {
  return (
    <Card className="group w-[170px] h-auto max-h-[230px] bg-custom-dark border-none hover:bg-custom-yellow hover:text-custom-dark rounded-sm">
      <div className="group w-full h-full bg-custom-dark border-none hover:bg-custom-yellow hover:text-custom-dark rounded-sm p-0 cursor-pointer">
        <div className="p-2">
          <CardHeader className="text-white p-0 relative">
            <Image
              src="/pablo.jpg"
              alt="logo"
              className="rounded-sm"
              width={500}
              height={500}
              priority
            />
            <div className="bg-custom-yellow rounded-full w-[50px] h-[50px] absolute bottom-[-60px] right-1 flex items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:bottom-1 group-hover:opacity-100 shadow-xl">
              <Play size={30} />
            </div>
          </CardHeader>

          <div className="w-full text-white pt-2 flex flex-col text-start ">
            <h1 className="text-white text-[16px] group-hover:text-custom-dark">Ghaba</h1>
            <h1 className="text-gray-500 text-[12px]">Marwan Pablo</h1>

          </div>
        </div>
      </div>

    </Card>
  );
}

export function ArtistsCard() {
  return (
    <Card className="group w-[170px] h-auto max-h-[230px] bg-custom-dark border-none hover:bg-custom-yellow hover:text-custom-dark rounded-sm">
      <div className="group w-full h-full bg-custom-dark border-none hover:bg-custom-yellow hover:text-custom-dark rounded-sm p-0 cursor-pointer">
        <div className="p-2">
          <CardHeader className="text-white p-0 relative">

            <Avatar className='h-[150px] w-[150px] p-0 m-0'>
              <AvatarImage src="/Mousa.jpg" />
              <AvatarFallback></AvatarFallback>
            </Avatar>
            <div className="bg-custom-yellow rounded-full w-[50px] h-[50px] absolute bottom-[-60px] right-1 flex items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:bottom-1 group-hover:opacity-100 shadow-xl">
              <Play size={30} />
            </div>
          </CardHeader>

          <div className="w-full text-white pt-2 flex flex-col text-start ">
            <h1 className="text-white text-[16px] group-hover:text-custom-dark">Marwan Moussa</h1>
            <h1 className="text-gray-500 text-[12px]">Artist</h1>

          </div>
        </div>
      </div>

    </Card>
  );
}

export function ExploreCard() {
  return (
    <Card className="group w-[170px] h-[230px] bg-custom-dark border-none hover:bg-custom-yellow hover:text-custom-dark rounded-sm">
      <div className="group w-full h-full bg-custom-dark border-none hover:bg-custom-yellow hover:text-custom-dark rounded-sm p-0 cursor-pointer">
        <div className="p-2">
          <CardHeader className="text-white p-0 relative">
            <Image
              src="/SeLTa.jpg"
              alt="logo"
              className="rounded-sm"
              width={500}
              height={500}
              priority
            />
            <div className="bg-custom-yellow rounded-full w-[50px] h-[50px] absolute bottom-[-60px] right-1 flex items-center justify-center opacity-0 transition-all duration-300 ease-in-out group-hover:bottom-1 group-hover:opacity-100 shadow-xl">
              <Play size={30} />
            </div>
          </CardHeader>

          <div className="w-full text-white pt-2 flex flex-col text-start ">
            <h1 className="text-white text-[16px] group-hover:text-custom-dark">Bekya</h1>
            <h1 className="text-gray-500 text-[12px]">SeLTa</h1>
          </div>
        </div>
      </div>
    </Card>
  );
}



// return (
// 	<Card className='w-[140px] h-[200px] bg-custom-dark '>
//           <CardHeader className='text-white'>
//             <CardTitle className='text-white text-xs'>Card Title</CardTitle>
//             <CardDescription className='text-white text-xs'>Card Description</CardDescription>
//           </CardHeader>
//           <CardContent >
//             <p className='text-white text-xs'>Card Content</p>
//           </CardContent>
//           <CardFooter>
//             <p className='text-white text-xs'>Card Footer</p>
//           </CardFooter>
//         </Card>
// )