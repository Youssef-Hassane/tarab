// reset-password/page.tsx
'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const supabase = createClientComponentClient();
    const router = useRouter();


    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
            return;
        }



        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });
            if (error) {
                setError('Error resetting password');
                setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
                return;
            }
            setMessage('Password reset successfully.');
            setTimeout(() => {
                router.push('/');
            }, 3000);
        } catch (error) {
            console.error('Error resetting password:', error);
            setError('Error resetting password');
            setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
        }
    };

    return (
        <main className="h-screen flex items-center justify-center bg-custom-yellow p-6 relative overflow-hidden">
            <div className="bg-custom-dark p-8 rounded-lg shadow-md width-100 z-50 flex items-center justify-center h-2/4	">
                <div className="w-96">
                    <Image
                        src="/logo-2.png"
                        alt="logo"
                        className=''
                        width={500}
                        height={500}
                        priority
                    />
                </div>

                <div className=" p-8 rounded-lg  w-96 z-50 relative flex-col items-center justify-center">
                    {message && (
                        <p className="mb-4 text-sm font-bold text-green-500 absolute top-0 left-1/2 transform -translate-x-1/2 ">
                            {message}
                        </p>
                    )}
                    {error && (
                        <p className="mb-4 text-sm font-bold text-red-500 absolute top-0 left-1/2 transform -translate-x-1/2 ">
                            {error}
                        </p>
                    )}

                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="New Password"
                        className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    />
                    <button
                        onClick={handleResetPassword}
                        className="w-full mb-2 p-3 rounded-md bg-custom-yellow text-white hover:bg-gray-600 focus:outline-none"
                    >
                        Reset Password
                    </button>
                    <h1 className='text-white text-center text-sm pt-2'>Remembered your password? <Link className='text-custom-yellow' href={'/login'}>Login</Link></h1>
                </div>
            </div>
        </main>
    );
}
