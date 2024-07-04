// File: components/videoPlayer.tsx
import React, { useContext } from "react";
import ReactPlayer from "react-player";
import {
	Context_selectedVideo,
	Context_isDrawerOpen,
	Context_playing,
	Context_volume,
	Context_played,
	Context_playerRefs,
	Context_repeatMode,
	Context_channelVideos,
	Context_shuffle,
} from '../app/home';

export default function VideoPlayer() {
	const selectedVideoContext = useContext(Context_selectedVideo);
	const isDrawerOpenContext = useContext(Context_isDrawerOpen);
	const playingContext = useContext(Context_playing);
	const volumeContext = useContext(Context_volume);
	const playedContext = useContext(Context_played);
	const playerRefsContext = useContext(Context_playerRefs);
	const repeatModeContext = useContext(Context_repeatMode);
	const channelVideosContext = useContext(Context_channelVideos);
	const shuffleContext = useContext(Context_shuffle);

	if (!selectedVideoContext || !isDrawerOpenContext || !playingContext || !volumeContext || !playedContext || !playerRefsContext || !repeatModeContext || !channelVideosContext || !shuffleContext) {
		return null;
	}

	const { selectedVideo, setSelectedVideo } = selectedVideoContext;
	const { isDrawerOpen } = isDrawerOpenContext;
	const { playing, setPlaying } = playingContext;
	const { volume } = volumeContext;
	const { played, setPlayed } = playedContext;
	const { repeatMode } = repeatModeContext;
	const { channelVideos } = channelVideosContext;
	const { shuffle } = shuffleContext;

	if (!selectedVideo) {
		return null;
	}

	const handleVideoEnd = () => {
		if (repeatMode === 'repeat-one') {
			playerRefsContext.current['player']?.seekTo(0, 'fraction');
			setPlaying(true);
		} else if (repeatMode === 'repeat-all') {
			const currentIndex = channelVideos.findIndex(video => video.id.videoId === selectedVideo.id.videoId);
			if (currentIndex < channelVideos.length - 1) {
				setSelectedVideo(channelVideos[currentIndex + 1]);
			} else {
				setSelectedVideo(channelVideos[0]);
			}
			setPlaying(true);
		} else {
			setPlaying(false);
		}
		if (shuffle === 'shuffle') {
			const randomIndex = Math.floor(Math.random() * channelVideos.length);
			setSelectedVideo(channelVideos[randomIndex]);
			setPlaying(true);
		}
	};

	return (
		<ReactPlayer
			ref={el => {
				if (playerRefsContext && playerRefsContext.current) {
					playerRefsContext.current['player'] = el;
				}
			}}
			url={`https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`}
			playing={playing}
			controls={false}
			width={"0"}
			height={"0"}
			volume={volume}
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
	);
}