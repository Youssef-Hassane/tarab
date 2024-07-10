// File: components/SearchSection.tsx
import { Button } from "./ui/button";
import { Context_query, Context_results, Context_suggestions, Context_isFocused, Context_showSuggestions } from "../app/home";
import { useContext, useEffect, useRef } from "react";
import { SearchForVideosFetch, SearchForChannelsFetch, FetchSuggestionsVideos, FetchSuggestionsChannels } from '@/utils/fetchData';
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import ListOfSuggestions from "./suggestions";
import { usePathname } from 'next/navigation';
import { useMediaQuery } from 'usehooks-ts';

export default function SearchSection({ where, pathname }) {
    const queryContext = useContext(Context_query);
    const resultsContext = useContext(Context_results);
    const suggestionsContext = useContext(Context_suggestions);
    const isFocusedContext = useContext(Context_isFocused);
    const showSuggestionsContext = useContext(Context_showSuggestions);



    const { query, setQuery } = queryContext;
    const { results, setResults } = resultsContext;
    const { suggestions, setSuggestions } = suggestionsContext;
    const { isFocused, setIsFocused } = isFocusedContext;
    const { showSuggestions, setShowSuggestions } = showSuggestionsContext;

    const searchContainerRef = useRef(null);

    const isDesktop = useMediaQuery('(min-width: 640px)', { initializeWithValue: false });

    const SearchForVideos = async () => {
        const results = await SearchForVideosFetch(query);
        setResults(results);
    };

    const SearchChannels = async () => {
        const results = await SearchForChannelsFetch(query);
        setResults(results);
    };

    const handleSearch = () => {
        if (where === "search") {
            SearchForVideos();
        } else if (where === "artists") {
            SearchChannels();
        }
        setShowSuggestions(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion.snippet.title);
        handleSearch();
    };

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.trim() !== "") {
                if (where === "search") {
                    const suggestions = await FetchSuggestionsVideos(query);
                    setSuggestions(suggestions);
                    setShowSuggestions(true);
                } else if (where === "artists") {
                    const suggestions = await FetchSuggestionsChannels(query);
                    setSuggestions(suggestions);
                    setShowSuggestions(true);
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchSuggestions();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query, where, setSuggestions, setShowSuggestions]);

    useEffect(() => {
        if (isFocused) {
            setShowSuggestions(true);
        } else {
            setTimeout(() => setShowSuggestions(false), 300);
        }
    }, [isFocused, setShowSuggestions]);

    useEffect(() => {
        setShowSuggestions(false);
    }, [where, setShowSuggestions]);

    useEffect(() => {
        // Reset states when the pathname changes
        setShowSuggestions(false);
        setIsFocused(false);
        setSuggestions([]);
        setQuery('');
    }, [pathname, setShowSuggestions, setIsFocused, setSuggestions]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setShowSuggestions(false);
                setIsFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setShowSuggestions, setIsFocused]);

    if (!queryContext || !resultsContext || !suggestionsContext || !isFocusedContext || !showSuggestionsContext) {
        return null;
    }

    return (
        <div ref={searchContainerRef} className={`search-container relative flex items-center h-full  gap-2 justify-center ${!isDesktop ? 'w-full' : 'w-full pl-5 pr-5'}`}>
            <div className={`flex items-center h-full  gap-2 justify-center ${!isDesktop ? 'w-full p-3' : 'w-full pl-5 pr-5'}`}>
                <input
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`bg-gray-700 text-white text-[16px] max-w-[600px] h-[40px] rounded-sm p-3 focus-visible:outline-none ${!isDesktop ? 'w-full' : 'w-full'}`}
                />
                
                {isDesktop && (
                    <Button
                        onClick={handleSearch}
                        className="bg-custom-yellow text-custom-dark hover:text-custom-yellow w-[150px]"
                    >
                        Search
                    </Button>
                )}
            </div>
            {/* suggestions container */}
            {isDesktop && (
            <div
                className={`pt-2 absolute z-50 top-[49px] max-w-[600px] w-full rounded-b-lg overflow-hidden -ml-[158px] transition-all duration-300 ${showSuggestions && suggestions.length > 0 ? 'h-[400px] opacity-100' : 'h-0 opacity-0'
                    } bg-gray-700`}
            >
                <ScrollArea className="absolute max-w-[600px] w-full bg-gray-700 h-full z-50">
                    <div className="p-2">
                        {suggestions && suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className={`group flex items-center gap-2 p-2 hover:bg-custom-yellow hover:text-custom-dark rounded-sm cursor-pointer`}
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                <ListOfSuggestions suggestion={suggestion} />
                            </div>
                        ))}
                    </div>
                    <ScrollBar orientation="vertical" />
                </ScrollArea>
            </div>
            )}
        </div>
    )
}