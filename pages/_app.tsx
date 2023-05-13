import 'tailwindcss/tailwind.css'

import { Analytics } from '@vercel/analytics/react';
import { AppProps } from 'next/app'

import { PixelRatioProvider } from '../contexts/PixelRatioContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PixelRatioProvider>
        <Component {...pageProps} />
        <Analytics />
      </PixelRatioProvider>
    </>
  )
}
