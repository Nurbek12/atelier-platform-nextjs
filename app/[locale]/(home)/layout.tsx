import "@/app/globals.css"
import { Suspense } from 'react'
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { getMessages } from 'next-intl/server'
import { Navbar } from "@/app/components/navbar"
import { Footer } from '@/app/components/footer'
import { Toaster } from "@/components/ui/sonner"
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from "@/app/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Couture Corner",
  description: "Generated by create next app",
}

export default async function RootLayout({
  children, params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string }
}>) {
  const messages = await getMessages()

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            enableSystem
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange>
              <Navbar />
              <Suspense>
                {children}
              </Suspense>
              <Footer />
              <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
