import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { cn } from '../../libs/utils'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Book Oasis',
  description: 'Book Oasis is a place where you can find your favorite books and authors.',
  viewport: 'width=device-width, initial-scale=1',
  }

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={'pt-BR'} suppressHydrationWarning>
      <body className={cn('min-h-screen font-sans antialiased relative', inter.className)}>
        <ThemeProvider attribute={'class'} defaultTheme={'system'} enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}