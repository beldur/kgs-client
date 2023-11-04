import './globals.css'

import type { Metadata } from 'next'

import Navigation from '@/components/Navigation'
import { Providers } from '@/lib/providers'

export const metadata: Metadata = {
  title: 'KGS Client',
  description: 'A KGS Web Client',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <Providers>
      <html lang="en">
        <body className="">
          <Navigation />
          <main className="container mx-auto px-4">{children}</main>
        </body>
      </html>
    </Providers>
  )
}
