'use client'

import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { Menu } from 'lucide-react'
import { nav_items } from '@/constants'
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useState } from "react"
import Image from "next/image"

export function Navbar() {
    const pathname = usePathname()
    const [drawer, setDrawer] = useState(false)

    return (
        //  backdrop-blur bg-white/80 dark:bg-black/80
        <nav className="fixed w-full border-b bg-background z-40 h-[10vh] flex items-center">
            <div className="container flex items-center justify-between">
                <Link href="/">
                    <Image src="/logo/dark-logo.png" height={43} width={130} alt="logo" className="w-[130] object-cover hidden dark:block"></Image>
                    <Image src="/logo/light-logo.png" height={43} width={130} alt="logo" className="object-cover block dark:hidden"></Image>
                </Link>

                <ul className="hidden md:flex">
                    {
                        nav_items.map((item,index) => <li key={index}>
                            <Link href={item.url}>
                                <span className={cn("text-sm px-5 py-1.5 rounded", pathname === item.url ? 'bg-secondary-foreground/10' : '')}>{item.name}</span>
                            </Link>
                        </li>)
                    }                    
                </ul>


                <div className="flex items-center gap-2">
                    <Button onClick={() => setDrawer(true)} className="md:hidden" variant='outline' size='icon'>
                        <Menu className="size-5" />
                    </Button>
                    <ThemeToggle></ThemeToggle>
                </div>
            </div>
            
            <Sheet open={drawer} onOpenChange={(o) => setDrawer(o)}>
                <SheetContent>
                    <div>
                        <ul className="flex flex-col gap-2 py-4">
                            {
                                nav_items.map((item,index) => <li className="w-full" key={index}>
                                    <Link href={item.url} onClick={() => setDrawer(false)} className="w-full flex">
                                        <span className={cn("text-sm px-5 py-3 rounded w-full", pathname === item.url ? 'bg-secondary-foreground/10' : '')}>{item.name}</span>
                                    </Link>
                                </li>)
                            }                    
                        </ul>
                    </div>
                </SheetContent>
            </Sheet>
        </nav>
    )
}