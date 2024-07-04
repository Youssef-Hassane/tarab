
import truncateText from '@/utils/truncateText';
import { Context_highlightedCardId, Context_highlightedChannelId } from '../app/home';
import { useContext } from 'react';

export default function NameOfSong({ item, where }) {

	const highlightedCardIdContext = useContext(Context_highlightedCardId);
	const highlightedChannelIdContext = useContext(Context_highlightedChannelId);


	if (!highlightedCardIdContext || !highlightedChannelIdContext) {
		return null;
	}

	const { highlightedCardId, setHighlightedCardId } = highlightedCardIdContext;
	const { highlightedChannelId, setHighlightedChannelId } = highlightedChannelIdContext;

	const theName = (where) => {
		if (where === 'try') {
			return (
				<h1 className={`text-[16px] ${highlightedCardId === item.id.videoId ? 'text-custom-dark' : 'text-white'} group-hover:text-custom-dark`}>
					{truncateText(item.snippet.title, 30)}
				</h1>
			)
		} else if (where === 'artists') {
			return (
				<h1 className={`text-[16px] ${highlightedChannelId === item.id.channelId ? 'text-custom-dark' : 'text-white'}`}>
					{truncateText(item.snippet.title, 30)}
				</h1>
			)
		}
	}

	return (
		<>
			{theName(where)}
		</>
	)
}