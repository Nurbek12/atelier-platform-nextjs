'use client'

import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star, StarOff, MapPin, Phone, MailIcon, Hash, Facebook, Twitter, Instagram, Linkedin, Send, Clock } from 'lucide-react'
import Link from "next/link"
import { useState } from "react"
import { createReview } from '@/app/apiref/reviews'
import { cn } from '@/lib/utils'

const social_items = [
    { icon: Facebook, url: '' },
    { icon: Twitter, url: '' },
    { icon: Instagram, url: '' },
    { icon: Linkedin, url: '' },
    { icon: Send, url: '' },
]

export default function Contact() {
    const [loading, setLoading] = useState(false)
    const [review, setReview] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        message: "",
        rate: 0
    })

    const handleSend = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        await createReview(review)
        setReview({
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            message: "",
            rate: 1
        })
        setLoading(false)
        toast('Successfull Sended!')
    }

    return (
        <>
            <section className="container pt-20 pb-10 bg-background min-h-screen">
                <div className="py-6 text-center">
                    <h1 className="text-xl md:text-2xl font-extrabold">Свяжитесь с нами</h1>
                    <p className="mt-4 max-w-2xl text-base mx-auto">Если у вас есть вопросы или предложения, свяжитесь с нами, и мы ответим вам в ближайшее время.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="max-w-full md:max-w-[500px] w-full space-y-2">
                        <Alert>
                            <MapPin className="h-5 w-5" />
                            <AlertTitle>Адрес:</AlertTitle>
                            <AlertDescription>
                                Uzbekistan, Samarkand, Random str. 12 h.
                            </AlertDescription>
                        </Alert>
                        <Alert>
                            <Phone className="h-5 w-5" />
                            <AlertTitle>Телефон:</AlertTitle>
                            <AlertDescription>+998 00 000 00 00</AlertDescription>
                        </Alert>
                        <Alert>
                            <MailIcon className="h-5 w-5" />
                            <AlertTitle>Электронная почта</AlertTitle>
                            <AlertDescription>example@mail.com</AlertDescription>
                        </Alert>
                        <Alert>
                            <Clock className="h-5 w-5" />
                            <AlertTitle>Часы работы:</AlertTitle>
                            <AlertDescription>
                                <div className="mt-2 flex flex-col gap-1">
                                    <div>Понедельник-Пятница: 09:00-18:00</div>
                                    <div>Суббота: 09:00-12:00</div>
                                    <div className="text-red-500">Воскресенье: Отдых</div>
                                </div>
                            </AlertDescription>
                        </Alert>
                        <Alert>
                            <Hash className="h-5 w-5" />
                            <AlertTitle>Социальные сети:</AlertTitle>
                            <AlertDescription>
                                <div className='mt-2 flex gap-4 items-center'>
                                    {
                                        social_items.map((item,index) => <a target="_blank" href={item.url} key={index}>
                                            <item.icon className="w-5 h-5" />
                                        </a>)
                                    }
                                </div>
                            </AlertDescription>
                        </Alert>
                    </div>
                    <div className="flex-1 min-h-[500px] bg-muted">
                        <iframe title="geolocation" width="100%" height="100%" id="gmap_canvas"
                            src="https://maps.google.com/maps?q=Uzbekistan&z=7&ie=UTF8&iwloc=&output=embed">
                        </iframe>
                    </div>
                </div>
                <div className="flex mt-6">
                    <Card className="mx-auto md:max-w-[500px]">
                        <CardHeader>
                            <CardTitle className="text-xl">Благодарим вас за интерес к нашему ателье!</CardTitle>
                            <CardDescription>Мы рады ответить на все ваши вопросы и помочь вам с вашими заказами.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSend} className="grid gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <label htmlFor="first-name">First Name</label>
                                        <Input id="first-name" placeholder="First name"
                                        onChange={e => setReview({...review, first_name: e.target.value})} value={review.first_name} />
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="last-name">Last Name</label>
                                        <Input id="last-name" placeholder="Last name"
                                        onChange={e => setReview({...review, last_name: e.target.value})} value={review.last_name} />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="email">Email</label>
                                    <Input
                                        id="email"
                                        type="text"
                                        placeholder="example@mail.com"
                                        onChange={e => setReview({...review, email: e.target.value})} value={review.email}
                                        />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="phone">Phone (optional)</label>
                                    <Input
                                        id="phone"
                                        type="text"
                                        placeholder="+998 __ ___ __ __"
                                        onChange={e => setReview({...review, phone: e.target.value})} value={review.phone}
                                        />
                                </div>
                                <div className="grid gap-2">
                                    <label htmlFor="message">Message</label>
                                    <Textarea id="message" rows={6} className="resize-none" placeholder="Write an message..."
                                    onChange={e => setReview({...review, message: e.target.value})} value={review.message} />
                                </div>
                                <div className="flex py-2 items-center gap-2">
                                    {
                                        Array(5).fill(0).map((_,i) => <Star key={i} className={cn('cursor-pointer hover:opacity-100', i > review.rate ? 'opacity-50' : '')} onClick={() => setReview({...review, rate: i})} />)
                                    }
                                </div>
                                <Button disabled={loading} type="submit" className="w-full">
                                    {loading?'Sending...':'Send Message'}
                                </Button>
                            </form>
                            <div className="mt-4">
                                <p className="text-sm font-light">Не нашли нужную услугу? <Link href='/contact' className="underline">Свяжитесь с нами</Link>, и мы постараемся воплотить вашу модную мечту в жизнь!</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </>
    )
}