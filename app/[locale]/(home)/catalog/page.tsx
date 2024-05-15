'use client'

import lodash from 'lodash'
import { IService } from "@/types"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { getServices } from '@/app/apiref/services'
import { useTranslations, useLocale } from 'next-intl'
import { serviceStyles, serviceTypes } from '@/constants'
import { ServiceCard } from '@/app/components/service-card'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const lodashSearch = lodash.debounce((cb:any) => {
    cb()
}, 500)

export default function Contact() {
    const locale = useLocale()
    const t = useTranslations('catalog')

    const router = useRouter()
    const pathname = usePathname()
    const params = useSearchParams()
    const [items, setItems] = useState<IService[]>([])
    
    const [filters, setFilters] = useState({
        type: params.get('type') || "",
        style: params.get('style') || "",
        title: params.get('title') || '',
        min_price: params.get('min_price')||'',
        max_price: params.get('max_price')||'',
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

        router.replace(`${pathname}?${new window.URLSearchParams(updatedQuery as any).toString()}`);
    }

    const fetchItems = async (ftrs: any) => {
        const { data } = await getServices(ftrs)
        setItems(data.result)
    }

    return (
        <>
            <section className="container py-20 bg-background min-h-screen">
                <div className="py-6 text-center">
                    <h1 className="text-xl md:text-2xl font-extrabold">{t('title')}</h1>
                    <p className="mt-4 max-w-2xl text-base mx-auto">{t('description')}</p>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:max-w-[400px]">
                        <Card className="mx-auto md:max-w-sm">
                            <CardHeader>
                                <CardTitle className="text-xl">{t('filter-title')}</CardTitle>
                                <CardDescription>{t('filter-description')}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <label htmlFor="title">{t('fiter-name')}</label>
                                        <Input
                                            id="title"
                                            type="text"
                                            value={filters.title}
                                            placeholder={t('fiter-name')}
                                            onChange={e => setValue('title', e.target.value)}
                                            />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <label htmlFor="min-price">{t('min-price')}</label>
                                            <Input id="min-price" placeholder="0"
                                                value={filters.min_price} type="number"
                                                onChange={e => setValue('min_price', e.target.value === '' ? '' : Number(e.target.value))} />
                                        </div>
                                        <div className="grid gap-2">
                                            <label htmlFor="max-price">{t('max-price')}</label>
                                            <Input id="max-price" placeholder="1 000 000 000"
                                                value={filters.max_price} type="number"
                                                onChange={e => setValue('max_price', e.target.value === '' ? '' : Number(e.target.value))} />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <label>{t('filter-type')}</label>
                                        <Select value={filters.type} onValueChange={e => setValue('type', e)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    serviceTypes.map((s,i) => <SelectItem value={s.slug} key={i}>{s.title[locale as 'uz']}</SelectItem>)
                                                }
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <label>{t('filter-style')}</label>
                                        <Select value={filters.style} onValueChange={e => setValue('style', e)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Style" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    serviceStyles.map((s,i) => <SelectItem value={s.slug} key={i}>{s.title[locale as 'uz']}</SelectItem>)
                                                }
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm font-light">{t('filter-footer')}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {
                            items.length === 0 && <div className="col-span-1 md:col-span-2 text-center text-gray-500 dark:text-gray-300 text-sm">{t('items-not-found')}</div>
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