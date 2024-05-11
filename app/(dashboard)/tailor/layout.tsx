import "../../globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { TailorNav } from '../../components/tailor-nav'
import { ThemeProvider } from "../../components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tailor Dashboard",
  description: "Tailor Dashboard",
};

export default function TailorLayout({
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
            <div className="grid h-screen w-full pl-[56px]">
                <TailorNav />
                <div className="flex flex-col">
                    <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
                      <h1 className="text-xl font-semibold">Tailor Orders History</h1>
                    </header>
                    <main className="grid flex-1 gap-4 overflow-auto p-4">
                      {children}
                    </main>
                </div>
            </div>
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
