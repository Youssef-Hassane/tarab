

import {
	Context_email,
	Context_password,
	Context_firstName,
	Context_lastName,
	Context_username,
	Context_error
} from '@/app/signup/page';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useContext } from 'react';


export default function SignUpBox({ supabase }) {

	const emailContext = useContext(Context_email);
	const passwordContext = useContext(Context_password);
	const firstNameContext = useContext(Context_firstName);
	const lastNameContext = useContext(Context_lastName);
	const usernameContext = useContext(Context_username);
	const errorContext = useContext(Context_error);

	const { email, setEmail } = emailContext || {};
	const { password, setPassword } = passwordContext || {};
	const { firstName, setFirstName } = firstNameContext || {};
	const { lastName, setLastName } = lastNameContext || {};
	const { username, setUsername } = usernameContext || {};
	const { error, setError } = errorContext || {};

	const router = useRouter();

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
				setTimeout(() => setError(''), 3000); // Clear error after 3 seconds

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
					setTimeout(() => setError(''), 3000); // Clear error after 3 seconds

					return;
				}

				router.push('/login');
			}
		} catch (error) {
			console.error('Error signing up:', error);
			setError('Error signing up');
			setTimeout(() => setError(''), 3000); // Clear error after 3 seconds

		}
	};

	return (
		<div className="pt-8 rounded-lg  w-auto max-w-80 z-50 relative flex-col items-center justify-center">
			{error && (
				<p className="mb-4 text-sm font-bold text-red-500 text-center">
					{error}
				</p>
			)}
			<div className='w-auto  flex justify-between'>
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
	)

}