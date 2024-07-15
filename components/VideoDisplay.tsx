// File: components/videoPlayer.tsx
import React, { useContext, useRef } from "react";
import ReactPlayer from "react-player";
import {
	Context_query,
	Context_results,
	Context_selectedVideo,
	Context_channelVideos,
	Context_isDrawerOpen,
	Context_playing,
	Context_volume,
	Context_oldVolume,
	Context_played,
	Context_playerRefs,
	Context_highlightedCardId,
	Context_shuffle,
	Context_repeatMode,
	Context_favorites,
	Context_url,
	Context_message,
	Context_downloadProgress,
	Context_isDownloading,
	Context_isDesktop
} from '../app/home';


export default function VideoPlayer() {
	const queryContext = useContext(Context_query);
	const resultsContext = useContext(Context_results);
	const selectedVideoContext = useContext(Context_selectedVideo);
	const channelVideosContext = useContext(Context_channelVideos);
	const isDrawerOpenContext = useContext(Context_isDrawerOpen);
	const playingContext = useContext(Context_playing);
	const volumeContext = useContext(Context_volume);
	const oldVolumeContext = useContext(Context_oldVolume);
	const playedContext = useContext(Context_played);
	const highlightedCardIdContext = useContext(Context_highlightedCardId);
	const shuffleContext = useContext(Context_shuffle);
	const repeatModeContext = useContext(Context_repeatMode);
	const favoritesContext = useContext(Context_favorites);
	const urlContext = useContext(Context_url);
	const messageContext = useContext(Context_message);
	const downloadProgressContext = useContext(Context_downloadProgress);
	const isDownloadingContext = useContext(Context_isDownloading);
	const playerRefsContext = useContext(Context_playerRefs);
	const isDesktopContext = useContext(Context_isDesktop);
	const isDesktop = isDesktopContext;


	const { selectedVideo, setSelectedVideo } = selectedVideoContext;
	const { channelVideos, setChannelVideos } = channelVideosContext;
	const { playing, setPlaying } = playingContext;
	const { played, setPlayed } = playedContext;
	const { shuffle, setShuffle } = shuffleContext;
	const { repeatMode, setRepeatMode } = repeatModeContext;

	// Create a local ref if the context is not available
	const localPlayerRefs = useRef<{ [key: string]: ReactPlayer | null }>({});
	// Use the context ref if available, otherwise use the local ref
	const playerRefs = playerRefsContext || localPlayerRefs;




	if (!queryContext || !resultsContext || !selectedVideoContext || !channelVideosContext || !isDrawerOpenContext || !playingContext || !volumeContext || !oldVolumeContext || !playedContext || !highlightedCardIdContext || !shuffleContext || !repeatModeContext || !favoritesContext || !urlContext || !messageContext || !downloadProgressContext || !isDownloadingContext) {
		return <div>Loading...</div>; // or some other placeholder
	}
	if (!selectedVideoContext || !playingContext || !volumeContext || !playedContext || !playerRefsContext) {
		return null;
	}

	if (!selectedVideo) {
		return null; // or return a placeholder component
	}

	const handleVideoEnd = () => {

		if (repeatMode === 'repeat-one') {
			playerRefs.current['player2']?.seekTo(0, 'fraction');
			playerRefs.current['player1']?.seekTo(0, 'fraction');
			setPlaying(true);
		} else if (repeatMode === 'repeat-all') {
			const currentIndex = channelVideos.findIndex(video => video.id.videoId === selectedVideo.id.videoId);
			if (currentIndex < channelVideos.length - 1) {
				setSelectedVideo(channelVideos[currentIndex + 1]);
			} else {
				setSelectedVideo(channelVideos[0]); // Start from the first video when the list ends
			}
			setPlaying(true);
		} else {
			setPlaying(false);
		}
		if (shuffle === 'shuffle') {
			// Pick a random video from the list
			const randomIndex = Math.floor(Math.random() * channelVideos.length);
			setSelectedVideo(channelVideos[randomIndex]);
			setPlaying(true);
		}
	};


	return (
		<div className={`bg-custom-dark mt-5 relative flex flex-col items-center justify-center ${isDesktop ? 'w-[1080px] h-[97%] pb-[100px]' : 'rounded-sm h-[300px]'}`}>
			<ReactPlayer
				ref={playerRefs.current['player1']}
				url={`https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`}
				playing={playing}
				controls={false}
				width="100%"
				height="100%"
				volume={0}
				played={played}
				onProgress={(progress) => setPlayed(progress.played)}
				onEnded={handleVideoEnd}
				config={{
					youtube: {
						playerVars: {
							controls: 0,
							modestbranding: 1,
							rel: 0,
							showinfo: 0,
						},
					},
				}}
			/>
			<div className={`absolute w-full  top-0 left-0 z-10 ${isDesktop ? 'w-[1080px] h-[87%]' : 'h-full'}`}></div>
		</div>
	);
}