// forgot-password/page.tsx
'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const supabase = createClientComponentClient();

    const handleResetPassword = async () => {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${location.origin}/reset-password`
            });
            if (error) {
                setError('Error sending reset email');
                setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
                return;
            }
            setMessage('Password reset email sent.');
			setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error sending reset email:', error);
            setError('Error sending reset email');
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
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    />
                    <button
                        onClick={handleResetPassword}
                        className="w-full mb-2 p-3 rounded-md bg-custom-yellow text-white hover:bg-gray-600 focus:outline-none"
                    >
                        Send Reset Link
                    </button>
                    <h1 className='text-white text-center text-sm pt-2'>Remembered your password? <Link className='text-custom-yellow' href={'/login'}>Login</Link></h1>
                </div>
            </div>
        </main>
    );
}
