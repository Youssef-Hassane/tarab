'use client';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Add error state
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const supabase = createClientComponentClient();

    useEffect(() => {
        async function getUser() {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        }
        getUser();
    }, []);

    const handleSignUp = async () => {
        try {
            await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`
                }
            });
            router.push('/');
        } catch (error) {
            console.error('Error signing up:', error);
            setError('Error signing up');
        }
    };

    const handleSignIn = async () => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            if (error) {
                setError('Wrong email or password');
                setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
                return;
            }
            router.push('/');
        } catch (error) {
            console.error('Error signing in:', error);
            setError('Error signing in');
            setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
        setUser(null);
    };

    const BackgroundImages = ({ count, imageSize }) => {
        const images = ['/logo-3.png', '/logo-4.png', '/logo-5.png'];
        const [imageElements, setImageElements] = useState([]);

        useEffect(() => {
            const elements = [];
            const numRows = Math.ceil(Math.sqrt(count));
            const numCols = Math.ceil(count / numRows);
            const spacingX = window.innerWidth / numCols;
            const spacingY = window.innerHeight / numRows;

            for (let i = 0; i < count; i++) {
                const row = Math.floor(i / numCols);
                const col = i % numCols;
                const x = col * spacingX + spacingX / 2 - imageSize / 2;
                const y = row * spacingY + spacingY / 2 - imageSize / 2;
                const image = images[Math.floor(Math.random() * images.length)];
                elements.push({ image, x, y });
            }

            setImageElements(elements);
        }, [count, imageSize]);

        return (
            <>
                {imageElements.map((element, i) => (
                    <Image
                        key={i}
                        src={element.image}
                        alt="background icon"
                        style={{
                            position: 'absolute',
                            left: `${element.x}px`,
                            top: `${element.y}px`,
                            opacity: 0.5,
                            zIndex: 1,
                        }}
                        width={imageSize}
                        height={imageSize}
                    />
                ))}
            </>
        );
    };

    console.log({ loading, user });

    if (loading) {
        return <h1>loading..</h1>;
    }

    if (user) {
        return (
            <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-96 text-center">
                    <h1 className="mb-4 text-xl font-bold text-gray-700 dark:text-gray-300">
                        You're already logged in
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

    return (
        <main className="h-screen flex items-center justify-center bg-custom-yellow p-6 relative overflow-hidden">
            <BackgroundImages count={42} imageSize={50} />
            <div className="bg-custom-dark p-8 rounded-lg shadow-md w-96 z-50">
                <Image
                    src="/logo-2.png"
                    alt="logo"
                    className=''
                    width={500}
                    height={500}
                    priority
                />
                {error && (
                    <p className="mb-4 text-sm font-bold text-red-500 text-center">
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
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
                <button
                    onClick={handleSignIn}
                    className="w-full mb-2 p-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                >
                    Sign In
                </button>
                <button
                    onClick={handleSignUp}
                    className="w-full p-3 rounded-md bg-gray-700 text-white hover:bg-gray-600 focus:outline-none"
                >
                    Sign Up
                </button>
            </div>
        </main>
    );
}
