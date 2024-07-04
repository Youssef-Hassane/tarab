// File: app/api/downloadedVideos/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';

export async function GET() {
  try {
    const homeDir = os.homedir();
    const downloadsDir = path.join(homeDir, 'Downloads', 'TARAB_PLAYLIST');
    const files = await fs.promises.readdir(downloadsDir);
    
    const videos = files
      .filter(file => file.endsWith('.mp4'))
      .map(file => {
        const filePath = path.join(downloadsDir, file);
        return {
          id: file,
          title: file.replace('.mp4', '').replace(/_/g, ' '),
          filePath,
          thumbnailPath: `/api/thumbnail?video=${encodeURIComponent(file)}` // You'll need to implement this API route
        };
      });
    
    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error fetching downloaded videos:', error);
    return NextResponse.json({ error: 'Failed to fetch downloaded videos' }, { status: 500 });
  }
}