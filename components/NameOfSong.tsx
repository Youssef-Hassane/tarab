
import truncateText from '@/utils/truncateText';
import { Context_highlightedCardId, Context_highlightedChannelId, Context_isDesktop } from '../app/home';
import { useContext } from 'react';

export default function NameOfSong({ item, where }) {

	const isDesktopContext = useContext(Context_isDesktop);
	const isDesktop = isDesktopContext;

	const highlightedCardIdContext = useContext(Context_highlightedCardId);
	const highlightedChannelIdContext = useContext(Context_highlightedChannelId);


	if (!highlightedCardIdContext || !highlightedChannelIdContext) {
		return null;
	}

	const { highlightedCardId, setHighlightedCardId } = highlightedCardIdContext;
	const { highlightedChannelId, setHighlightedChannelId } = highlightedChannelIdContext;

	const theName = (where) => {
		if (where === 'try' || where === 'MobileTry') {
			return (
				<h1 className={`${isDesktop ? 'text-[16px]' : 'text-[12px]'} ${highlightedCardId === item.id.videoId ? 'text-custom-dark' : 'text-white'} group-hover:text-custom-dark`}>
					{isDesktop ? truncateText(item.snippet.title, 30) : truncateText(item.snippet.title, 13)}
				</h1>
			)
		} else if (where === 'artists' || where === 'Mobile') {
			return (
				<h1 className={`${isDesktop ? 'text-[16px]' : 'text-[12px]'} ${highlightedChannelId === item.id.channelId ? 'text-custom-dark' : 'text-white'}`}>
					{truncateText(item.snippet.title, 13)}
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