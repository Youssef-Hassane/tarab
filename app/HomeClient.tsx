// // File: app/HomeClient.tsx
// import React, { useState, useRef } from 'react';
// import ExploreSection from '@/components/ExploreSection';
// import ArtistsSection from '@/components/ArtistsSection';
// import SongsSection from '@/components/SongsSection';
// import AlbumsSection from '@/components/AlbumsSection';
// import FooterSection from '@/components/footer';
// import { Slider } from '@/components/ui/slider';

// export default function HomeClient({ user }) {
//   const [playing, setPlaying] = useState(false);
//   const [volume, setVolume] = useState(0.6);
//   const [oldVolume, setOldVolume] = useState(0.8);
//   const [played, setPlayed] = useState(0);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [channelVideos, setChannelVideos] = useState([]);
//   const playerRef = useRef(null);

//   const handleSkipBack = () => {
//     if (channelVideos.length > 0 && selectedVideo) {
//       const currentIndex = channelVideos.findIndex(video => video.id.videoId === selectedVideo.id.videoId);
//       if (currentIndex > 0) {
//         setSelectedVideo(channelVideos[currentIndex - 1]);
//       }
//     }
//   };

//   const handleSkipForward = () => {
//     if (channelVideos.length > 0 && selectedVideo) {
//       const currentIndex = channelVideos.findIndex(video => video.id.videoId === selectedVideo.id.videoId);
//       if (currentIndex < channelVideos.length - 1) {
//         setSelectedVideo(channelVideos[currentIndex + 1]);
//       }
//     }
//   };

//   const ProgressBar = () => {
//     const handleSeek = (value) => {
//       const player = playerRef.current;
//       if (player) {
//         player.seekTo(value, 'fraction');
//       }
//     };

//     return (
//       <Sliders
//         value={[played * 100]}
//         onValueChange={(value) => handleSeek(value[0] / 100)}
//         className="w-full"
//         min={0}
//         max={100}
//       />
//     );
//   };

//   return (
//     <main className="w-full h-screen bg-custom-dark">
//       <div className="h-auto w-full flex flex-col gap-2 justify-center items-center bg-custom-dark p-2">
//         <ExploreSection />
//         <ArtistsSection />
//         <SongsSection />
//         <AlbumsSection />
//         <FooterSection
//           selectedVideo={selectedVideo}
//           playing={playing}
//           setPlaying={setPlaying}
//           handleSkipBack={handleSkipBack}
//           handleSkipForward={handleSkipForward}
//           volume={volume}
//           setVolume={setVolume}
//           oldVolume={oldVolume}
//           setOldVolume={setOldVolume}
//           ProgressBar={ProgressBar}
//         />
//       </div>
//     </main>
//   );
// }
