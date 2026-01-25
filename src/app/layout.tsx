"use client"

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './nprogress.css'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ProgressBar from '@/components/ProgressBar'
import WhatsAppButton from '@/components/WhatsAppButton'
import { Toaster } from 'react-hot-toast'
import { StoreProvider } from '@/providers/StoreProvider'
import { usePathname } from 'next/navigation'
import RoleGuard from '@/components/RoleGuard'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')
  const isAuthRoute = pathname?.startsWith('/login') || pathname?.startsWith('/signup') || pathname?.startsWith('/forgot-password') || pathname?.startsWith('/reset-password')

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
              // Public routes: with header/footer and role guard
              <div className="min-h-screen flex flex-col">
                <Header />
                <RoleGuard requiredRole={isAuthRoute || pathname === '/' ? undefined : 'user'}>
                  <main className="flex-1">{children}</main>
                </RoleGuard>
                <Footer />
                <WhatsAppButton />
                <Toaster position="bottom-right" />
              </div>
            )}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  )
}