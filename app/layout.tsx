import { ThemeProvider } from '@/components/theme-provider';
import { META_THEME_COLORS, siteConfig } from '@/config/site';
import { LenisProvider } from '@/components/providers/lenis-provider';
import 'lenis/dist/lenis.css';

import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';

import { fontSans, fontMono } from '@/lib/fonts';
import { Toaster } from '@/components/ui/sonner';

import { Metadata, Viewport } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { SiteHeader } from '@/components/site-header';
import { SideNav } from '@/components/side-nav';
import { SiteFooter } from '@/components/site-footer';
import { ScrollDownHint } from '@/components/scroll-down-hint';
import { docsConfig } from '@/config/docs';
import { CSSProperties } from 'react';

import { setViewsServerAction } from './actions/getAndSetViewsServerAction';
import { getLoveCountServerAction } from './actions/getAndSetLoveCountServerAction';

import { SpeedInsights } from '@vercel/speed-insights/next';

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
    creator: '@sammyoladokun',
  },
  icons: {
    icon: '/icon',
    shortcut: '/icon',
    apple: '/apple-icon',
  },
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
};

interface RootLayoutProps {
  children: React.ReactNode;
}

type BackgroundStyle = CSSProperties & Record<`--${string}`, string | number>;

const driftingDots = [
  { x: '10%', y: '18%', size: '3px', driftX: '20px', driftY: '-28px', delay: '-2s', duration: '22s', opacity: 0.32 },
  { x: '26%', y: '74%', size: '2px', driftX: '-18px', driftY: '-20px', delay: '-9s', duration: '28s', opacity: 0.22 },
  { x: '42%', y: '28%', size: '2px', driftX: '14px', driftY: '18px', delay: '-14s', duration: '24s', opacity: 0.18 },
  { x: '58%', y: '62%', size: '4px', driftX: '-24px', driftY: '14px', delay: '-6s', duration: '30s', opacity: 0.2 },
  { x: '72%', y: '20%', size: '2px', driftX: '16px', driftY: '30px', delay: '-18s', duration: '26s', opacity: 0.16 },
  { x: '84%', y: '70%', size: '3px', driftX: '-12px', driftY: '-24px', delay: '-11s', duration: '34s', opacity: 0.2 },
  { x: '14%', y: '52%', size: '2px', driftX: '10px', driftY: '-14px', delay: '-20s', duration: '32s', opacity: 0.14 },
  { x: '33%', y: '44%', size: '3px', driftX: '-16px', driftY: '8px', delay: '-4s', duration: '27s', opacity: 0.16 },
  { x: '49%', y: '80%', size: '2px', driftX: '18px', driftY: '-12px', delay: '-16s', duration: '36s', opacity: 0.12 },
  { x: '63%', y: '36%', size: '3px', driftX: '-14px', driftY: '16px', delay: '-7s', duration: '29s', opacity: 0.15 },
  { x: '91%', y: '24%', size: '2px', driftX: '-8px', driftY: '14px', delay: '-13s', duration: '25s', opacity: 0.1 },
  { x: '7%', y: '84%', size: '2px', driftX: '12px', driftY: '-16px', delay: '-17s', duration: '23s', opacity: 0.14 },
  { x: '76%', y: '48%', size: '3px', driftX: '-10px', driftY: '12px', delay: '-23s', duration: '31s', opacity: 0.18 },
  { x: '88%', y: '9%', size: '2px', driftX: '-14px', driftY: '10px', delay: '-5s', duration: '27s', opacity: 0.12 },
];

