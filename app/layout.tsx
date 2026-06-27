import { ThemeProvider } from '@/components/theme-provider';
import { META_THEME_COLORS, siteConfig } from '@/config/site';
import { LenisProvider } from '@/components/providers/lenis-provider';
import 'lenis/dist/lenis.css';

import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';

import { Toaster } from '@/components/ui/sonner';

import { Metadata, Viewport } from 'next';
import type { CSSProperties } from 'react';
import './globals.css';
import { cn } from '@/lib/utils';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

import { setViewsServerAction } from './actions/getAndSetViewsServerAction';
import { getLoveCountServerAction } from './actions/getAndSetLoveCountServerAction';

import { SpeedInsights } from '@vercel/speed-insights/next';

type BackgroundStyle = CSSProperties & Record<`--${string}`, string | number>;

const driftingDots = [
  {
    style: {
      '--x': '10%',
      '--y': '18%',
      '--size': '3px',
      '--drift-x': '20px',
      '--drift-y': '-28px',
      '--delay': '-2s',
      '--duration': '22s',
      '--opacity': 0.32,
    },
  },
  {
    style: {
      '--x': '26%',
      '--y': '74%',
      '--size': '2px',
      '--drift-x': '-18px',
      '--drift-y': '-20px',
      '--delay': '-9s',
      '--duration': '28s',
      '--opacity': 0.22,
    },
  },
  {
    style: {
      '--x': '42%',
      '--y': '28%',
      '--size': '2px',
      '--drift-x': '14px',
      '--drift-y': '18px',
      '--delay': '-14s',
      '--duration': '24s',
      '--opacity': 0.18,
    },
  },
  {
    style: {
      '--x': '58%',
      '--y': '62%',
      '--size': '4px',
      '--drift-x': '-24px',
      '--drift-y': '14px',
      '--delay': '-6s',
      '--duration': '30s',
      '--opacity': 0.2,
    },
  },
  {
    style: {
      '--x': '72%',
      '--y': '20%',
      '--size': '2px',
      '--drift-x': '16px',
      '--drift-y': '30px',
      '--delay': '-18s',
      '--duration': '26s',
      '--opacity': 0.16,
    },
  },
  {
    style: {
      '--x': '84%',
      '--y': '70%',
      '--size': '3px',
      '--drift-x': '-12px',
      '--drift-y': '-24px',
      '--delay': '-11s',
      '--duration': '34s',
      '--opacity': 0.2,
    },
  },
  {
    style: {
      '--x': '14%',
      '--y': '52%',
      '--size': '2px',
      '--drift-x': '10px',
      '--drift-y': '-14px',
      '--delay': '-20s',
      '--duration': '32s',
      '--opacity': 0.14,
    },
  },
  {
    style: {
      '--x': '33%',
      '--y': '44%',
      '--size': '3px',
      '--drift-x': '-16px',
      '--drift-y': '8px',
      '--delay': '-4s',
      '--duration': '27s',
      '--opacity': 0.16,
    },
  },
  {
    style: {
      '--x': '49%',
      '--y': '80%',
      '--size': '2px',
      '--drift-x': '18px',
      '--drift-y': '-12px',
      '--delay': '-16s',
      '--duration': '36s',
      '--opacity': 0.12,
    },
  },
  {
    style: {
      '--x': '63%',
      '--y': '36%',
      '--size': '3px',
      '--drift-x': '-14px',
      '--drift-y': '16px',
      '--delay': '-7s',
      '--duration': '29s',
      '--opacity': 0.15,
    },
  },
  {
    style: {
      '--x': '91%',
      '--y': '24%',
      '--size': '2px',
      '--drift-x': '-8px',
      '--drift-y': '14px',
      '--delay': '-13s',
      '--duration': '25s',
      '--opacity': 0.1,
    },
  },
];

