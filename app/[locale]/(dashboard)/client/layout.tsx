import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { getMessages } from 'next-intl/server'
import { Toaster } from "@/components/ui/sonner"
import { NextIntlClientProvider } from 'next-intl'
import { ClientNav } from '@/app/components/client-nav'
import { ThemeProvider } from "@/app/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Client Dashboard",
  description: "Client Dashboard",
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
              <div className="grid h-screen w-full pl-[56px]">
                  <ClientNav />
                  <div className="flex flex-col">
                      <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
                        <h1 className="text-xl font-semibold">Client Panel</h1>
                      </header>
                      <main className="grid flex-1 gap-4 overflow-auto p-4">
                        {children}
                      </main>
                  </div>
              </div>
              <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
