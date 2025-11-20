import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '1969 Economic Visualization',
  description: 'Cinematic journey through 1969 economic events',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
