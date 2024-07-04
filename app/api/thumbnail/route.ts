// File: app/api/thumbnail/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const video = searchParams.get('video');

  if (!video) {
    return NextResponse.json({ error: 'Video parameter is required' }, { status: 400 });
  }

  try {
    const homeDir = os.homedir();
    const thumbnailPath = path.join(homeDir, 'Downloads', 'TARAB_PLAYLIST', video.replace('.mp4', '.jpg'));
    
    const thumbnailBuffer = await fs.promises.readFile(thumbnailPath);
    
    return new NextResponse(thumbnailBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
      },
    });
  } catch (error) {
    console.error('Error serving thumbnail:', error);
    return NextResponse.json({ error: 'Failed to serve thumbnail' }, { status: 500 });
  }
}