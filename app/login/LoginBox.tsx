import Link from 'next/link';

import { Context_email, Context_password, Context_error } from "@/app/login/page"
import { useContext } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginBox({supabase}) {

	const emailContext = useContext(Context_email);
	const passwordContext = useContext(Context_password);
	const errorContext = useContext(Context_error);


	const { email, setEmail } = emailContext || {};
	const { password, setPassword } = passwordContext || {};
	const { error, setError } = errorContext || {};


	const router = useRouter();

    const handleSignIn = async () => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            if (error) {
                setError('Invalid Email or Password');
                setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
                return;
            }
            router.push('/home');
            router.refresh();
        } catch (error) {
            console.error('Error signing in:', error);
            setError('Error signing in');
            setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
        }
    };

	return (
		<div className="pt-8 rounded-lg  w-auto max-w-80 z-50 relative flex-col items-center justify-center">
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
				className="w-full mb-2 p-3 rounded-md bg-custom-yellow text-white hover:bg-gray-600 focus:outline-none"
			>
				Sign In
			</button>
			<h1 className='text-white text-center text-sm pt-2'>Don&apos;t have account? <Link className='text-custom-yellow' href={'/signup'}>SignUp</Link></h1>
			<h1 className='text-white text-center text-sm pt-2'>Forgot Password? <Link className='text-custom-yellow' href={'/forgot-password'}>Reset</Link></h1>
		</div>
	);

};