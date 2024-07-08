// login/page.tsx
'use client';
import { useState, useEffect, useMemo } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';
import BackgroundImages from './BackBroundImages';

export default function UserIsLoggedIn({supabase}) {

	const router = useRouter();
	
	const handleLogout = async () => {
		await supabase.auth.signOut();
		router.refresh();
		setUser(null);
	};


	return (
		<div className="h-screen flex items-center justify-center bg-custom-yellow p-6 relative overflow-hidden">
			<BackgroundImages count={42} imageSize={50} />
			<div className="bg-custom-dark dark:bg-gray-900 p-8 rounded-lg shadow-md w-96 text-center z-50">
				<h1 className="mb-4 text-xl font-bold text-white dark:text-gray-300">
					You&apos;re already logged in
				</h1>
				<button
					onClick={handleLogout}
					className="w-full p-3 rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none"
				>
					Logout
				</button>
			</div>
		</div>
	);
}