import { ImageResponse } from 'next/og';

export async function GET(request: Request, { params }: { params: Promise<{ size: string }> }) {
  const resolvedParams = await params;
  const size = parseInt(resolvedParams.size, 10) || 192;
  
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0b1528',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: size >= 192 ? '20%' : 0,
        }}
      >
        <div style={{ color: 'white', fontSize: size * 0.4, fontWeight: 'bold' }}>CA</div>
      </div>
    ),
    { width: size, height: size }
  );
}
