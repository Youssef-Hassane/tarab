// File: lib/downloadVideo.ts
import ytdl from 'ytdl-core';
import fs from 'fs';

export async function downloadVideo(url: string, filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const videoStream = ytdl(url, { quality: 'highest' });
    const writeStream = fs.createWriteStream(filePath);

    videoStream.pipe(writeStream);

    writeStream.on('finish', () => {
      resolve();
    });

    writeStream.on('error', (err) => {
      reject(err);
    });
  });
}
