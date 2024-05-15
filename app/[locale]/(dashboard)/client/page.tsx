'use client'

import { toast } from 'sonner'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { IOrder } from "@/types"
import { authMe } from '@/app/apiref/auth'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { updateUser } from '@/app/apiref/users'
import { Textarea } from '@/components/ui/textarea'
import { DialogTitle } from "@radix-ui/react-dialog"
import { Separator } from '@/components/ui/separator'
import { FormEvent, useEffect, useState } from "react"
import { useTranslations, useLocale } from 'next-intl'
import { Eye, PlusCircle, Trash2, Upload, UserCog } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { deleteOrder, createOrder, createOrderImages, getOrderImages } from '@/app/apiref/orders'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

export default function ClientDashboard() {
    let defaultUser: any = {}
    const locale = useLocale()
    const t1 = useTranslations('order')
    const t2 = useTranslations('client')
    const t = useTranslations('admin-orders')
    const [user, setUser] = useState<any>({})
    const [dialog, setDialog] = useState(false)
    const [dialog1, setDialog1] = useState(false)
    const [files, setFiles] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [viewIndex, setViewIndex] = useState(-1)
    const [items, setItems] = useState<IOrder[]>([])
    const [getLoading, setGetLoading] = useState(false)
    const [userDialog, setUserDialog] = useState(false)
    const [order, setOrder] = useState<any>({
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

        chest: '',
        waist: '',
        hips: '',
        sleeve: '',
        pr_leng: '',
        others: '',
    })
    
    const pushFiles = (fls: FileList) => {
        setFiles([...files, ...Array.from(fls)])
    }

    const handleSend = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const { data } = await createOrder(order)
        let fls = []
        // setItems([...items, data.result])
        const formdata = new FormData()
        files.map(f => formdata.append('file', f))
        if(files.length > 0) {
          await createOrderImages(data.result.id, formdata)
          const imgs = await getOrderImages(data.result.id)
          fls = imgs.data.result
          // setItems(items.map(i => i.id === data.result.id ? {...i, files: imgs.data.result } as any : i))
        }
        setItems([...items, {...data.result, files: fls}]);
        delete defaultUser.role;
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

            chest: '',
            waist: '',
            hips: '',
            sleeve: '',
            pr_leng: '',
            others: '',
            ...defaultUser,
        } as any)
        setFiles([])
        setLoading(false)
        setDialog1(false)
        toast({
          en:'Successfull Sended!',
          ru:'Успешно отправлено!',
          uz: 'Muvaffaqiyatli yuborildi!',
        }[locale as 'en'])
    }

    useEffect(() => {
        getItems()
    }, [])

    const getItems = async () => {
        try {
            setGetLoading(true)
            const { data } = await authMe()
            if(data.result === null) return
            setItems(data.orders)
            setUser(data.result)
            defaultUser = {
                first_name: data.result?.first_name || "",
                last_name: data.result?.last_name || "",
                email: data.result?.email || "",
                phone: data.result?.phone || "",

                chest: data.result?.chest || '',
                waist: data.result?.waist || '',
                hips: data.result?.hips || '',
                sleeve: data.result?.sleeve || '',
                pr_leng: data.result?.pr_leng || '',
                others: data.result?.others || '',
            }
            
            setOrder({...order, ...defaultUser})
        } catch (error) {
            console.log(error)
        } finally {
            setGetLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        if(!confirm('Do you delete this item?')) return
        await deleteOrder(id)
        setItems(items.filter(im => im.id !== id))
    }

    const viewItem = (index: number) => {
        setViewIndex(index)
        setDialog(true)
    }

    const handleUpdateUser = async (e: FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)
            const { id, ...others } = user
            await updateUser(id, others)
            setUserDialog(false)
            setOrder({...order, ...others})
            toast({
              en:'Succesfully edited user details!',
              ru:'Данные пользователя успешно изменены.!',
              uz: 'Foydalanuvchi tafsilotlari muvaffaqiyatli tahrirlandi!',
            }[locale as 'en'])
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <div className="flex items-center w-full">
                <div className="flex justify-between items-center gap-2 w-full">
                    <Button onClick={() => setDialog1(true)} className="gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            {t2('create-order')}
                        </span>
                    </Button>

                    <Button onClick={() => setUserDialog(true)} className="gap-1">
                        <UserCog className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            {t2('profile-settings')}
                        </span>
                    </Button>
                </div>
            </div>
            <div className='w-full mt-4'>
                <Card x-chunk="dashboard-06-chunk-0" className='w-full'>
                    <CardHeader>
                        <CardTitle>{t('title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                  <TableHead>ID</TableHead>
                                  <TableHead>{t('form-fname')} {t('form-lname')}</TableHead>
                                  <TableHead>{t('status')}</TableHead>
                                  <TableHead>{t('form-email')}</TableHead>
                                  <TableHead>{t('form-phone')}</TableHead>
                                  <TableHead>{t('tailor')}</TableHead>
                                  <TableHead>{t('created')}</TableHead>
                                  <TableHead>{t('actions')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    items.map((im,i) => 
                                        <TableRow key={i}>
                                            <TableCell>
                                                {im.id}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {im.first_name} {im.last_name}
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={cn({'new':'bg-blue-500 text-white','process':'bg-orange-500 text-white','finish':'bg-green-600'}[im.status], 'hover:text-black dark:hover:text-white')}>{t(im.status)}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                {im.email}
                                            </TableCell>
                                            <TableCell>
                                                {im.phone}
                                            </TableCell>
                                            <TableCell>
                                                {im.tailor?.first_name} {im.tailor?.email&&('('+im.tailor?.email+')')}
                                            </TableCell>
                                            <TableCell>
                                                { new Date(im.created_at).toLocaleDateString() }
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2 items-center">
                                                    <Button onClick={() => viewItem(i)} size='icon'>
                                                        <Eye className="w-5 h-5" />
                                                    </Button>
                                                    <Button onClick={() => handleDelete(im.id)} size='icon'>
                                                        <Trash2 className="w-5 h-5" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>)
                                }
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            <Dialog open={dialog} onOpenChange={(o) => {setDialog(o);setViewIndex(-1)}}>
                <DialogContent style={{ maxHeight: '95vh', maxWidth: 600, overflow: 'auto' }}>
                    <DialogHeader>
                        <DialogTitle>{t('order-details')}</DialogTitle>
                    </DialogHeader>

                    <Card className="border-none">
                        <CardContent className="text-sm py-4 px-0">
                            <div className="grid gap-3">
                                <ul className="grid gap-3">
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">
                                            {t('tailor')}
                                        </span>
                                        <span>{ items[viewIndex||0]?.tailor?.first_name } { items[viewIndex||0]?.tailor?.last_name }</span>
                                    </li>
                                    <Separator className="my-1" />
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">
                                            {t('order-date')}
                                        </span>
                                        <span>{ new Date(items[viewIndex||0]?.created_at||0).toLocaleString() }</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">
                                            {t('order-status')}
                                        </span>
                                        <div className='max-w-[300px]'>
                                            <Badge className={cn({'new':'bg-blue-500 text-white','process':'bg-orange-500 text-white','finish':'bg-green-600'}[items[viewIndex]?.status || "new"], 'hover:text-black dark:hover:text-white')}>{t(items[viewIndex]?.status || "new")}</Badge>
                                        </div>
                                    </li>
                                </ul>
                                <Separator className="my-2" />
                                <div className="font-semibold">{t('client-details')}</div>
                                <ul className="grid gap-3">
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">{t('form-fname')}</span>
                                        <span>{ items[viewIndex]?.first_name }</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">{t('form-lname')}</span>
                                        <span>{ items[viewIndex]?.last_name }</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">{t('form-phone')}</span>
                                        <span>{ items[viewIndex]?.phone||'-' }</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">{t('form-email')}</span>
                                        <span>{ items[viewIndex]?.email }</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">{t1('contact_times')}</span>
                                        <span>{ items[viewIndex]?.contact_times_start }-{items[viewIndex]?.contact_times_end}</span>
                                    </li>
                                </ul>
                            </div>
                            <Separator className="my-4" />
                            <div className="grid gap-3">
                                <dl className="grid gap-3">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">{t1('type-clothes')}</dt>
                                        <dd>{ items[viewIndex]?.type_clothing }</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">{t1('preferred_fabric')}</dt>
                                        <dd>{items[viewIndex]?.preferred_fabric}</dd>
                                    </div>
                                    <Separator className="my-1" />
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">{t1('chest')}</dt>
                                        <dd>{items[viewIndex]?.chest} {t1('santimetr')}</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">{t1('waist')}</dt>
                                        <dd>{items[viewIndex]?.waist} {t1('santimetr')}</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">{t1('hips')}</dt>
                                        <dd>{items[viewIndex]?.hips} {t1('santimetr')}</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">{t1('sleeve')}</dt>
                                        <dd>{items[viewIndex]?.sleeve} {t1('santimetr')}</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">{t1('pr_leng')}</dt>
                                        <dd>{items[viewIndex]?.pr_leng} {t1('santimetr')}</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">{t1('others')}</dt>
                                        <dd>{items[viewIndex]?.others} {t1('santimetr')}</dd>
                                    </div>
                                </dl>
                            </div>
                            <Separator className="my-4" />
                            <div>
                                <div className="font-semibold">{t1('requirements')}</div>
                                <div className='mt-2'>
                                    {items[viewIndex]?.requirements}
                                </div>
                            </div>
                            {
                                items[viewIndex]?.files?.length > 0 && <>
                                    <Separator className="my-4" />
                                    <div>
                                        <div className="font-semibold">{t('images')}</div>
                                        <div className="grid grid-cols-2 gap-2 mt-2">
                                        {
                                            items[viewIndex]?.files?.map((f,i) => 
                                                <img key={i} src={f.file} className='object-cover w-full h-full rounded'
                                                    height={300} width={300} alt='image' />)
                                        }
                                        </div>
                                    </div>
                                </>
                            }
                        </CardContent>
                    </Card>
                </DialogContent>
            </Dialog>
            <Dialog open={dialog1} onOpenChange={(o) => {setDialog1(o)}}>
                <DialogContent style={{ maxHeight: '95vh', maxWidth: 600, overflow: 'auto' }}>
                    <DialogHeader>
                        <DialogTitle>{t('form-title')}</DialogTitle>
                    </DialogHeader>
                    <Card className='border-none'>
                        <CardContent className='p-0'>
                            <form onSubmit={handleSend} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="first_name">{t1('order-fname')}</label>
                                    <Input required onChange={e => setOrder({...order,first_name:e.target.value})} value={order.first_name} 
                                        id='first_name' placeholder={t1('order-fname')} />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="last_name">{t1('order-lname')}</label>
                                    <Input required onChange={e => setOrder({...order,last_name:e.target.value})} value={order.last_name}
                                        id='last_name' placeholder={t1('order-lname')} />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="phone">{t1('order-phone')}</label>
                                    <Input required onChange={e => setOrder({...order,phone:e.target.value})} value={order.phone}
                                        id='phone' placeholder='+998 00 000 00 00' />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="email">{t1('order-email')}</label>
                                    <Input required onChange={e => setOrder({...order,email:e.target.value})} value={order.email}
                                        id='email' placeholder='example@domain.com' />
                                </div>

                                <div className='col-span-2 border-b'></div>
                                <div className='col-span-2'>
                                    <h1 className='text-xl font-medium'>{t1('form-subtitle-details')}:</h1>
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label>{t1('type-clothes')}</label>
                                    <Select required value={order.type_clothing} onValueChange={v => setOrder({...order, type_clothing: v})}>
                                        <SelectTrigger>
                                            <SelectValue placeholder={t1('type-clothes')} />
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
                                    <h1 className='text-xl font-medium'>{t1('form-subtitle-measurements')}:</h1>
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="chest">{t1('chest')} ({t1('santimetr')})</label>
                                    <Input required onChange={e => setOrder({...order,chest: e.target.value === '' ? '' : Number(e.target.value)})} value={order.chest}
                                        id='chest' placeholder='0' type='number' />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="waist">{t1('waist')} ({t1('santimetr')})</label>
                                    <Input required onChange={e => setOrder({...order,waist: e.target.value === '' ? '' : Number(e.target.value)})} value={order.waist} 
                                        id='waist' placeholder='0' type='number' />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="hips">{t1('hips')} ({t1('santimetr')})</label>
                                    <Input required onChange={e => setOrder({...order, hips: e.target.value === '' ? '' : Number(e.target.value)})} value={order.hips}
                                        id='hips' placeholder='0' type='number' />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="sleeve">{t1('sleeve')} ({t1('santimetr')})</label>
                                    <Input required onChange={e => setOrder({...order,sleeve: e.target.value === '' ? '' : Number(e.target.value)})} value={order.sleeve}
                                        id='sleeve' placeholder='0' type='number' />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="pr_leng">{t1('pr_leng')} ({t1('santimetr')})</label>
                                    <Input required onChange={e => setOrder({...order,pr_leng: e.target.value === '' ? '' : Number(e.target.value)})} value={order.pr_leng}
                                        id='pr_leng' placeholder='0' type='number' />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="others">{t1('others')} ({t1('santimetr')})</label>
                                    <Input required onChange={e => setOrder({...order,others: e.target.value === '' ? '' : Number(e.target.value)})} value={order.others} 
                                        id='others' placeholder='0' type='number' />
                                </div>

                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="tkn">{t1('preferred_fabric')}</label>
                                    <Input required onChange={e => setOrder({...order,preferred_fabric: e.target.value})} value={order.preferred_fabric} 
                                        id='tkn' placeholder='Example' />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="time">{t1('contact_times')}</label>
                                    <div className='flex gap-4'>
                                        <Input required onChange={e => setOrder({...order,contact_times_start:e.target.value})} value={order.contact_times_start} id='time' placeholder='00:00' type='time' />
                                        <Input required onChange={e => setOrder({...order,contact_times_end:e.target.value})} value={order.contact_times_end} placeholder='00:00' type='time' />
                                    </div>
                                </div>

                                <div className='col-span-2'>
                                    <label htmlFor="desc">{t1('requirements')}</label>
                                    <Textarea required onChange={e => setOrder({...order,requirements:e.target.value})} value={order.requirements} id="desc" rows={6} className='resize-none'  />
                                </div>
                                
                                <div className='col-span-2 border-b'></div>
                                <div className='col-span-2'>
                                    <label htmlFor='service-create-files' className='font-medium'>{t1('attach_photos')}:</label>
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
                                    <Button type='submit' className='w-full' disabled={loading}>{loading?t1('loading'):t1('order')}</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </DialogContent>
            </Dialog>
            <Dialog open={userDialog} onOpenChange={(o) => {setUserDialog(o)}}>
                <DialogContent style={{ maxHeight: '95vh', maxWidth: 600, overflow: 'auto' }}>
                    <DialogHeader>
                        <DialogTitle>{t2('user-details')}</DialogTitle>
                    </DialogHeader>
                    <Card className='border-none'>
                        <CardContent className='p-0'>
                            <form onSubmit={handleUpdateUser} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="first_name">{t1('order-fname')}</label>
                                    <Input onChange={e => setUser({...user, first_name:e.target.value})} value={user?.first_name||''} 
                                        id='first_name' placeholder={t1('order-fname')} />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="last_name">{t1('order-lname')}</label>
                                    <Input onChange={e => setUser({...user,last_name:e.target.value})} value={user?.last_name||''}
                                        id='last_name' placeholder={t1('order-lname')} />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="last_name">{t1('order-phone')}</label>
                                    <Input onChange={e => setUser({...user,phone:e.target.value})} value={user?.phone||''}
                                        id='last_name' placeholder='+998 00 000 00 00' />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="last_name">{t1('order-email')}</label>
                                    <Input onChange={e => setUser({...user,email:e.target.value})} value={user?.email||''}
                                        id='last_name' placeholder='example@domain.com' />
                                </div>

                                <div className='col-span-2 border-b'></div>
                                <div className='col-span-2'>
                                    <h1 className='text-xl font-medium'>{t1('form-subtitle-measurements')}:</h1>
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="last_name">{t1('chest')} ({t1('santimetr')})</label>
                                    <Input onChange={e => setUser({...user,chest:+e.target.value})} value={user?.chest||0}
                                        id='last_name' placeholder='0' type='number' />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="last_name">{t1('waist')} ({t1('santimetr')})</label>
                                    <Input onChange={e => setUser({...user,waist:+e.target.value})} value={user?.waist||0} 
                                        id='last_name' placeholder='0' type='number' />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="last_name">{t1('hips')} ({t1('santimetr')})</label>
                                    <Input onChange={e => setUser({...user,hips:+e.target.value})} value={user?.hips||0}
                                        id='last_name' placeholder='0' type='number' />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="last_name">{t1('sleeve')} ({t1('santimetr')})</label>
                                    <Input onChange={e => setUser({...user,sleeve:+e.target.value})} value={user?.sleeve||0}
                                        id='last_name' placeholder='0' type='number' />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="last_name">{t1('pr_leng')} ({t1('santimetr')})</label>
                                    <Input onChange={e => setUser({...user,pr_leng:+e.target.value})} value={user?.pr_leng||0}
                                        id='last_name' placeholder='0' type='number' />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="other_params">{t1('others')} ({t1('santimetr')})</label>
                                    <Input onChange={e => setUser({...user,others:+e.target.value})} value={user?.others||0} 
                                        id='other_params' placeholder='0' type='number' />
                                </div>

                                <div className='col-span-2'>
                                    <Button type='submit' className='w-full' disabled={loading}>{loading?'Saving...':'Save'}</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </DialogContent>
            </Dialog>
        </div>
    )
}