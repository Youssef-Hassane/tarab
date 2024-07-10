// File: app/home.tsx
'use client';

import React, { useRef, useState, createContext, useEffect } from "react";
import ReactPlayer from "react-player";
import { Sidebar } from '@/components/sidebar/sidebar';
import FooterSection from '@/components/footer';
import VideoPlayer from "@/components/videoPlayer";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect, useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';


// Create contexts
export const Context_query = createContext(null);
export const Context_results = createContext(null);
export const Context_results_Songs = createContext(null);
export const Context_results_Channels = createContext(null);
export const Context_selectedVideo = createContext(null);
export const Context_channelVideos = createContext(null);
export const Context_isDrawerOpen = createContext(null);
export const Context_playing = createContext(null);
export const Context_volume = createContext(null);
export const Context_oldVolume = createContext(null);
export const Context_played = createContext(null);
export const Context_playerRefs = createContext(null);
export const Context_highlightedCardId = createContext(null);
export const Context_shuffle = createContext(null);
export const Context_repeatMode = createContext(null);
export const Context_favorites = createContext(null);
export const Context_url = createContext(null);
export const Context_message = createContext(null);
export const Context_downloadProgress = createContext(null);
export const Context_isDownloading = createContext(null);
export const Context_highlightedChannelId = createContext(null);
export const Context_downloadedVideos = createContext(null);
export const Context_suggestions = createContext(null);
export const Context_isFocused = createContext(null);
export const Context_showSuggestions = createContext(null);

/* login page */
export const Context_email = createContext(null);
export const Context_password = createContext(null);
export const Context_error = createContext(null);
export const Context_router = createContext(null);
export const Context_user = createContext(null);
export const Context_loading = createContext(null);


export default function HomePage({ children }: { children: React.ReactNode }) {
    const [query, setQuery] = useState('');
    const [resultsSong, setResultsSong] = useState([]);
    const [results, setResults] = useState([]);
    const [resultsChannel, setResultsChannel] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState<any>(null);
    const [channelVideos, setChannelVideos] = useState<any[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.6);
    const [oldVolume, setOldVolume] = useState(0.8);
    const [played, setPlayed] = useState(0);
    const playerRefs = useRef<{ [key: string]: ReactPlayer | null }>({});
    const [highlightedCardId, setHighlightedCardId] = useState(null);
    const [shuffle, setShuffle] = useState<'off' | 'shuffle'>('off');
    const [repeatMode, setRepeatMode] = useState<'off' | 'repeat-all' | 'repeat-one'>('off');
    const [favorites, setFavorites] = useState([]);
    const [url, setUrl] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);
    const [highlightedChannelId, setHighlightedChannelId] = useState<string | null>(null); // Track highlighted channel card ID
    const [downloadedVideos, setDownloadedVideos] = useState<any[]>([]);
    const [suggestions, setSuggestions] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);


    /* login page */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);







    return (
        <Context_user.Provider value={{ user, setUser }}>
            <Context_email.Provider value={{ email, setEmail }}>
                <Context_password.Provider value={{ password, setPassword }}>
                    <Context_error.Provider value={{ error, setError }}>
                        <Context_loading.Provider value={{ loading, setLoading }}>
                            <Context_query.Provider value={{ query, setQuery }}>
                                <Context_results.Provider value={{ results, setResults }}>
                                    <Context_results_Songs.Provider value={{ resultsSong, setResultsSong }}>
                                        <Context_results_Channels.Provider value={{ resultsChannel, setResultsChannel }}>
                                            <Context_selectedVideo.Provider value={{ selectedVideo, setSelectedVideo }}>
                                                <Context_channelVideos.Provider value={{ channelVideos, setChannelVideos }}>
                                                    <Context_isDrawerOpen.Provider value={{ isDrawerOpen, setIsDrawerOpen }}>
                                                        <Context_playing.Provider value={{ playing, setPlaying }}>
                                                            <Context_volume.Provider value={{ volume, setVolume }}>
                                                                <Context_oldVolume.Provider value={{ oldVolume, setOldVolume }}>
                                                                    <Context_played.Provider value={{ played, setPlayed }}>
                                                                        <Context_playerRefs.Provider value={playerRefs}>
                                                                            <Context_highlightedCardId.Provider value={{ highlightedCardId, setHighlightedCardId }}>
                                                                                <Context_shuffle.Provider value={{ shuffle, setShuffle }}>
                                                                                    <Context_repeatMode.Provider value={{ repeatMode, setRepeatMode }}>
                                                                                        <Context_favorites.Provider value={{ favorites, setFavorites }}>
                                                                                            <Context_url.Provider value={{ url, setUrl }}>
                                                                                                <Context_message.Provider value={{ message, setMessage }}>
                                                                                                    <Context_downloadProgress.Provider value={{ downloadProgress, setDownloadProgress }}>
                                                                                                        <Context_isDownloading.Provider value={{ isDownloading, setIsDownloading }}>
                                                                                                            <Context_highlightedChannelId.Provider value={{ highlightedChannelId, setHighlightedChannelId }}>
                                                                                                                <Context_downloadedVideos.Provider value={{ downloadedVideos, setDownloadedVideos }}>
                                                                                                                    <Context_suggestions.Provider value={{ suggestions, setSuggestions }}>
                                                                                                                        <Context_isFocused.Provider value={{ isFocused, setIsFocused }}>
                                                                                                                            <Context_showSuggestions.Provider value={{ showSuggestions, setShowSuggestions }}>
                                                                                                                                <div className="bg-custom-dark">
                                                                                                                                    <Sidebar />
                                                                                                                                    
                                                                                                                                    <main className="sm:ml-[270px] bg-custom-dark">
                                                                                                                                        {children}

                                                                                                                                    </main>


                                                                                                                                    <FooterSection />
                                                                                                                                    <VideoPlayer />
                                                                                                                                </div>
                                                                                                                            </Context_showSuggestions.Provider>
                                                                                                                        </Context_isFocused.Provider>
                                                                                                                    </Context_suggestions.Provider>
                                                                                                                </Context_downloadedVideos.Provider>
                                                                                                            </Context_highlightedChannelId.Provider>
                                                                                                        </Context_isDownloading.Provider>
                                                                                                    </Context_downloadProgress.Provider>
                                                                                                </Context_message.Provider>
                                                                                            </Context_url.Provider>
                                                                                        </Context_favorites.Provider>
                                                                                    </Context_repeatMode.Provider>
                                                                                </Context_shuffle.Provider>
                                                                            </Context_highlightedCardId.Provider>
                                                                        </Context_playerRefs.Provider>
                                                                    </Context_played.Provider>
                                                                </Context_oldVolume.Provider>
                                                            </Context_volume.Provider>
                                                        </Context_playing.Provider>
                                                    </Context_isDrawerOpen.Provider>
                                                </Context_channelVideos.Provider>
                                            </Context_selectedVideo.Provider>
                                        </Context_results_Channels.Provider>
                                    </Context_results_Songs.Provider>
                                </Context_results.Provider>
                            </Context_query.Provider>
                        </Context_loading.Provider>
                    </Context_error.Provider>
                </Context_password.Provider>
            </Context_email.Provider>
        </Context_user.Provider>

    );
}