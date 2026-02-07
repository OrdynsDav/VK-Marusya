import './styles/styles.scss'
import { ClientAuthProvider } from './UI/ClientAuthProvider/ClientAuthProvider';
import { Footer } from './UI/Footer/Footer';
import Header from './UI/Header/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>VK-маруся</title>
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon/apple-icon.png" />
        <link rel="manifest" href="/favicon/manifest.json" />
        <link rel="preconnect" href="https://image.tmdb.org" crossOrigin='anonymous' />
        <link rel="preload" href="/fonts/Play-Regular.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/Play-Bold.woff2" as="font" type="font/woff2" crossOrigin="" />

      </head>
      <body>
        <ClientAuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ClientAuthProvider>
      </body>
    </html>
  );
}

