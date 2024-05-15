'use client'

import Image from "next/image"
import { IReview } from "@/types"
import { useState, useEffect } from 'react'
import { useTranslations } from "next-intl"
import { getReviews } from '@/app/apiref/reviews'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export default function About() {
    const t = useTranslations('about')
    const [reviews, setReviews] = useState<IReview[]>([])

    useEffect(() => {
        handleFetchReviews()
    }, [])

    const handleFetchReviews = async () => {
        const { data } = await getReviews({})
        setReviews(data.result)
    }

    return (
        <>
            <section className="container py-20 bg-background min-h-screen">
                <div className="py-6 text-center">
                    <h1 className="text-xl md:text-2xl font-extrabold">{t('title')}</h1>
                    <p className="mt-4 max-w-2xl text-base mx-auto">{t('description')}</p>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1" dangerouslySetInnerHTML={{__html:t.raw('html')}}></div>
                    
                    <div className="col-span-2 md:col-span-1 grid grid-cols-2 gap-4">
                        <div className="col-span-2 h-[400px]">
                            <Image src="/photos/fashion-designer-woman-working-studio-sitting-desk.jpg" className="w-full h-full object-cover rounded" height={400} width={600} alt="image" />
                        </div>
                        <Image height={400} width={600} src="/photos/pexels-ron-lach-9850824.jpg" className="col-span-1 w-full h-[300px] object-cover rounded" alt="image" />
                        <Image height={400} width={600} src="/photos/trendy-color.jpg" className="col-span-1 w-full h-[300px] object-cover rounded" alt="image" />
                    </div>

                </div>
            </section>
            <section className="container py-0 bg-background">
                {
                    reviews.length > 0 && <div className="py-8 w-full grid grid-cols-1 gap-4">
                        <div className="py-6 col-span-1 text-center">
                            <h1 className="text-xl md:text-2xl font-medium">Reviews about us</h1>
                        </div>

                        {
                            reviews.map((r,i) => <Alert key={i}>
                                <AlertTitle>
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex md:items-center md:gap-2 flex-col sm:flex-row">
                                            <span>{r.first_name} {r.last_name}</span>
                                            <div className="flex py-2 items-center gap-2">
                                                {
                                                    Array(5).fill(0).map((_,i) => <Star size="15" fill="rgb(245 158 11 / 1)" key={i} className={cn('text-amber-500', i > r.rate ? 'opacity-50' : '')} />)
                                                }
                                            </div>
                                        </div>
                                        
                                        <span className="text-muted-foreground text-sm">{ new Date(r.created_at!).toLocaleDateString() }</span>
                                    </div>
                                </AlertTitle>
                                <AlertDescription>{r.message}</AlertDescription>
                            </Alert>)
                    }
                    </div>
                }
            </section>
        </>
    )
}