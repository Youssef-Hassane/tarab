// components/DownloadButton.tsx
import { useState, useEffect, useContext } from 'react';
import { Check, CloudDownload } from 'lucide-react';
import {
  Context_selectedVideo,
  Context_isDownloading,
  Context_downloadProgress,
  Context_message,
  Context_url,
  Context_highlightedCardId,
  Context_downloadedVideos
} from '../app/home';
import { CircularProgress, CircularProgressSmall } from '@/components/CircularProgress';

export default function DownloadButton({ type, video }) {
  const isDownloadingContext = useContext(Context_isDownloading);
  const downloadProgressContext = useContext(Context_downloadProgress);
  const messageContext = useContext(Context_message);
  const selectedVideoContext = useContext(Context_selectedVideo);
  const urlContext = useContext(Context_url);
  const highlightedCardIdContext = useContext(Context_highlightedCardId);
  const downloadedVideosContext = useContext(Context_downloadedVideos);

  const [isDownloaded, setIsDownloaded] = useState(false);

  if (!urlContext || !selectedVideoContext || !isDownloadingContext || !downloadProgressContext || !messageContext || !downloadedVideosContext || !highlightedCardIdContext || !video) {
    return null;
  }

  const { selectedVideo, setSelectedVideo } = selectedVideoContext;
  const { isDownloading, setIsDownloading } = isDownloadingContext;
  const { downloadProgress, setDownloadProgress } = downloadProgressContext;
  const { message, setMessage } = messageContext;
  const { url } = urlContext;
  const { highlightedCardId } = highlightedCardIdContext;
  const { downloadedVideos, setDownloadedVideos } = downloadedVideosContext;

  const videoId = video.id?.videoId || video.id || '';

  useEffect(() => {
    const checkDownloadStatus = async () => {
      if (!videoId) return;

      // First, check localStorage
      const storedDownloadStatus = localStorage.getItem(`downloaded_${videoId}`);
      if (storedDownloadStatus === 'true') {
        setIsDownloaded(true);
        return;
      }

      // If not in localStorage, check with the server
      try {
        const response = await fetch(`/api/check-download?videoId=${videoId}`);
        if (!response.ok) {
          throw new Error('Failed to check download status');
        }
        const data = await response.json();
        setIsDownloaded(data.downloaded);
        
        // Update localStorage
        localStorage.setItem(`downloaded_${videoId}`, data.downloaded.toString());
      } catch (error) {
        console.error('Error checking download status:', error);
      }
    };

    checkDownloadStatus();
  }, [videoId]);

  const handleDownload = async () => {
    if (!videoId) return;

    setIsDownloading(true);
    setDownloadProgress(0);
    setMessage('');

    try {
      const response = await fetch(`/api/download?url=${encodeURIComponent(url)}&videoId=${videoId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body is not readable');
      }

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const progress = decoder.decode(value).trim();
        setDownloadProgress(parseInt(progress));
      }

      setDownloadedVideos([...downloadedVideos, videoId]);
      setIsDownloaded(true);
      // Update localStorage
      localStorage.setItem(`downloaded_${videoId}`, 'true');
      setMessage('Download complete. Check your Downloads/TARAB_PLAYLIST folder.');
    } catch (error) {
      console.error('Download error:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsDownloading(false);
    }
  };

  if (type === 'small') {
    return (
      <div className='flex flex-col gap-5 w-auto h-full items-center '>
        {isDownloading ? (
          <div className="flex justify-center items-center h-[24px] w-[24px]">
            <CircularProgressSmall progress={downloadProgress} />
          </div>
        ) : isDownloaded ? (
          <Check size={24} className="text-green-500" />
        ) : (
          <button className='group h-full' onClick={handleDownload} disabled={!videoId}>
            <CloudDownload size={24} className={`${highlightedCardId === videoId ? 'text-[#171b24]' : ''} text-custom-yellow group-hover:text-custom-dark `} />
          </button>
        )}
      </div>
    )
  }

  return (
    <div className='flex flex-col m-8 gap-5 w-full'>
      <h1>Download Video</h1>
      {isDownloading ? (
        <div className="flex justify-center items-center">
          <CircularProgress progress={downloadProgress} />
        </div>
      ) : isDownloaded ? (
        <div className="flex justify-center items-center text-green-500">
          <Check size={24} /> <span className="ml-2">Downloaded</span>
        </div>
      ) : (
        <button
          className='flex w-full justify-center items-center text-white bg-custom-dark h-10 rounded-sm hover:bg-custom-yellow hover:text-custom-dark'
          onClick={handleDownload}
          disabled={!videoId}
        >
          <div className='pr-2'>Download</div> <CloudDownload size={24} />
        </button>
      )}
      {message && <p className='text-center text-green-600'>{message}</p>}
    </div>
  );
}