import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
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
          borderRadius: '20%',
        }}
      >
        <div style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>CA</div>
      </div>
    ),
    { ...size }
  );
}
