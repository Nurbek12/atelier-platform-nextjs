import "../globals.css"
import { Suspense } from 'react'
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Navbar } from "../components/navbar"
import { Footer } from '../components/footer'
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "../components/theme-provider"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
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
      </body>
    </html>
  );
}