const starStreaks = [
  {
    style: {
      '--x': '16%',
      '--y': '12%',
      '--length': '12rem',
      '--angle': '18deg',
      '--travel-x': '4rem',
      '--travel-y': '-1.7rem',
      '--delay': '-12s',
      '--duration': '15s',
      '--opacity': 0.72,
    },
  },
  {
    style: {
      '--x': '28%',
      '--y': '68%',
      '--length': '11rem',
      '--angle': '-16deg',
      '--travel-x': '3.6rem',
      '--travel-y': '-1.45rem',
      '--delay': '-8s',
      '--duration': '13s',
      '--opacity': 0.58,
    },
  },
  {
    style: {
      '--x': '70%',
      '--y': '26%',
      '--length': '14rem',
      '--angle': '-24deg',
      '--travel-x': '4.4rem',
      '--travel-y': '-1.8rem',
      '--delay': '-4s',
      '--duration': '18s',
      '--opacity': 0.62,
    },
  },
  {
    style: {
      '--x': '42%',
      '--y': '18%',
      '--length': '10rem',
      '--angle': '12deg',
      '--travel-x': '3.4rem',
      '--travel-y': '-1.35rem',
      '--delay': '-16s',
      '--duration': '14s',
      '--opacity': 0.56,
    },
  },
  {
    style: {
      '--x': '76%',
      '--y': '76%',
      '--length': '13rem',
      '--angle': '28deg',
      '--travel-x': '4.2rem',
      '--travel-y': '-1.55rem',
      '--delay': '-20s',
      '--duration': '20s',
      '--opacity': 0.5,
    },
  },
  {
    style: {
      '--x': '88%',
      '--y': '48%',
      '--length': '11rem',
      '--angle': '-30deg',
      '--travel-x': '3.8rem',
      '--travel-y': '-1.45rem',
      '--delay': '-22s',
      '--duration': '12s',
      '--opacity': 0.54,
    },
  },
  {
    style: {
      '--x': '58%',
      '--y': '84%',
      '--length': '9rem',
      '--angle': '22deg',
      '--travel-x': '3rem',
      '--travel-y': '-1.2rem',
      '--delay': '-2s',
      '--duration': '11s',
      '--opacity': 0.48,
    },
  },
  {
    style: {
      '--x': '10%',
      '--y': '54%',
      '--length': '10rem',
      '--angle': '14deg',
      '--travel-x': '3.8rem',
      '--travel-y': '-1.55rem',
      '--delay': '-18s',
      '--duration': '16s',
      '--opacity': 0.46,
    },
  },
  {
    style: {
      '--x': '22%',
      '--y': '28%',
      '--length': '9rem',
      '--angle': '-20deg',
      '--travel-x': '3.4rem',
      '--travel-y': '-1.3rem',
      '--delay': '-10s',
      '--duration': '15s',
      '--opacity': 0.44,
    },
  },
  {
    style: {
      '--x': '38%',
      '--y': '86%',
      '--length': '11rem',
      '--angle': '30deg',
      '--travel-x': '4.2rem',
      '--travel-y': '-1.65rem',
      '--delay': '-24s',
      '--duration': '18s',
      '--opacity': 0.52,
    },
  },
  {
    style: {
      '--x': '82%',
      '--y': '16%',
      '--length': '12rem',
      '--angle': '-12deg',
      '--travel-x': '4rem',
      '--travel-y': '-1.6rem',
      '--delay': '-6s',
      '--duration': '17s',
      '--opacity': 0.6,
    },
  },
  {
    style: {
      '--x': '94%',
      '--y': '64%',
      '--length': '10rem',
      '--angle': '26deg',
      '--travel-x': '3.6rem',
      '--travel-y': '-1.4rem',
      '--delay': '-14s',
      '--duration': '13s',
      '--opacity': 0.49,
    },
  },
  {
    style: {
      '--x': '52%',
      '--y': '44%',
      '--length': '9rem',
      '--angle': '-8deg',
      '--travel-x': '3.2rem',
      '--travel-y': '-1.25rem',
      '--delay': '-9s',
      '--duration': '14s',
      '--opacity': 0.47,
    },
  },
  {
    style: {
      '--x': '66%',
      '--y': '6%',
      '--length': '8rem',
      '--angle': '34deg',
      '--travel-x': '3rem',
      '--travel-y': '-1.15rem',
      '--delay': '-19s',
      '--duration': '12s',
      '--opacity': 0.45,
    },
  },
];

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  keywords: siteConfig.keywords,
  authors: [
    {
      name: 'Samuel Oladokun',
      url: 'https://sammyoladokun.github.io',
    },
  ],
  creator: 'Samuel Oladokun',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: '@sammyOladokun',
  },
  icons: {
    icon: [
      { url: '/favicon-tree.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

async function loadStats() {
  try {
    await setViewsServerAction();
    await getLoveCountServerAction();
  } catch (error) {
    console.error('Failed to load stats:', error);
    return;
  }
}

export default function RootLayout({ children }: RootLayoutProps) {
  loadStats();
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
            }}
          />
        </head>
        <body
          className={cn(
            'relative isolate min-h-svh bg-background font-sans antialiased',
          )}
        >
          <div aria-hidden="true" className="site-bg">
            <div className="site-bg__particles">
              {driftingDots.map((dot, index) => (
                <span
                  key={index}
                  className="site-bg__particle"
                  style={dot.style as BackgroundStyle}
                />
              ))}
            </div>
            <div className="site-bg__stars">
              {starStreaks.map((star, index) => (
                <span
                  key={index}
                  className="site-bg__star"
                  style={star.style as BackgroundStyle}
                />
              ))}
            </div>
          </div>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <LenisProvider>
              <div vaul-drawer-wrapper="">
                <div className="relative z-10 flex min-h-svh flex-col bg-transparent backdrop-blur-0 dark:bg-transparent">
                  <div
                    data-wrapper=""
                    className="flex flex-col flex-1 border-grid"
                  >
                    <SiteHeader />
                    <main className="flex flex-1 flex-col">
                      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col overflow-hidden px-4 py-8 md:px-8 lg:px-24 lg:py-10">
                        <div className="flex w-full min-w-0 flex-1 flex-col px-1">
                          {children}
                        </div>
                      </div>
                    </main>
                    <SiteFooter />
                  </div>
                </div>
              </div>
            </LenisProvider>
          </ThemeProvider>
          <Toaster richColors position="top-center" />
          <GoogleAnalytics
            gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''}
          />
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </>
  );
}
