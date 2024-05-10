'use client'

import Link from "next/link"
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { service_styles, service_types } from '@/constants'
import { ServiceCard } from '../../components/service-card'
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { getServices } from '@/app/apiref/services'
import lodash from 'lodash'
import { IService } from "@/types"

const lodashSearch = lodash.debounce((cb:any) => {
    cb()
}, 500)

export default function Contact() {
    const router = useRouter()
    const pathname = usePathname()
    const params = useSearchParams()
    const [items, setItems] = useState<IService[]>([])
    
    const [filters, setFilters] = useState({
        title: params.get('title') || '',
        min_price: parseInt(params.get('min_price')||'0'),
        max_price: parseInt(params.get('max_price')||'0'),
        type: params.get('type') || "",
        style: params.get('style') || "",
    })

    useEffect(() => {
        setValue('title', filters.title)
    }, [])

    const setValue = (key: keyof typeof filters, value: string | number) => {
        if (params.get(key) === value) return
        const updatedQuery: any = {}

        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }))
        
        if (value === 0 || value === '') delete updatedQuery[key]
        else (updatedQuery[key] as any) = value;

        lodashSearch(() => {
            fetchItems(updatedQuery)
        })

        router.replace(`${pathname}?${new URLSearchParams(updatedQuery as any).toString()}`);
    }

    const fetchItems = async (ftrs: any) => {
        const { data } = await getServices(ftrs)
        setItems(data.result)
    }

    return (
        <>
            <section className="container py-20 bg-background min-h-screen">
                <div className="py-6 text-center">
                    <h1 className="text-xl md:text-2xl font-extrabold">Добро пожаловать в наш каталог услуг!</h1>
                    <p className="mt-4 max-w-2xl text-base mx-auto">Ниже вы найдете полный список предоставляемых нами услуг с подробным описанием каждой из них</p>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:max-w-[400px]">
                        <Card className="mx-auto max-w-sm">
                            <CardHeader>
                                <CardTitle className="text-xl">Filter Services</CardTitle>
                                <CardDescription>Find services for your english</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <label htmlFor="title">Name</label>
                                        <Input
                                            id="title"
                                            type="text"
                                            placeholder="Example"
                                            value={filters.title}
                                            onChange={e => setValue('title', e.target.value)}
                                            />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <label htmlFor="min-price">Min price</label>
                                            <Input type="number" id="min-price" placeholder="0" min={0}
                                                value={filters.min_price}
                                                onChange={e => setValue('min_price', +e.target.value)} />
                                        </div>
                                        <div className="grid gap-2">
                                            <label htmlFor="max-price">Max price</label>
                                            <Input type="number" id="max-price" placeholder="1 000 000" min={0}
                                                value={filters.max_price}
                                                onChange={e => setValue('max_price', +e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <label>Type</label>
                                        <Select value={filters.type} onValueChange={e => setValue('type', e)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    service_types.map((s,i) => <SelectItem value={s} key={i}>{s}</SelectItem>)
                                                }
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <label>Style</label>
                                        <Select value={filters.style} onValueChange={e => setValue('style', e)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Style" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    service_styles.map((s,i) => <SelectItem value={s} key={i}>{s}</SelectItem>)
                                                }
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    {/* <Button type="submit" className="w-full">
                                        Find Services
                                    </Button> */}
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm font-light">Не нашли нужную услугу? <Link href='/contact' className="underline">Свяжитесь с нами</Link>, и мы постараемся воплотить вашу модную мечту в жизнь!</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {
                            items.length === 0 && <div className="col-span-1 md:col-span-2 text-center text-gray-500 dark:text-gray-300 text-sm">Items not found</div>
                        }
                        {
                            items.map((item,index) => <ServiceCard item={item} key={index} />)
                        }
                    </div>
                </div>
            </section>
        </>
    )
}