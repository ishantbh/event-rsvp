import type { Metadata } from 'next'
import { Geist_Mono, Inter } from 'next/font/google'

import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    template: `%s | YesToGo`,
    default: 'YesToGo',
  },
  description: 'Create, manage and RSVP for events',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      className={cn(
        'h-full',
        'antialiased',
        geistMono.variable,
        'font-sans',
        inter.variable,
      )}
      suppressHydrationWarning
    >
      <body className='min-h-full flex flex-col'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />

          <main className='w-full max-w-6xl mx-auto flex-1 flex flex-col px-4 pt-20 pb-8 lg:pt-28'>
            {children}
          </main>

          <Toaster richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
