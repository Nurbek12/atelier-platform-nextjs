'use client'

import { Trash2 } from 'lucide-react'
import type { IReview } from '@/types'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from "react"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getReviews, deleteReview } from '@/app/apiref/reviews'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function AdminMessages() {
    const t = useTranslations('admin-orders')
    const t1 = useTranslations('admin-reviews')
    const [items, setItems] = useState<IReview[]>([])
    const [getLoading, setGetLoading] = useState(false)

    useEffect(() => {
        getItems()
    }, [])

    const getItems = async () => {
        try {
            setGetLoading(true)
            const { data } = await getReviews({})
            setItems(data.result)
        } catch (error) {
            console.log(error)
        } finally {
            setGetLoading(false)
        }
    }

    const handleDelete = async (id: number) => {
        if(!confirm('Do you delete this item?')) return
        await deleteReview(id)
        setItems(items.filter(im => im.id !== id))
    }

    return (
        <div>
            <div className='w-full'>
                <Card x-chunk="dashboard-06-chunk-0" className='w-full'>
                    <CardHeader>
                        <CardTitle>{t1('title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>{t1('name')}</TableHead>
                                    <TableHead>{t1('rate')}</TableHead>
                                    <TableHead>{t('form-email')}</TableHead>
                                    <TableHead>{t('form-phone')}</TableHead>
                                    <TableHead>{t1('message')}</TableHead>
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
                                            <TableCell>
                                                {im.first_name} {im.last_name}
                                            </TableCell>
                                            <TableCell>
                                                <Badge>{im.rate}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                {im.email}
                                            </TableCell>
                                            <TableCell>
                                                {im.phone}
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-balance">{im.message}</div>
                                            </TableCell>
                                            <TableCell>
                                                { new Date(im.created_at).toLocaleDateString() }
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2 items-center">
                                                    <Button onClick={()=>handleDelete(im.id)} size='icon'>
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
        </div>
    )
}