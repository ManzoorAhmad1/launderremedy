import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Toaster } from 'react-hot-toast'
import { StoreProvider } from '@/providers/StoreProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Launder Remedy - Premium Laundry & Dry Cleaning Services in London',
  description: 'Quick, easy laundry and dry cleaning services in London. Free pickup and delivery, 24h turnaround, and dedicated 24/7 support.',
  keywords: 'laundry, dry cleaning, London, laundry service, dry cleaning service, laundry pickup, laundry delivery',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <Toaster position="bottom-right" />
            </div>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  )
}