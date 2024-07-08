// File: app/api/download/route.ts
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import os from 'os';
import ytdl from 'ytdl-core';
import { getVideoInfo } from '../../../lib/videoInfo';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const homeDir = os.homedir();
    const downloadsDir = path.join(homeDir, 'Downloads', 'TARAB_PLAYLIST');
    fs.mkdirSync(downloadsDir, { recursive: true });

    const videoInfo = await getVideoInfo(url);
    const videoTitle = videoInfo.videoDetails.title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
    const fileName = `${videoTitle}.mp4`;
    const filePath = path.join(downloadsDir, fileName);

    const videoStream = ytdl(url, { quality: '18' });
    const writeStream = fs.createWriteStream(filePath);

    let downloadedBytes = 0;
    const totalBytes = parseInt(videoInfo.videoDetails.lengthSeconds) * 100000; // Approximate size

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of videoStream) {
          downloadedBytes += chunk.length;
          const progress = Math.min(100, Math.round((downloadedBytes / totalBytes) * 100));
          
          writeStream.write(chunk);
          
          controller.enqueue(encoder.encode(`${progress}\n`));
        }
        
        writeStream.end();
        controller.close();
      }
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/plain',
        'Transfer-Encoding': 'chunked'
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'Failed to download video' }, { status: 500 });
  }
}


/* test */