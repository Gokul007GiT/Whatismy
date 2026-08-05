import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const SITE_URL = 'https://whatismyip.example.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'What Is My IP Address? | Fast IP Lookup Tool',
    template: '%s | What Is My IP',
  },
  description:
    'Instantly discover your public IPv4 and IPv6 address, ISP, location, browser, and operating system with our free IP lookup tool.',
  keywords: [
    'what is my ip',
    'ip address',
    'ip lookup',
    'public ip',
    'ipv4',
    'ipv6',
    'isp',
    'network tools',
  ],
  authors: [{ name: 'What Is My IP' }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'What Is My IP Address? | Fast IP Lookup Tool',
    description:
      'Instantly discover your public IPv4 and IPv6 address, ISP, location, browser, and operating system with our free IP lookup tool.',
    url: SITE_URL,
    siteName: 'What Is My IP',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'What Is My IP Address' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is My IP Address? | Fast IP Lookup Tool',
    description:
      'Instantly discover your public IPv4 and IPv6 address, ISP, location, browser, and operating system with our free IP lookup tool.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'technology',
};

export const viewport = {
  themeColor: '#f7f9fc',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
