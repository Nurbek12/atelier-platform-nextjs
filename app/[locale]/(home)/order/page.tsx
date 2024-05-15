'use client'

import Image from 'next/image'
import { toast } from 'sonner'
import { useState } from 'react'
import { Upload } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import { useTranslations, useLocale } from 'next-intl'
import { createOrder, createOrderImages } from '@/app/apiref/orders'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const typeItems = [
    {
      title: {
        ru: 'костюм',
        uz: 'kostyum',
        en: 'suit',
      },
      slug: 'suit',
    },
    {
      title: {
        ru: 'платье',
        uz: 'platye',
        en: 'dress',
      },
      slug: 'dress',
    },
    {
      title: {
        ru: 'юбка',
        uz: 'yubka',
        en: 'skirt',
      },
      slug: 'skirt',
    },
    {
      title: {
        ru: 'блуза',
        uz: 'bluza',
        en: 'blouse',
      },
      slug: 'blouse',
    },
    {
      title: {
        ru: 'брюки',
        uz: 'bryuki',
        en: 'pants',
      },
      slug: 'pants',
    },
    {
      title: {
        ru: 'пальто',
        uz: 'palto',
        en: 'coat',
      },
      slug: 'coat',
    },
    {
      title: {
        ru: 'жилет',
        uz: 'zhilet',
        en: 'vest',
      },
      slug: 'vest',
    },
    {
      title: {
        ru: 'комбинезон',
        uz: 'kombinezon',
        en: 'jumpsuit',
      },
      slug: 'jumpsuit',
    },
    {
      title: {
        ru: 'шорты',
        uz: 'short',
        en: 'shorts',
      },
      slug: 'shorts',
    },
    {
      title: {
        ru: 'топ',
        uz: 'top',
        en: 'top',
      },
      slug: 'top',
    },
    {
      title: {
        ru: 'свитер',
        uz: 'sviter',
        en: 'sweater',
      },
      slug: 'sweater',
    },
    {
      title: {
        ru: 'джинсы',
        uz: 'jins',
        en: 'jeans',
      },
      slug: 'jeans',
    },
    {
      title: {
        ru: 'халат',
        uz: 'xalat',
        en: 'robe',
      },
      slug: 'robe',
    },
    {
      title: {
        ru: 'купальник',
        uz: 'kuplik',
        en: 'swimsuit',
      },
      slug: 'swimsuit',
    },
    {
      title: {
        ru: 'нижнее белье',
        uz: 'ichki belye',
        en: 'underwear',
      },
      slug: 'underwear',
    },
    {
      title: {
        ru: 'пиджак',
        uz: 'pidjak',
        en: 'jacket',
      },
      slug: 'jacket',
    },
    {
      title: {
        ru: 'плащ',
        uz: 'plash',
        en: 'cloak',
      },
      slug: 'cloak',
    },
    {
      title: {
        ru: 'спортивная одежда',
        uz: 'sport odejda',
        en: 'sportswear',
      },
      slug: 'sportswear',
    },
    {
      title: {
        ru: 'трикотаж',
        uz: 'trikotazh',
        en: 'knitwear',
      },
      slug: 'knitwear',
    },
    {
      title: {
        ru: 'футляр',
        uz: 'futlyar',
        en: 'case',
      },
      slug: 'case',
    },
    {
      title: {
        ru: 'шуба',
        uz: 'shuba',
        en: 'fur coat',
      },
      slug: 'fur-coat',
    },
    {
      title: {
        ru: 'жакет',
        uz: 'zheket',
        en: 'jacket',
      },
      slug: 'jacket-2',
    },
    {
      title: {
        ru: 'джинсовая куртка',
        uz: 'jins kurtka',
        en: 'denim jacket',
      },
      slug: 'denim-jacket',
    },
    {
      title: {
        ru: 'кожаная куртка',
        uz: 'kojin kurtka',
        en: 'leather jacket',
      },
      slug: 'leather-jacket',
    },
    {
      title: {
        ru: 'майка',
        uz: 'mayka',
        en: 't-shirt',
      },
      slug: 't-shirt',
    },
    {
      title: {
        ru: 'рубашка',
        uz: 'ruboshka',
        en: 'shirt',
      },
      slug: 'shirt',
    },
    {
      title: {
        ru: 'сумочка',
        uz: 'sumochka',
        en: 'bag',
      },
      slug: 'bag',
    },
    {
      title: {
        ru: 'сандалии',
        uz: 'sandaliya',
        en: 'sandals',
      },
      slug: 'sandals',
    },
    {
      title: {
        ru: 'шляпа',
        uz: 'shlyapa',
        en: 'hat',
      },
      slug: 'hat',
    },
    {
      title: {
        ru: 'перчатки',
        uz: 'perchatki',
        en: 'gloves',
      },
      slug: 'gloves',
    },
    {
      title: {
        ru: 'шарф',
        uz: 'sharf',
        en: 'scarf',
      },
      slug: 'scarf',
    },
    {
      title: {
        ru: 'ремень',
        uz: 'remen',
        en: 'belt',
      },
      slug: 'belt',
    },
    {
      title: {
        ru: 'колготки',
        uz: 'kolgotki',
        en: 'tights',
      },
      slug: 'tights',
    },
    {
      title: {
        ru: 'галстук',
        uz: 'galstuk',
        en: 'tie',
      },
      slug: 'tie',
    },
    {
      title: {
        ru: 'бабочка',
        uz: 'babochka',
        en: 'bow tie',
      },
      slug: 'bow-tie',
    },
    {
      title: {
        ru: 'бандана',
        uz: 'bandana',
        en: 'bandana',
      },
      slug: 'bandana',
    },
    {
      title: {
        ru: 'брелоки',
        uz: 'breloki',
        en: 'charms',
      },
      slug: 'charms',
    },
    {
      title: {
        ru: 'браслеты',
        uz: 'braslety',
        en: 'bracelets',
      },
      slug: 'bracelets',
    },
    {
      title: {
        ru: 'булавки',
        uz: 'bulavki',
        en: 'pins',
      },
      slug: 'pins',
    },
    {
      title: {
        ru: 'броши',
        uz: 'broshi',
        en: 'brooches',
      },
      slug: 'brooches',
    },
    {
      title: {
        ru: 'серьги',
        uz: 'sergi',
        en: 'earrings',
      },
      slug: 'earrings',
    },
    {
      title: {
        ru: 'кольца',
        uz: 'koltsa',
        en: 'rings',
      },
      slug: 'rings',
    },
    {
      title: {
        ru: 'очки',
        uz: 'ochki',
        en: 'glasses',
      },
      slug: 'glasses',
    },
    {
      title: {
        ru: 'часы',
        uz: 'chasi',
        en: 'watches',
      },
      slug: 'watches',
    },
]
  

