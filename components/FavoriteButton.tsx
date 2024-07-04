import { Heart } from 'lucide-react';
import { Button } from './ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import  { Context_favorites } from "../app/home"
import { useContext } from 'react';



export default function FavoriteButton( {item} ) {

	const favoriteContext = useContext(Context_favorites);

	if (!favoriteContext) {
		return null;
	}

	const {favorites, setFavorites} = favoriteContext;


	const handleFavoriteClick = async (videoId: string) => {
		const supabase = createClientComponentClient();
		const { data: { user } } = await supabase.auth.getUser();

		if (user) {
			let updatedFavorites = [...favorites];
			if (favorites.includes(videoId)) {
				// Remove from favorites
				updatedFavorites = updatedFavorites.filter(id => id !== videoId);
			} else {
				// Add to favorites
				updatedFavorites.push(videoId);
			}

			const { data, error } = await supabase
				.from('profiles')
				.update({ listOfSongs: updatedFavorites })
				.eq('id', user.id);

			if (error) {
				console.error(error);
			} else {
				setFavorites(updatedFavorites); // Update the local state
			}
		}
	};




	return (
		<button
			onClick={(e) => {
				e.stopPropagation();
				handleFavoriteClick(item.id.videoId);
			}}
			className="absolute top-2 right-2 text-white`"
		>
			{favorites.includes(item.id.videoId) ? (
				<Heart className="text-red-500 fill-red-500" />
			) : (
				<Heart className="text-white" />
			)}
		</button>
	);

}