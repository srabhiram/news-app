import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  // Extract the query parameter (for example, the news title) from the request URL
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "Latest Telugu News";  // Default to "Latest Telugu News" if no title is provided

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: 'black',
          background: 'white',
          width: '100%',
          height: '100%',
          padding: '50px 200px',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h1 style={{ marginBottom: '20px', fontSize: '60px' }}>{title}</h1>
        <p style={{ fontSize: '24px', color: '#777' }}>
          Stay updated with the latest news
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
