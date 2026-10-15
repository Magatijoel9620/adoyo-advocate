import type { Metadata, Viewport } from 'next';
import './globals.css';
import InteractionEffects from '@/components/InteractionEffects';

// Set NEXT_PUBLIC_SITE_URL to the exact .com domain before production deployment.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://adoyolaw.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Adoyo J & Company Advocates | Malindi, Kenya',
    template: '%s | Adoyo J & Company Advocates',
  },
  description: 'Independent legal practice based in Malindi, Kenya. Enquire about criminal defence, conveyancing and property, employment and labour, and road traffic claims. Enquiries from abroad are welcome for matters connected to Kenyan law.',
  applicationName: 'Adoyo J & Company Advocates',
  keywords: [
    'Adoyo J & Company Advocates', 'advocate in Malindi', 'law firm Malindi Kenya',
    'Kenyan legal counsel', 'criminal defence Kenya', 'conveyancing Kenya',
    'property lawyer Kenya', 'employment law Kenya', 'road traffic claims Kenya',
  ],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  openGraph: {
    title: 'Adoyo J & Company Advocates',
    description: 'The law, with clarity. Purposeful legal guidance from Malindi, Kenya, including enquiries from abroad on Kenyan-law matters.',
    type: 'website',
    locale: 'en_KE',
    siteName: 'Adoyo J & Company Advocates',
    url: '/',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Adoyo J & Company Advocates' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adoyo J & Company Advocates',
    description: 'Thoughtful legal counsel from Malindi, Kenya. Enquiries welcome for matters connected to Kenyan law.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }, { url: '/favicon.png', type: 'image/png', sizes: '64x64' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1d2422',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <InteractionEffects />
        {children}
      </body>
    </html>
  );
}
