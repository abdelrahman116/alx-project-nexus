import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* PWA Primary Color */}
        <meta name="theme-color" content="#1e1e1e" />
        
        {/* Link to Manifest - CRITICAL FOR INSTALL ICON */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Apple Touch Icon (for iOS) */}
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}