export default function Contact() {
    const t = useTranslations('order')
    const locale = useLocale()
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

        chest: "",
        waist: "",
        hips: "",
        sleeve: "",
        pr_leng: "",
        others: "",
    } as any)
    
    const pushFiles = (fls: FileList) => {
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

            chest: "",
            waist: "",
            hips: "",
            sleeve: "",
            pr_leng: "",
            others: "",
        } as any)
        setFiles([])
        setLoading(false)
        toast({
          en:'Successfull Sended!',
          ru:'Успешно отправлено!',
          uz: 'Muvaffaqiyatli yuborildi!',
        }[locale as 'en'])
    }

    return (
        <>
            <section className="container py-20 bg-background min-h-screen">
                <div className="py-6 text-center">
                    <h1 className="text-xl md:text-2xl font-extrabold">{t('title')}</h1>
                    <p className="mt-4 max-w-2xl text-base mx-auto">{t('description')}</p>
                </div>
                {/* grid col-span-1 md:grid-cols-2 gap-4 */}
                <div className="mt-6 flex justify-center">
                    <div className='w-full md:max-w-[600px]'>
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('form-title')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSend} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="first_name">{t('order-fname')}</label>
                                        <Input required onChange={e => setOrder({...order,first_name:e.target.value})} value={order.first_name} 
                                            id='first_name' placeholder={t('order-fname')} />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="last_name">{t('order-lname')}</label>
                                        <Input required onChange={e => setOrder({...order,last_name:e.target.value})} value={order.last_name}
                                            id='last_name' placeholder={t('order-lname')} />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="phone">{t('order-phone')}</label>
                                        <Input required onChange={e => setOrder({...order,phone:e.target.value})} value={order.phone}
                                            id='phone' placeholder='+998 00 000 00 00' />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="email">{t('order-email')}</label>
                                        <Input required onChange={e => setOrder({...order,email:e.target.value})} value={order.email}
                                            id='email' placeholder='example@domain.com' />
                                    </div>

                                    <div className='col-span-2 border-b'></div>
                                    <div className='col-span-2'>
                                        <h1 className='text-xl font-medium'>{t('form-subtitle-details')}:</h1>
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label>{t('type-clothes')}</label>
                                        <Select required value={order.type_clothing} onValueChange={v => setOrder({...order, type_clothing: v})}>
                                            <SelectTrigger>
                                                <SelectValue placeholder={t('type-clothes')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    typeItems.map((item,index) => <SelectItem value={item.slug} key={index}>{item.title[locale as 'uz']}</SelectItem>)
                                                }
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className='col-span-2 border-b'></div>
                                    <div className='col-span-2'>
                                        <h1 className='text-xl font-medium'>{t('form-subtitle-measurements')}:</h1>
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="chest">{t('chest')} ({t('santimetr')})</label>
                                        <Input required onChange={e => setOrder({...order,chest: e.target.value === '' ? '' : Number(e.target.value)})} value={order.chest}
                                            id='chest' placeholder='0' type='number' />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="waist">{t('waist')} ({t('santimetr')})</label>
                                        <Input required onChange={e => setOrder({...order,waist: e.target.value === '' ? '' : Number(e.target.value)})} value={order.waist} 
                                            id='waist' placeholder='0' type='number' />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="hips">{t('hips')} ({t('santimetr')})</label>
                                        <Input required onChange={e => setOrder({...order, hips: e.target.value === '' ? '' : Number(e.target.value)})} value={order.hips}
                                            id='hips' placeholder='0' type='number' />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="sleeve">{t('sleeve')} ({t('santimetr')})</label>
                                        <Input required onChange={e => setOrder({...order,sleeve: e.target.value === '' ? '' : Number(e.target.value)})} value={order.sleeve}
                                            id='sleeve' placeholder='0' type='number' />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="pr_leng">{t('pr_leng')} ({t('santimetr')})</label>
                                        <Input required onChange={e => setOrder({...order,pr_leng: e.target.value === '' ? '' : Number(e.target.value)})} value={order.pr_leng}
                                            id='pr_leng' placeholder='0' type='number' />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="others">{t('others')} ({t('santimetr')})</label>
                                        <Input required onChange={e => setOrder({...order,others: e.target.value === '' ? '' : Number(e.target.value)})} value={order.others} 
                                            id='others' placeholder='0' type='number' />
                                    </div>

                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="tkn">{t('preferred_fabric')}</label>
                                        <Input required onChange={e => setOrder({...order,preferred_fabric: e.target.value})} value={order.preferred_fabric} 
                                            id='tkn' placeholder='Example' />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="time">{t('contact_times')}</label>
                                        <div className='flex gap-4'>
                                            <Input required onChange={e => setOrder({...order,contact_times_start:e.target.value})} value={order.contact_times_start} id='time' placeholder='00:00' type='time' />
                                            <Input required onChange={e => setOrder({...order,contact_times_end:e.target.value})} value={order.contact_times_end} placeholder='00:00' type='time' />
                                        </div>
                                    </div>

                                    <div className='col-span-2'>
                                        <label htmlFor="desc">{t('requirements')}</label>
                                        <Textarea required onChange={e => setOrder({...order,requirements:e.target.value})} value={order.requirements} id="desc" rows={6} className='resize-none'  />
                                    </div>
                                    
                                    <div className='col-span-2 border-b'></div>
                                    <div className='col-span-2'>
                                        <label htmlFor='service-create-files' className='font-medium'>{t('attach_photos')}:</label>
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
                                            {/* <span className="sr-only">Upload</span> */}
                                        </button>
                                    </div>
                                    <div className='col-span-2'>
                                        <Button type='submit' className='w-full' disabled={loading}>{loading?t('loading'):t('order')}</Button>
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