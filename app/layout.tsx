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
    <html lang="en">
      <body className={`${sourceSerif.variable} ${dmSans.variable}`}>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}

