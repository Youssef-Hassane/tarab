// login/page.tsx
'use client';
import { useState, useEffect, useMemo, createContext } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import BackgroundImages from '@/components/BackBroundImages';
import LoginBoxImage from '@/components/LoginBoxImage';
import LoginBox from './LoginBox';
import AllContextsProvider from '@/components/AllContextsProvider';


/* login page */
export const Context_email = createContext(null);
export const Context_password = createContext(null);
export const Context_error = createContext(null);
export const Context_loggedInSuccessfully = createContext(null);
export const Context_router = createContext(null);
export const Context_user = createContext(null);
export const Context_loading = createContext(null);


export default function LoginPage() {

    /* login page */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loggedInSuccessfully, setLoggedInSuccessfully] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createClientComponentClient();

    useEffect(() => {
        async function getUser() {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        }
        getUser();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
        setUser(null);
    };

    if (user) {
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

    const contexts = [
        [Context_email, { email, setEmail }],
        [Context_password, { password, setPassword }],
        [Context_error, { error, setError }],
        [Context_user, { user, setUser }],
        [Context_loading, { loading, setLoading }],
        [Context_loggedInSuccessfully, { loggedInSuccessfully, setLoggedInSuccessfully }],
    ];

    return (
        <AllContextsProvider contexts={contexts}>
            <main className="h-screen flex items-center justify-center bg-custom-yellow p-6 relative overflow-hidden">
                <BackgroundImages count={42} imageSize={50} />
                <div className='bg-custom-dark p-8 rounded-lg shadow-md z-50 flex flex-col items-center justify-center h-[37em] md:h-[25em] md:flex-row md:w-auto w-[97%] '>
                    <LoginBoxImage />
                    <LoginBox supabase={supabase} />
                </div>
            </main>
        </AllContextsProvider>
    );
}
