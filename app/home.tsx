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
import { useMediaQuery } from "usehooks-ts";
import Image from "next/image";
import AllContextsProvider from "@/components/AllContextsProvider";

// Create the isDesktop context
export const Context_isDesktop = createContext<boolean | null>(null);

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



function useIsDesktop() {
    const isDesktop = useMediaQuery('(min-width: 640px)', { initializeWithValue: false });
    return isDesktop;
}


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



    // Custom hook for isDesktop
    const isDesktop = useIsDesktop();



    const contexts = [
        [Context_user, { user, setUser }],
        [Context_email, { email, setEmail }],
        [Context_password, { password, setPassword }],
        [Context_error, { error, setError }],
        [Context_loading, { loading, setLoading }],
        [Context_query, { query, setQuery }],
        [Context_results, { results, setResults }],
        [Context_results_Songs, { resultsSong, setResultsSong }],
        [Context_results_Channels, { resultsChannel, setResultsChannel }],
        [Context_selectedVideo, { selectedVideo, setSelectedVideo }],
        [Context_channelVideos, { channelVideos, setChannelVideos }],
        [Context_isDrawerOpen, { isDrawerOpen, setIsDrawerOpen }],
        [Context_playing, { playing, setPlaying }],
        [Context_volume, { volume, setVolume }],
        [Context_oldVolume, { oldVolume, setOldVolume }],
        [Context_played, { played, setPlayed }],
        [Context_playerRefs,  playerRefs ],
        [Context_highlightedCardId, { highlightedCardId, setHighlightedCardId }],
        [Context_shuffle, { shuffle, setShuffle }],
        [Context_repeatMode, { repeatMode, setRepeatMode }],
        [Context_favorites, { favorites, setFavorites }],
        [Context_url, { url, setUrl }],
        [Context_message, { message, setMessage }],
        [Context_downloadProgress, { downloadProgress, setDownloadProgress }],
        [Context_isDownloading, { isDownloading, setIsDownloading }],
        [Context_highlightedChannelId, { highlightedChannelId, setHighlightedChannelId }],
        [Context_downloadedVideos, { downloadedVideos, setDownloadedVideos }],
        [Context_suggestions, { suggestions, setSuggestions }],
        [Context_isFocused, { isFocused, setIsFocused }],
        [Context_showSuggestions, { showSuggestions, setShowSuggestions }],
        [Context_isDesktop,  isDesktop ],
    ];

    return (
        <AllContextsProvider contexts={contexts}>
            <div className="bg-custom-dark">

                {isDesktop ? null :
                    <div className="pt-3 fixed top-0 bg-custom-dark w-full h-full">
                        <Image src="/logo-text.png" alt="logo" className='mx-3' width={100} height={100} priority />
                    </div>
                }

                <Sidebar />

                <main className={`sm:ml-[270px] bg-custom-dark ${isDesktop ? '' : 'mt-[45px]'} fixed top-0 left-0 w-full h-full overflow-auto`}>
                    <div className="relative"> 
                        {children}
                    </div>
                </main>

                <FooterSection />
                <VideoPlayer />
            </div>
        </AllContextsProvider>


    );
}