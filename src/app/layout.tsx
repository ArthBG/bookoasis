import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { cn } from '../../libs/utils'
import { ThemeProvider } from '@/components/ui/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Auth.JS Boilerplate',
  description: 'A boilerplate for building authentication systems with Next.js and Auth.JS.'
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