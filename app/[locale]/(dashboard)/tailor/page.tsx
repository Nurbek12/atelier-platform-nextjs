'use client'

import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { IOrder } from "@/types"
import { Eye } from 'lucide-react'
import { useEffect, useState } from "react"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DialogTitle } from "@radix-ui/react-dialog"
import { Separator } from '@/components/ui/separator'
import { useTranslations, useLocale } from 'next-intl'
import { getOrders, updateOrder } from '@/app/apiref/orders'
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function TailorOrders() {
    // const locale = useLocale()
    const t1 = useTranslations('order')
    const t2 = useTranslations('tailor')
    const t = useTranslations('admin-orders')
    const [dialog, setDialog] = useState(false)
    const [viewIndex, setViewIndex] = useState(-1)
    const [items, setItems] = useState<IOrder[]>([])
    const [getLoading, setGetLoading] = useState(false)

    useEffect(() => {
        getItems()
    }, [])

    const getItems = async () => {
        try {
            setGetLoading(true)
            const { data } = await getOrders({})
            setItems(data.result)
        } catch (error) {
            console.log(error)
        } finally {
            setGetLoading(false)
        }
    }

    const viewItem = (index: number) => {
        setViewIndex(index)
        setDialog(true)
    }

    const changeOrder = async (id: number, status: any) => {
        if(!confirm("Do you want finish this order?")) return
        await updateOrder(id, {status})
        setItems(items.map(i => i.id === id ? {...i, status} as any : i))
        toast('Succesfully changed status to finish!')
        setDialog(false)
    }

    return (
        <div>
            <div className='w-full'>
                <Card x-chunk="dashboard-06-chunk-0" className='w-full'>
                    <CardHeader>
                        <CardTitle>Orders</CardTitle>
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
                                                <Badge className={cn({'new':'bg-blue-500 text-white','process':'bg-orange-500 text-white','finish':'bg-green-600'}[im.status || "new"], 'hover:text-black dark:hover:text-white')}>{t(im.status || "new")}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                {im.email}
                                            </TableCell>
                                            <TableCell>
                                                {im.phone}
                                            </TableCell>
                                            <TableCell>
                                                { new Date(im.created_at).toLocaleDateString() }
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2 items-center">
                                                    <Button onClick={() => viewItem(i)} size='icon'>
                                                        <Eye className="w-5 h-5" />
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
                                            {t('order-date')}
                                        </span>
                                        <span>{ new Date(items[viewIndex||0]?.created_at||0).toLocaleString() }</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">
                                            {t('order-status')}
                                        </span>
                                        <div className='max-w-[300px]'>
                                            <Button disabled={items[viewIndex]?.status === 'finish'} onClick={() => changeOrder(items[viewIndex]?.id, 'finish')}>{t2('finish-order')}</Button>
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

                            {/* <div className="grid gap-3">
                                <ul className="grid gap-3">
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
                                            <Button disabled={items[viewIndex]?.status === 'finish'} onClick={() => changeOrder(items[viewIndex]?.id, 'finish')}>Finish Order</Button>
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
                            </div> */}
                            {/* <Separator className="my-4" />
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
                            } */}
                        </CardContent>
                    </Card>
                </DialogContent>
            </Dialog>
        </div>
    )
}