import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const SITE_URL = 'https://whatismyip.example.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'What Is My IP Address? | Fast IP Lookup Tool',
    template: '%s | What Is My IP',
  },
  description:
    'Instantly discover your public IP address, ISP, browser, operating system, and location with our free IP lookup tool.',
  keywords: [
    'what is my ip',
    'ip address',
    'ip lookup',
    'public ip',
    'ipv4',
    'ipv6',
    'isp',
    'network tools',
    'dns lookup',
    'whois',
  ],
  authors: [{ name: 'What Is My IP' }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'What Is My IP Address? | Fast IP Lookup Tool',
    description:
      'Instantly discover your public IP address, ISP, browser, operating system, and location with our free IP lookup tool.',
    url: SITE_URL,
    siteName: 'What Is My IP',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'What Is My IP Address',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is My IP Address? | Fast IP Lookup Tool',
    description:
      'Instantly discover your public IP address, ISP, browser, operating system, and location with our free IP lookup tool.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  category: 'technology',
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0f1c' },
  ],
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
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
