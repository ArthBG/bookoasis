import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { cn } from '../../libs/utils'
import { Provider } from '../components/ui/provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Book Oasis',
  description: 'Book Oasis is a place where you can find your favorite books and authors.',

  }

export const viewport = 'width=device-width, initial-scale=1'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={'pt-BR'} suppressHydrationWarning>
      <body className={cn('min-h-screen font-sans antialiased relative', inter.className)}>
        <Provider attribute={'class'} defaultTheme={'system'} enableSystem disableTransitionOnChange>
          {children}
        </Provider>
      </body>
    </html>
  )
}