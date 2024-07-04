// File: lib/videoInfo.ts

import ytdl from 'ytdl-core';

export async function getVideoInfo(url: string): Promise<ytdl.videoInfo> {
  try {
    const info = await ytdl.getInfo(url);
    return info;
  } catch (error) {
    console.error('Error fetching video info:', error);
    throw error;
  }
}