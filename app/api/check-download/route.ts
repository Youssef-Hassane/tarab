// app/api/check-download/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get('videoId');

  if (!videoId) {
    return NextResponse.json({ error: 'Video ID is required' }, { status: 400 });
  }

  const homeDir = os.homedir();
  const downloadsDir = path.join(homeDir, 'Downloads', 'TARAB_PLAYLIST');
  const filePath = path.join(downloadsDir, `${videoId}.mp4`);

  const downloaded = fs.existsSync(filePath);

  return NextResponse.json({ downloaded });
}