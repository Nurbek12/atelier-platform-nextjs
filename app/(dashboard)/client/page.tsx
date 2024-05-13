'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Eye, PlusCircle, Trash2, Upload, UserCog } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormEvent, useEffect, useState } from "react"
import { IOrder } from "@/types"
import { deleteOrder, createOrder, createOrderImages, getOrderImages } from '@/app/apiref/orders'
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { authMe } from '@/app/apiref/auth'
import { updateUser } from '@/app/apiref/users'

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

export default function ClientDashboard() {
    let defaultUser = {}
    const [user, setUser] = useState<any>({})
    const [dialog, setDialog] = useState(false)
    const [userDialog, setUserDialog] = useState(false)
    const [dialog1, setDialog1] = useState(false)
    const [viewIndex, setViewIndex] = useState(-1)
    const [items, setItems] = useState<IOrder[]>([])
    const [getLoading, setGetLoading] = useState(false)
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
        setFiles([...files, ...Array.from(fls)])
    }

    const handleSend = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const { data } = await createOrder(order)
        // console.log(data)
        setItems([...items, data.result])
        const formdata = new FormData()
        files.map(f => formdata.append('file', f))
        if(files.length > 0) {
            await createOrderImages(data.result.id, formdata)
            const imgs = await getOrderImages(data.result.id)
            setItems(items.map(i => i.id === data.result.id ? {...i, files: imgs.data.result } as any : i))
        }
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
            ...defaultUser,
        } as any)
        setFiles([])
        setLoading(false)
        setDialog1(false)
        toast('Successfull Sended!')
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

                chest: data.result?.chest || 0,
                waist: data.result?.waist || 0,
                hips: data.result?.hips || 0,
                sleeve: data.result?.sleeve || 0,
                pr_leng: data.result?.pr_leng || 0,
                others: data.result?.others || 0,
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
            toast('Succesfully edited user details')
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
                            Create Order
                        </span>
                    </Button>

                    <Button onClick={() => setUserDialog(true)} className="gap-1">
                        <UserCog className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Profile Settings
                        </span>
                    </Button>
                </div>
            </div>
            <div className='w-full mt-4'>
                <Card x-chunk="dashboard-06-chunk-0" className='w-full'>
                    <CardHeader>
                        <CardTitle>Orders</CardTitle>
                        <CardDescription>
                        Manage your products and view their sales performance.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Tailor</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead>Actions</TableHead>
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
                                                <Badge className={cn({'new':'bg-blue-500 text-white','process':'bg-orange-500 text-white','finish':'bg-green-600'}[im.status], 'hover:text-black dark:hover:text-white')}>{im.status}</Badge>
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
                        <DialogTitle>Order Details</DialogTitle>
                    </DialogHeader>

                    <Card className="border-none">
                        <CardContent className="text-sm py-4 px-0">
                            <div className="grid gap-3">
                                <ul className="grid gap-3">
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">
                                            Tailor
                                        </span>
                                        <span>{ items[viewIndex||0]?.tailor?.first_name } { items[viewIndex||0]?.tailor?.last_name }</span>
                                    </li>
                                    <Separator className="my-1" />
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">
                                            Oreder date
                                        </span>
                                        <span>{ new Date(items[viewIndex||0]?.created_at||0).toLocaleString() }</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">
                                            Order Status
                                        </span>
                                        <div className='max-w-[300px]'>
                                            <Badge className={cn({'new':'bg-blue-500 text-white','process':'bg-orange-500 text-white','finish':'bg-green-600'}[items[viewIndex]?.status || "new"], 'hover:text-black dark:hover:text-white')}>{items[viewIndex]?.status || ""}</Badge>
                                        </div>
                                    </li>
                                </ul>
                                <Separator className="my-2" />
                                <ul className="grid gap-3">
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">First name</span>
                                        <span>{ items[viewIndex]?.first_name }</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Last name</span>
                                        <span>{ items[viewIndex]?.last_name }</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Phone</span>
                                        <span>{ items[viewIndex]?.phone||'-' }</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Email</span>
                                        <span>{ items[viewIndex]?.email }</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Time for contact</span>
                                        <span>{ items[viewIndex]?.contact_times_start }-{items[viewIndex]?.contact_times_end}</span>
                                    </li>
                                </ul>
                            </div>
                            <Separator className="my-4" />
                            <div className="grid gap-3">
                            <div className="font-semibold">Client Details</div>
                                <dl className="grid gap-3">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Type of Clothing</dt>
                                        <dd>{ items[viewIndex]?.type_clothing }</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Preferred Fabric</dt>
                                        <dd>{items[viewIndex]?.preferred_fabric}</dd>
                                    </div>
                                    <Separator className="my-1" />
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Chest</dt>
                                        <dd>{items[viewIndex]?.chest}</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Waist</dt>
                                        <dd>{items[viewIndex]?.waist}</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Hips</dt>
                                        <dd>{items[viewIndex]?.hips}</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Sleeve</dt>
                                        <dd>{items[viewIndex]?.sleeve}</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Project length</dt>
                                        <dd>{items[viewIndex]?.pr_leng}</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Others</dt>
                                        <dd>{items[viewIndex]?.others}</dd>
                                    </div>
                                </dl>
                            </div>
                            <Separator className="my-4" />
                            <div>
                                <div className="font-semibold">Requirements</div>
                                <div className='mt-2'>
                                    {items[viewIndex]?.requirements}
                                </div>
                            </div>
                            {

                                items[viewIndex]?.files?.length > 0 && <>
                                    <Separator className="my-4" />
                                    <div>
                                        <div className="font-semibold">Images</div>
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
                        <DialogTitle>Order Form</DialogTitle>
                    </DialogHeader>
                    <Card className='border-none'>
                        <CardContent className='p-0'>
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
                </DialogContent>
            </Dialog>
            <Dialog open={userDialog} onOpenChange={(o) => {setUserDialog(o)}}>
                <DialogContent style={{ maxHeight: '95vh', maxWidth: 600, overflow: 'auto' }}>
                    <DialogHeader>
                        <DialogTitle>User Details</DialogTitle>
                    </DialogHeader>
                    <Card className='border-none'>
                        <CardContent className='p-0'>
                            <form onSubmit={handleUpdateUser} className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="first_name">Имя</label>
                                    <Input onChange={e => setUser({...user, first_name:e.target.value})} value={user?.first_name||''} 
                                        id='first_name' placeholder='First Name' />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="last_name">Фамилия</label>
                                    <Input onChange={e => setUser({...user,last_name:e.target.value})} value={user?.last_name||''}
                                        id='last_name' placeholder='Last Name' />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="last_name">Контактный телефон (optional)</label>
                                    <Input onChange={e => setUser({...user,phone:e.target.value})} value={user?.phone||''}
                                        id='last_name' placeholder='+998 00 000 00 00' />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="last_name">Адрес электронной почты</label>
                                    <Input onChange={e => setUser({...user,email:e.target.value})} value={user?.email||''}
                                        id='last_name' placeholder='example@domain.com' />
                                </div>

                                <div className='col-span-2 border-b'></div>
                                <div className='col-span-2'>
                                    <h1 className='text-xl font-medium'>Размеры:</h1>
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="last_name">Грудь</label>
                                    <Input onChange={e => setUser({...user,chest:+e.target.value})} value={user?.chest||0}
                                        id='last_name' placeholder='0' type='number' />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="last_name">Талия</label>
                                    <Input onChange={e => setUser({...user,waist:+e.target.value})} value={user?.waist||0} 
                                        id='last_name' placeholder='0' type='number' />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="last_name">Бедра</label>
                                    <Input onChange={e => setUser({...user,hips:+e.target.value})} value={user?.hips||0}
                                        id='last_name' placeholder='0' type='number' />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="last_name">Длина рукава</label>
                                    <Input onChange={e => setUser({...user,sleeve:+e.target.value})} value={user?.sleeve||0}
                                        id='last_name' placeholder='0' type='number' />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="last_name">Длина изделия</label>
                                    <Input onChange={e => setUser({...user,pr_leng:+e.target.value})} value={user?.pr_leng||0}
                                        id='last_name' placeholder='0' type='number' />
                                </div>
                                <div className='col-span-2 md:col-span-1'>
                                    <label htmlFor="other_params">Другие параметры</label>
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