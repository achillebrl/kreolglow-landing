import type { Metadata } from 'next'
import { Playfair_Display, Inter, Dancing_Script } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const dancing = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  weight: '600',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KRÉOL GLOW — La beauté péï, livrée chez ou',
  description: 'Kits beauté & accessoires capillaires pour femmes réunionnaises. Livraison 974 J+1-2. Rejoins la liste pour -20% à l\'ouverture.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'KRÉOL GLOW — La beauté péï, livrée chez ou',
    description: 'Kits beauté & accessoires capillaires pour femmes réunionnaises. Livraison 974 J+1-2.',
    locale: 'fr_RE',
    type: 'website',
    images: ['/logo.png'],
  },
}

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${inter.variable} ${dancing.variable}`}
    >
      <head>
        {pixelId && pixelId !== 'REPLACE_ME' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${pixelId}');fbq('track','PageView');`,
            }}
          />
        )}
      </head>
      <body>{children}</body>
    </html>
  )
}
