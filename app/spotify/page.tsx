




export default function Home() {
	const client_id: string = '1815ffc96d104567b91e1173f0b99a26';
	const client_secret: string = 'a0c4d82278ae46d8a67110dc5c28d396';

	interface AuthOptions {
		url: string;
		headers: {
			'Authorization': string;
			'Content-Type': string;
		};
		body: string;
	}

	const authOptions: AuthOptions = {
		url: 'https://accounts.spotify.com/api/token',
		headers: {
			'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			grant_type: 'client_credentials'
		}).toString(),
	};

	fetch(authOptions.url, {
		method: 'POST',
		headers: authOptions.headers,
		body: authOptions.body,
	})
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			const token: string = data.access_token;
			console.log('Access token:', token);
		})
		.catch(error => {
			console.error('Error fetching access token:', error);
		});


	return (
		<div>
			<h1>Spotify</h1>
		</div>
	);
}