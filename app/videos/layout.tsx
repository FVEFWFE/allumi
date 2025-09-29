import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dex Volkov - Private Video Platform',
  description: 'Private content vault. Members only.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function VideosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}