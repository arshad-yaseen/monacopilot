export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
          *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          
          html {
            font-size: 16px;
            -webkit-text-size-adjust: 100%;
          }

          body {
            min-height: 100vh;
            width: 100%;
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
