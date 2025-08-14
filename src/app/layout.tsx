import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] }); 

export const metadata: Metadata = {
  title: 'WhatBytes - Your One-Stop Shop',
  description: 'Discover amazing products at great prices. Shop electronics, clothing, shoes, and books.',
  keywords: 'ecommerce, shopping, electronics, clothing, shoes, books',
  authors: [{ name: 'WhatBytes Team' }], 
  openGraph: {
    title: 'WhatBytes - Your One-Stop Shop',
    description: 'Discover amazing products at great prices.',
    type: 'website',
    images: [ 
      {
        url: '/og-image.png', // optional SEO image
        width: 1200,
        height: 630,
        alt: 'WhatBytes - Shop Everything',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        {/* Global Layout */}
        <div className="flex flex-col min-h-screen">
          {/* Header slot (optional) */}
          {/* <Header /> */}

          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>

          {/* Footer slot (optional) */}
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
