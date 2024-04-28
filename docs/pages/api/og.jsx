import {ImageResponse} from '@vercel/og';

export const config = {
  runtime: 'edge',
};

const font = fetch(
  new URL('./SpaceGrotesk-SemiBold.ttf', import.meta.url),
).then(res => res.arrayBuffer());

export default async function (req) {
  const inter = await font;

  const {searchParams} = new URL(req.url);

  // ?title=<title>
  const hasTitle = searchParams.has('title');
  const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : '';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: 80,
          backgroundColor: '#030303',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          backgroundPosition: '-30px -10px',
          fontWeight: 600,
          color: 'white',
        }}>
        <h1
          style={{
            fontSize: 64,
            margin: 0,
            lineHeight: 1.1,
            textShadow: '0 2px 30px #000',
            letterSpacing: -2,
            position: 'absolute',
            top: 70,
            left: 80,
          }}>
          Monacopilot
        </h1>
        <p
          style={{
            position: 'absolute',
            bottom: 70,
            left: 80,
            margin: 0,
            fontSize: 30,
            letterSpacing: -0.5,
          }}>
          Github Copilot for Web
        </p>
        <h1
          style={{
            fontSize: 82,
            margin: '0 0 40px -2px',
            lineHeight: 1.1,
            textShadow: '0 2px 30px #000',
            letterSpacing: -4,
            backgroundImage: 'linear-gradient(90deg, #fff 40%, #aaa)',
            backgroundClip: 'text',
            color: 'transparent',
          }}>
          {title}
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'inter',
          data: inter,
          style: 'normal',
        },
      ],
    },
  );
}