const starStreaks = [
  { x: '16%', y: '12%', length: '13rem', angle: '18deg', travelX: '5rem', travelY: '-2.1rem', delay: '-12s', duration: '11s', opacity: 0.8 },
  { x: '28%', y: '68%', length: '12rem', angle: '-16deg', travelX: '4.8rem', travelY: '-2rem', delay: '-8s', duration: '10s', opacity: 0.66 },
  { x: '70%', y: '26%', length: '15rem', angle: '-24deg', travelX: '5.3rem', travelY: '-2.2rem', delay: '-4s', duration: '12s', opacity: 0.72 },
  { x: '42%', y: '18%', length: '11rem', angle: '12deg', travelX: '4.4rem', travelY: '-1.8rem', delay: '-16s', duration: '9s', opacity: 0.62 },
  { x: '76%', y: '76%', length: '14rem', angle: '28deg', travelX: '5.2rem', travelY: '-2.05rem', delay: '-20s', duration: '13s', opacity: 0.58 },
  { x: '88%', y: '48%', length: '12rem', angle: '-30deg', travelX: '4.7rem', travelY: '-1.9rem', delay: '-22s', duration: '9s', opacity: 0.63 },
  { x: '58%', y: '84%', length: '10rem', angle: '22deg', travelX: '4.1rem', travelY: '-1.6rem', delay: '-2s', duration: '8s', opacity: 0.54 },
  { x: '10%', y: '54%', length: '11rem', angle: '14deg', travelX: '4.6rem', travelY: '-1.85rem', delay: '-18s', duration: '10s', opacity: 0.5 },
  { x: '22%', y: '28%', length: '10rem', angle: '-20deg', travelX: '4.3rem', travelY: '-1.7rem', delay: '-10s', duration: '11s', opacity: 0.49 },
  { x: '38%', y: '86%', length: '12rem', angle: '30deg', travelX: '4.9rem', travelY: '-2rem', delay: '-24s', duration: '12s', opacity: 0.56 },
  { x: '82%', y: '16%', length: '13rem', angle: '-12deg', travelX: '5rem', travelY: '-2rem', delay: '-6s', duration: '12s', opacity: 0.68 },
  { x: '94%', y: '64%', length: '11rem', angle: '26deg', travelX: '4.5rem', travelY: '-1.75rem', delay: '-14s', duration: '10s', opacity: 0.54 },
  { x: '6%', y: '24%', length: '12rem', angle: '20deg', travelX: '4.8rem', travelY: '-2rem', delay: '-9s', duration: '10s', opacity: 0.58 },
  { x: '52%', y: '42%', length: '10rem', angle: '-8deg', travelX: '4.2rem', travelY: '-1.7rem', delay: '-19s', duration: '9s', opacity: 0.52 },
  { x: '61%', y: '6%', length: '9rem', angle: '34deg', travelX: '4rem', travelY: '-1.55rem', delay: '-21s', duration: '8s', opacity: 0.48 },
  { x: '96%', y: '82%', length: '11rem', angle: '-18deg', travelX: '4.6rem', travelY: '-1.85rem', delay: '-11s', duration: '11s', opacity: 0.57 },
];

async function loadStats() {
  if (!process.env.MONGODB_URI) {
    return;
  }

  try {
    await setViewsServerAction();
    await getLoveCountServerAction();
  } catch (error) {
    console.error('Failed to load stats:', error);
    return;
  }
}

export default function RootLayout({ children }: RootLayoutProps) {
  void loadStats();
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap"
            rel="stylesheet"
          />
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
            'min-h-svh bg-background font-sans antialiased',
            fontSans.variable,
            fontMono.variable
          )}
        >
          <div aria-hidden="true" className="site-bg">
            <div className="site-bg__glow site-bg__glow--left" />
            <div className="site-bg__glow site-bg__glow--right" />
            <div className="site-bg__particles">
              {driftingDots.map((dot, index) => (
                <span
                  key={index}
                  className="site-bg__particle"
                  style={
                    {
                      '--x': dot.x,
                      '--y': dot.y,
                      '--size': dot.size,
                      '--drift-x': dot.driftX,
                      '--drift-y': dot.driftY,
                      '--delay': dot.delay,
                      '--duration': dot.duration,
                      '--opacity': dot.opacity,
                    } as BackgroundStyle
                  }
                />
              ))}
            </div>
            <div className="site-bg__stars">
              {starStreaks.map((star, index) => (
                <span
                  key={index}
                  className="site-bg__star"
                  style={
                    {
                      '--x': star.x,
                      '--y': star.y,
                      '--length': star.length,
                      '--angle': star.angle,
                      '--travel-x': star.travelX,
                      '--travel-y': star.travelY,
                      '--delay': star.delay,
                      '--duration': star.duration,
                      '--opacity': star.opacity,
                    } as BackgroundStyle
                  }
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
                    <main className="flex flex-col flex-1">
                      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col overflow-hidden px-4 py-8 md:px-8 lg:px-24 lg:py-10">
                        <div className="flex w-full min-w-0 flex-1 flex-col px-1">
                          {children}
                        </div>
                      </div>
                    </main>
                    <SiteFooter />
                    <ScrollDownHint />
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
