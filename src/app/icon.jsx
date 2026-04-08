import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 64,
  height: 64,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#000000',
          color: '#FFFFFF',
          fontSize: 36,
          fontWeight: 900,
          fontFamily: 'sans-serif',
          letterSpacing: '-2px',
          borderRadius: '16px' // give it a subtle rounding
        }}
      >
        Y<span style={{ marginLeft: '-2px' }}>B</span>
        <span style={{ color: '#D53E0F', marginLeft: '0px' }}>.</span>
      </div>
    ),
    {
      ...size,
    }
  );
}
