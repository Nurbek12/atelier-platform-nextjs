'use client'

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Menu } from 'lucide-react'
import { nav_items } from '@/constants'
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { useTranslations, useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Navbar() {
    const router = useRouter()
    const locale = useLocale()
    const pathname = usePathname()
    const t = useTranslations('nav')
    const locales = ['uz','ru','en']
    const [drawer, setDrawer] = useState(false)

    const changeLocale = (lang: 'uz' | 'ru' | 'en') => {
        const newpath = pathname.replace('/'+locale, '')
        router.replace(`/${lang}${newpath}`)
    }

    return (
        <nav className="fixed w-full border-b overflow-hidden bg-background z-40 h-[10vh] flex items-center">
            <div className="container flex items-center justify-between">
                <Link href={"/"+locale} className="overflow-hidden">
                    <div className="h-[70px] w-[140px]">
                        <Image src="/logo/dark.svg" height={60} width={130} alt="logo" className="object-cover hidden dark:block"></Image>
                        <Image src="/logo/light.svg" height={60} width={130} alt="logo" className="object-cover block dark:hidden"></Image>
                    </div>
                </Link>

                <ul className="hidden lg:flex">
                    {
                        nav_items.map((item,index) => <li key={index}>
                            <Link href={`/${locale}${item.url}`}>
                                <span className={cn("text-sm px-5 py-1.5 rounded", pathname === `/${locale}${item.url === '/' ? item.url.replace('/','') : item.url}` ? 'bg-secondary-foreground/10' : '')}>
                                    {t(item.name)}
                                </span>
                            </Link>
                        </li>)
                    }                    
                </ul>


                <div className="flex items-center gap-2">
                    <Button onClick={() => setDrawer(true)} className="lg:hidden" variant='outline' size='icon'>
                        <Menu className="size-5" />
                    </Button>
                    <Select onValueChange={(e: 'uz') => changeLocale(e)} value={locale}>
                        <SelectTrigger className="w-[65px]">
                            <SelectValue placeholder={locale.toLocaleUpperCase()} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                locales.map(l => <SelectItem value={l} key={l}>
                                    <span className="uppercase">{l}</span>
                                </SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                    <ThemeToggle></ThemeToggle>
                </div>
            </div>
            
            <Sheet open={drawer} onOpenChange={(o) => setDrawer(o)}>
                <SheetContent>
                    <div>
                        <ul className="flex flex-col gap-2 py-4">
                            {
                                nav_items.map((item,index) => <li className="w-full" key={index}>
                                    <Link href={`/${locale}${item.url}`} onClick={() => setDrawer(false)} className="w-full flex">
                                        <span className={cn("text-sm px-5 py-3 rounded w-full", pathname === `/${locale}${item.url === '/' ? item.url.replace('/','') : item.url}` ? 'bg-secondary-foreground/10' : '')}>{t(item.name)}</span>
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