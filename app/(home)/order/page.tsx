'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image'
import { toast } from 'sonner'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { createOrder, createOrderImages } from '@/app/apiref/orders'

const type_items = [
  "костюм",
  "платье",
  "юбка",
  "блуза",
  "брюки",
  "пальто",
  "жилет",
  "комбинезон",
  "шорты",
  "топ",
  "свитер",
  "джинсы",
  "халат",
  "купальник",
  "нижнее белье",
  "пиджак",
  "плащ",
  "спортивная одежда",
  "трикотаж",
  "футляр",
  "шуба",
  "жакет",
  "джинсовая куртка",
  "кожаная куртка",
  "майка",
  "рубашка",
  "сумочка",
  "туфли",
  "ботинки",
  "сапоги",
  "сандалии",
  "тапочки",
  "шляпа",
  "перчатки",
  "шарф",
  "ремень",
  "носки",
  "колготки",
  "галстук",
  "бабочка",
  "бандана",
  "брелоки",
  "браслеты",
  "булавки",
  "броши",
  "серьги",
  "кольца",
  "очки",
  "часы"
]

export default function Contact() {
    const [files, setFiles] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [order, setOrder] = useState({
        type_clothing: "",
        preferred_fabric: "",
        requirements: "",
        contact_times_start: "",
        contact_times_end: "",

        status: "new",

        first_name: "",
        last_name: "",
        email: "",
        phone: "",

        chest: 0,
        waist: 0,
        hips: 0,
        sleeve: 0,
        pr_leng: 0,
        others: 0,
    })
    
    const pushFiles = (fls: FileList) => {
        // if(files.length >= 4) return
        setFiles([...files, ...Array.from(fls)])
    }

    const handleSend = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        const { data } = await createOrder(order)

        const formdata = new FormData()
        files.map(f => formdata.append('file', f))
        await createOrderImages(data.result.id, formdata)
        setOrder({
            type_clothing: "",
            preferred_fabric: "",
            requirements: "",
            contact_times_start: "",
            contact_times_end: "",

            status: "new",

            first_name: "",
            last_name: "",
            email: "",
            phone: "",

            chest: 0,
            waist: 0,
            hips: 0,
            sleeve: 0,
            pr_leng: 0,
            others: 0,
        } as any)
        setFiles([])
        setLoading(false)
        toast('Successfull Sended!')
    }

    return (
        <>
            <section className="container py-20 bg-background min-h-screen">
                <div className="py-6 text-center">
                    <h1 className="text-xl md:text-2xl font-extrabold">Создайте наряд вашей мечты с нашим ателье</h1>
                    <p className="mt-4 max-w-2xl text-base mx-auto">Здесь вы можете заказать нашу услугу по пошиву одежды на заказ.</p>
                </div>
                {/* grid col-span-1 md:grid-cols-2 gap-4 */}
                <div className="mt-6 flex justify-center">
                    <div className='max-w-[600px]'>
                        <Card>
                            <CardHeader>
                                <CardTitle>Форма заказа</CardTitle>
                                {/* <CardDescription></CardDescription> */}
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSend} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="first_name">Имя</label>
                                        <Input onChange={e => setOrder({...order,first_name:e.target.value})} value={order.first_name} 
                                            id='first_name' placeholder='First Name' />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="last_name">Фамилия</label>
                                        <Input onChange={e => setOrder({...order,last_name:e.target.value})} value={order.last_name}
                                            id='last_name' placeholder='Last Name' />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="last_name">Контактный телефон (optional)</label>
                                        <Input onChange={e => setOrder({...order,phone:e.target.value})} value={order.phone}
                                            id='last_name' placeholder='+998 00 000 00 00' />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="last_name">Адрес электронной почты</label>
                                        <Input onChange={e => setOrder({...order,email:e.target.value})} value={order.email}
                                            id='last_name' placeholder='example@domain.com' />
                                    </div>

                                    <div className='col-span-2 border-b'></div>
                                    <div className='col-span-2'>
                                        <h1 className='text-xl font-medium'>Детали заказа:</h1>
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label>Тип одежды</label>
                                        <Select value={order.type_clothing} onValueChange={v => setOrder({...order, type_clothing: v})}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Тип одежды" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    type_items.map((item,index) => <SelectItem value={item} key={index}>{item}</SelectItem>)
                                                }
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className='col-span-2 border-b'></div>
                                    <div className='col-span-2'>
                                        <h1 className='text-xl font-medium'>Размеры:</h1>
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="last_name">Грудь</label>
                                        <Input onChange={e => setOrder({...order,chest:+e.target.value})} value={order.chest}
                                            id='last_name' placeholder='0' type='number' />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="last_name">Талия</label>
                                        <Input onChange={e => setOrder({...order,waist:+e.target.value})} value={order.waist} 
                                            id='last_name' placeholder='0' type='number' />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="last_name">Бедра</label>
                                        <Input onChange={e => setOrder({...order,hips:+e.target.value})} value={order.hips}
                                            id='last_name' placeholder='0' type='number' />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="last_name">Длина рукава</label>
                                        <Input onChange={e => setOrder({...order,sleeve:+e.target.value})} value={order.sleeve}
                                            id='last_name' placeholder='0' type='number' />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="last_name">Длина изделия</label>
                                        <Input onChange={e => setOrder({...order,pr_leng:+e.target.value})} value={order.pr_leng}
                                            id='last_name' placeholder='0' type='number' />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="other_params">Другие параметры</label>
                                        <Input onChange={e => setOrder({...order,others:+e.target.value})} value={order.others} 
                                            id='other_params' placeholder='0' type='number' />
                                    </div>

                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="tkn">Предпочтительная ткань</label>
                                        <Input onChange={e => setOrder({...order,preferred_fabric:e.target.value})} value={order.preferred_fabric} 
                                            id='tkn' placeholder='Example' />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="time">Удобное время для связи</label>
                                        <div className='flex gap-4'>
                                            <Input onChange={e => setOrder({...order,contact_times_start:e.target.value})} value={order.contact_times_start} id='time' placeholder='00:00' type='time' />
                                            <Input onChange={e => setOrder({...order,contact_times_end:e.target.value})} value={order.contact_times_end} placeholder='00:00' type='time' />
                                        </div>
                                    </div>

                                    <div className='col-span-2'>
                                        <label htmlFor="desc">Дополнительные требования и пожелания</label>
                                        <Textarea onChange={e => setOrder({...order,requirements:e.target.value})} value={order.requirements} id="desc" rows={6} className='resize-none'  />
                                    </div>
                                    
                                    <div className='col-span-2 border-b'></div>
                                    <div className='col-span-2'>
                                        <h1 className='font-medium'>Прикрепить фото или эскиз:</h1>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 place-items-center gap-2">
                                        <input hidden id="service-create-files" type="file" multiple accept="image/*" onChange={e => pushFiles(e.target.files!)} />
                                        {
                                            files.map((f,i) => 
                                                <Image key={i} onDoubleClick={() => setFiles(files.filter((_,j) => j !== i))} src={URL.createObjectURL(f)} className='object-cover w-full h-full rounded'
                                                    height={300} width={300} alt='image' />)
                                        }
                                        <button type='button' onClick={() => document.getElementById('service-create-files')?.click()} className="hover:bg-gray-200/30 flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                                            <Upload className="h-4 w-4 text-muted-foreground" />
                                            <span className="sr-only">Upload</span>
                                        </button>
                                    </div>
                                    <div className='col-span-2'>
                                        <Button type='submit' className='w-full' disabled={loading}>{loading?'Sending...':'Send'}</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    )
}