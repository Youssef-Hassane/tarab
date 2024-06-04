// signup/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState(''); // Add first name state
    const [lastName, setLastName] = useState(''); // Add last name state
    const [username, setUsername] = useState(''); // Add username state
    const [error, setError] = useState('');
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
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${location.origin}/auth/callback`
                }
            });

            if (error) {
                setError('Error signing up');
                return;
            }

            if (data.user) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert([
                        {
                            id: data.user.id,
                            email,
                            first_name: firstName,
                            last_name: lastName,
                            username,
                        }
                    ]);

                if (profileError) {
                    setError('Error saving profile data');
                    return;
                }

                router.push('/');
            }
        } catch (error) {
            console.error('Error signing up:', error);
            setError('Error signing up');
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
            <div className="h-screen flex items-center justify-center bg-custom-yellow p-6 relative overflow-hidden">
                <BackgroundImages count={42} imageSize={50} />
                <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md w-96 text-center z-50">
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
            <div className="bg-custom-dark p-8 rounded-lg shadow-md width-100 z-50 flex items-center justify-center ">
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
                <div className="bg-custom-dark p-8 rounded-lg shadow-md w-96 z-50 	">

                    {error && (
                        <p className="mb-4 text-sm font-bold text-red-500 text-center">
                            {error}
                        </p>
                    )}

                    <div className=' w-80 flex justify-between'>
                        <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            className="mr-1 mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            className="ml-1 mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    />
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
                        onClick={handleSignUp}
                        className="w-full mb-2 p-3 rounded-md bg-custom-yellow text-white hover:bg-gray-600 focus:outline-none"
                    >
                        Sign Up
                    </button>
                    <h1 className='text-white text-center text-sm pt-2'>Already have an account? <Link className='text-custom-yellow' href={'/login'}>Login</Link></h1>
                </div>
            </div>
        </main>
    );
}
