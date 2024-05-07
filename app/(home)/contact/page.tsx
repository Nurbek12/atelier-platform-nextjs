import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MapPin, Phone, MailIcon, Hash, Facebook, Twitter, Instagram, Linkedin, Send, Clock } from 'lucide-react'
import Link from "next/link"

const social_items = [
    { icon: Facebook, url: '' },
    { icon: Twitter, url: '' },
    { icon: Instagram, url: '' },
    { icon: Linkedin, url: '' },
    { icon: Send, url: '' },
]

export default function Contact() {
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
                <div className='text-center mt-12'>Благодарим вас за интерес к нашему ателье! Мы рады ответить на все ваши вопросы и помочь вам с вашими заказами.</div>
            </section>
        </>
    )
}