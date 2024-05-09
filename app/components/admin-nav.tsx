'use client'

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { BarChartBig, LogOut, MessageCircle, Shirt, User, ShoppingCart, BriefcaseBusinessIcon, Briefcase } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from '../components/theme-toggle'

const dashboard_links = [
    { name: "Statistics", href: "/admin", icon: BarChartBig },
    { name: "Clients", href: "/admin/users", icon: User },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Services", href: "/admin/services", icon: BriefcaseBusinessIcon },
    { name: "Messages", href: "/admin/reviews", icon: MessageCircle },
]

export function AdminNav() {
    const pathname = usePathname()

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
                            <Link href="/">
                                <Button variant="outline" size="icon" className="mt-auto rounded-lg" aria-label="Account">
                                    <LogOut className="size-5" />
                                </Button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={5}>Account</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
    )
}