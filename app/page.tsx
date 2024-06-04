// app/page.tsx
import Image from 'next/image'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link';
import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

export default async function Home() {

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);
    return null;
  }

  return (
    <main className="bg-custom-dark ">


    </main>
  );
}
