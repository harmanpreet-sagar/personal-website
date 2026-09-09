import type { Metadata } from 'next'
import { Source_Serif_4, DM_Sans } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-source-serif',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'Harmanpreet Singh Sagar | Software Engineer',
  description: 'Software Engineering student at McMaster University',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sourceSerif.variable} ${dmSans.variable}`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme') || 'light';
                  document.documentElement.setAttribute('data-theme', savedTheme);
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // The page is statically prerendered and normally paints in
                  // milliseconds, so the preloader is gated: it only fades in if
                  // loading is still going after SHOW_AFTER. A fast visit removes
                  // pl-active before the CSS animation delay elapses and never
                  // shows anything. MAX_HOLD guarantees it cannot trap anyone.
                  var d = document.documentElement;
                  var SHOW_AFTER = 320, MAX_HOLD = 2500;
                  var t0 = Date.now(), finished = false;
                  d.classList.add('pl-active');
                  var finish = function() {
                    if (finished) return;
                    finished = true;
                    if (Date.now() - t0 >= SHOW_AFTER) {
                      d.classList.add('pl-out');
                      setTimeout(function() {
                        d.classList.remove('pl-active');
                        d.classList.remove('pl-out');
                      }, 320);
                    } else {
                      d.classList.remove('pl-active');
                    }
                  };
                  if (document.readyState === 'complete') finish();
                  else window.addEventListener('load', finish);
                  setTimeout(finish, MAX_HOLD);
                } catch (e) {}
              })();
            `,
          }}
        />
        <div className="preloader" aria-hidden="true">
          <span className="preloader-mark">HS</span>
          <span className="preloader-track" />
        </div>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}

