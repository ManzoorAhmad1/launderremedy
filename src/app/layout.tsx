"use client"

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './nprogress.css'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ProgressBar from '@/components/ProgressBar'
import { Toaster } from 'react-hot-toast'
import { StoreProvider } from '@/providers/StoreProvider'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <ProgressBar />
            {isAdminRoute ? (
              // Admin routes: no header/footer
              <>
                {children}
                <Toaster position="top-right" />
              </>
            ) : (
              // Public routes: with header/footer
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <Toaster position="bottom-right" />
              </div>
            )}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  )
}