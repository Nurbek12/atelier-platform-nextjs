import "../globals.css"
import Image from 'next/image'
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "../components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Login to system",
  description: "Login or Register to your account",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
                  className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
