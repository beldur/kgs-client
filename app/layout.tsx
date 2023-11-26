import './globals.css'

import type { Metadata } from 'next'
import { Suspense } from 'react'

import Navigation from '@/components/Navigation'
import { Providers } from '@/components/Providers'

import { AppLoading } from '../components/AppLoading'

export const metadata: Metadata = {
  title: 'KGS Client',
  description: 'A KGS Web Client',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Suspense>
          <Providers>
            <AppLoading>
              <Navigation />
              <main className="container mx-auto px-4">{children}</main>
            </AppLoading>
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}
