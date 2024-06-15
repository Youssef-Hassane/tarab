// File: app/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ScrollAreaHorizontalDemo, ScrollAreaHorizontalDemoArtists, ScrollAreaHorizontalDemoExplore } from '@/components/scroll';
import React from 'react';

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);
    return null;
  }

  return (
    <main className="w-full h-screen bg-custom-dark">
      <div className="h-auto w-full flex flex-col gap-2 justify-center items-center bg-custom-dark p-2">
        <div className="w-full justify-start">
          <h3 className="text-white font-extrabold text-start">Explore</h3>
        </div>
        <div className="bg-white w-[99%] h-[95%] rounded-lg">
          <ScrollAreaHorizontalDemoExplore />
        </div>
        <div className="w-full justify-start">
          <h1 className="text-white font-extrabold text-start">Artists</h1>
        </div>
        <div className="bg-white w-[99%] h-[95%] rounded-lg">
          <ScrollAreaHorizontalDemoArtists />
        </div>
        <div className="w-full justify-start">
          <h1 className="text-white font-extrabold text-start">Songs</h1>
        </div>
        <div className="bg-white w-[99%] h-[95%] rounded-lg">
          <ScrollAreaHorizontalDemo />
        </div>
        <div className="w-full justify-start">
          <h1 className="text-white font-extrabold text-start">Albums</h1>
        </div>
        <div className="bg-white w-[99%] h-[95%] rounded-lg">
          <ScrollAreaHorizontalDemo />
        </div>
      </div>
    </main>
  );
}
