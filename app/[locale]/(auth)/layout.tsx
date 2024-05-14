import "@/app/globals.css"
import Image from 'next/image'
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { getMessages } from 'next-intl/server'
import { Toaster } from "@/components/ui/sonner"
import { NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from "@/app/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Login to system",
  description: "Login or Register to your account",
}

export default async function RootLayout({
  children, params
}: Readonly<{
  children: React.ReactNode
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
              <div className="w-full lg:grid lg:grid-cols-2 h-screen">
                <div className="flex items-center justify-center py-12">
                  {children}
                </div>
                <div className="hidden bg-muted lg:block">
                  <Image
                    src="/auth-bg.jpg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
