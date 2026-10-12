import type { Metadata, Viewport } from 'next';
import './globals.css';
import InteractionEffects from '@/components/InteractionEffects';

export const metadata: Metadata = {
 title: 'Adoyo J & Company Advocates | Malindi, Kenya',
 description: 'Thoughtful legal counsel and purposeful representation in criminal defence, conveyancing and property, employment matters and road traffic claims in Malindi, Kenya.',
 applicationName: 'Adoyo J & Company Advocates',
 openGraph: { title: 'Adoyo J & Company Advocates', description: 'The law, with clarity. Your voice, with purpose.', type: 'website', locale: 'en_KE' },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#1d2422' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 return <html lang="en"><body><InteractionEffects />{children}</body></html>;
}
