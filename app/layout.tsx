// File: app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import React from 'react'; // Add this line
import HomePage from "./home";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TARAB",
  description: "Developed by Almasy Group",
  manifest: "/manifest.json",
  icons: "/icon.png",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={inter.className}>
        {user ? (
          <>
            <HomePage>
              {children}
            </HomePage>
          </>
        ) : (
          <main>{children}</main>
        )}
      </body>
    </html>
  );
}
