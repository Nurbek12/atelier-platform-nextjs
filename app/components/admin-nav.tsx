'use client'

import Link from "next/link"
import { cn } from "@/lib/utils"
import { useRouter } from 'next/navigation'
import { usePathname } from "next/navigation"
import { authLogout } from '@/app/apiref/auth'
import { Button } from "@/components/ui/button"
import { useTranslations, useLocale } from 'next-intl'
import { ThemeToggle } from '../components/theme-toggle'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { BarChartBig, LogOut, MessageCircle, Shirt, User, ShoppingCart, BriefcaseBusinessIcon } from 'lucide-react'

const locales = ['en', 'uz', 'ru']
const dashboard_links = [
    { name: "statistics", href: "/admin", icon: BarChartBig },
    { name: "users", href: "/admin/users", icon: User },
    { name: "orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "services", href: "/admin/services", icon: BriefcaseBusinessIcon },
    { name: "reviews", href: "/admin/reviews", icon: MessageCircle },
]


export function AdminNav() {
    const router = useRouter()
    const locale = useLocale()
    const pathname = usePathname()
    const t = useTranslations('admin-nav')

    const handleLogout = async () => {
        await authLogout()
        router.push('/')
    }

    const changeLocale = (lang: 'uz' | 'ru' | 'en') => {
        const newpath = pathname.replace('/'+locale, '')
        router.replace(`/${lang}${newpath}`)
    }

    return (
        <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
            <div className="border-b p-2">
            <Button variant="outline" size="icon" aria-label="Home">
                <Shirt className="size-5 fill-foreground" />
            </Button>
            </div>
            <nav className="grid gap-1 p-2">
                <TooltipProvider>
                    {
                        dashboard_links.map((item,index) => 
                            <Tooltip key={index}>
                                <TooltipTrigger asChild>
                                    <Link href={'/'+locale+item.href}>
                                        <Button variant="ghost" size="icon" className={cn("rounded-lg", pathname===`/${locale}${item.href}`?'bg-muted':'')} aria-label="Playground">
                                            <item.icon className="size-5" />
                                        </Button>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" sideOffset={5}>{t(item.name)}</TooltipContent>
                            </Tooltip>)
                    }
                </TooltipProvider>
            </nav>
            <nav className="mt-auto grid gap-1 p-2">
                <ThemeToggle></ThemeToggle>
                <Popover>
                    <PopoverTrigger>
                        <div className="w-[40px] h-[40px] rounded flex justify-center items-center border cursor-pointer">
                            {locale.toLocaleUpperCase()}
                        </div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="flex flex-col gap-2">
                            {
                                locales.map(l => <Button key={l} onClick={() => changeLocale(l as 'uz')} size='sm' variant={l===locale?'default':'outline'} className="uppercase">{l}</Button>)
                            }
                        </div>
                    </PopoverContent>
                </Popover>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button onClick={() => handleLogout()} variant="outline" size="icon" className="mt-auto rounded-lg" aria-label="Account">
                                <LogOut className="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>{t('logout')}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
    )
}