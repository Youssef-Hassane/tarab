import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&maxResults=50`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data.items, { status: 200 });
    } else {
      return NextResponse.json({ error: data.error.message }, { status: response.status });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
