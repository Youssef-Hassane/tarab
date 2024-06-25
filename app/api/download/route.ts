import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { downloadVideo } from '../../../lib/downloadVideo';
import { getVideoInfo } from '../../../lib/videoInfo'; // Import the function to get video info

let downloadCount = 0;

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
    const videoTitle = videoInfo.title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_'); // Clean the title
    downloadCount += 1;
    const fileName = `${downloadCount}-${videoTitle}.mp4`;
    const filePath = path.join(downloadsDir, fileName);

    await downloadVideo(url, filePath);

    return NextResponse.json({ message: 'Download complete', filePath }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to download video' }, { status: 500 });
  }
}
