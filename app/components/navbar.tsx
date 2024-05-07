'use client'

import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
// import { Button } from "@/components/ui/button"
import { Shirt } from 'lucide-react'
import { nav_items } from '@/constants'
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export function Navbar() {
    const pathname = usePathname()

    return (
        <nav className="fixed w-full border-b backdrop-blur bg-white/80 dark:bg-black/80 z-40 h-[10vh] flex items-center">
            <div className="container flex items-center justify-between">
                <Link href="/">
                    <h1 className="flex items-center font-bold text-xl">Cou<Shirt className="w-5 h-5 text-primary" />ure Corner</h1>
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

                <div className="flex items-center gap-x-5">
                    <ThemeToggle></ThemeToggle>
                </div>
            </div>
        </nav>
    )
}