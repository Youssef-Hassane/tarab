'use client';
import { useState, useEffect, createContext } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import BackgroundImages from '@/components/BackBroundImages';
import LoginBoxImage from '@/components/LoginBoxImage';
import AllContextsProvider from '@/components/AllContextsProvider';
import SignUpBox from './SignUpBox';

/* sign up page */
export const Context_email = createContext(null);
export const Context_password = createContext(null);
export const Context_firstName = createContext(null);
export const Context_lastName = createContext(null);
export const Context_username = createContext(null);
export const Context_error = createContext(null);

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
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

    useEffect(() => {
        if (!loading && user) {
            router.push('/home');
        }
    }, [loading, user]);

    const contexts = [
        [Context_email, { email, setEmail }],
        [Context_password, { password, setPassword }],
        [Context_firstName, { firstName, setFirstName }],
        [Context_lastName, { lastName, setLastName }],
        [Context_username, { username, setUsername }],
        [Context_error, { error, setError }],
    ];

    return (
        <AllContextsProvider contexts={contexts}>
            <main className="h-screen flex items-center justify-center bg-custom-yellow p-6 relative overflow-hidden">
                <BackgroundImages count={42} imageSize={50} />
                <div className="bg-custom-dark p-8 rounded-lg shadow-md width-100 z-50 flex flex-col items-center justify-center md:flex-row md:w-auto w-[97%]">
                    <LoginBoxImage />
                    <SignUpBox supabase={supabase} />
                </div>
            </main>
        </AllContextsProvider>
    );
}
