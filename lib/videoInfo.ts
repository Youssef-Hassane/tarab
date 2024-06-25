import ytdl from 'ytdl-core';

export async function getVideoInfo(url: string): Promise<{ title: string }> {
  const info = await ytdl.getInfo(url);
  return { title: info.videoDetails.title };
}
