'use client'

import { useEffect, useState } from "react"
import { getInfo } from '@/app/apiref/info'
import { ShoppingBag, Users, Shirt, User } from 'lucide-react'
import { Bar, BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const currentDate = new Date()
const currentMonth = currentDate.getMonth()
const monthlyData = new Array(
    new Date(currentDate.getFullYear(), currentMonth+1, 0).getDate()).fill(0)
    .map((_, i) => ({ name: i+1, count: 0 }))

export default function Admin() {
    const [monthly, setMonthly] = useState<any[]>([])
    const [info, setInfo] = useState({
        orders: 0,
        clients: 0,
        tailors: 0,
        services: 0,
        data: []
    })

    useEffect(() => {
        handleGetInfo()
    }, [])

    const handleGetInfo = async () => {
        const { data } = await getInfo()
        setInfo({...data})
        data.monthly.map((m: any) => {
            monthlyData[new Date(m.day).getDate()-1].count = m.order_count
        })
        setMonthly(monthlyData)
    }

    return (
        <div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="max-h-[150px]" x-chunk="dashboard-01-chunk-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Orders
                    </CardTitle>
                    <Shirt className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{ info.orders?.toLocaleString('ru-RU') }</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="max-h-[150px]" x-chunk="dashboard-01-chunk-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Tailors
                    </CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{ info.tailors?.toLocaleString('ru-RU') }</div>
                    <p className="text-xs text-muted-foreground">
                        +180.1% from last month
                    </p>
                    </CardContent>
                </Card>
                <Card className="max-h-[150px]" x-chunk="dashboard-01-chunk-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Registered Clients</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{ info.clients?.toLocaleString('ru-RU') }</div>
                    <p className="text-xs text-muted-foreground">
                        +19% from last month
                    </p>
                    </CardContent>
                </Card>
                <Card className="max-h-[150px]" x-chunk="dashboard-01-chunk-3">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">All Services</CardTitle>
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                    <div className="text-2xl font-bold">{ info.services?.toLocaleString('ru-RU') }</div>
                    <p className="text-xs text-muted-foreground">
                        +201 since last hour
                    </p>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4">
                <Card>
                    <CardHeader className="flex flex-row items-center">
                        <div className="grid gap-2">
                            <CardTitle>Monthly Orders</CardTitle>
                            <CardDescription>Recent transactions from your store.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                            <div className="h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={monthly}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Bar dataKey="count" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}