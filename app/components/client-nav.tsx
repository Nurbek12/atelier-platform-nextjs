'use client'

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { LogOut, Shirt, ShoppingCart } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from './theme-toggle'
import { authLogout } from '@/app/apiref/auth'
import { useRouter } from 'next/navigation'

const dashboard_links = [
    { name: "Orders", href: "/client", icon: ShoppingCart },
]

export function ClientNav() {
    const router = useRouter()
    const pathname = usePathname()
    const handleLogout = async () => {
        await authLogout()
        router.push('/')
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
                                    <Link href={item.href}>
                                        <Button variant="ghost" size="icon" className={cn("rounded-lg", pathname===item.href?'bg-muted':'')} aria-label="Playground">
                                            <item.icon className="size-5" />
                                        </Button>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" sideOffset={5}>{item.name}</TooltipContent>
                            </Tooltip>)
                    }
                </TooltipProvider>
            </nav>
            <nav className="mt-auto grid gap-1 p-2">
                <ThemeToggle></ThemeToggle>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button onClick={() => handleLogout()} variant="outline" size="icon" className="mt-auto rounded-lg" aria-label="Account">
                                <LogOut className="size-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>Account</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
    )
}