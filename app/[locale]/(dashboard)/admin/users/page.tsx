'use client'

import { IUser } from '@/types'
import { useTranslations } from 'next-intl'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormEvent, useEffect, useState } from "react"
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createUser, deleteUser, getUsers, updateUser } from '@/app/apiref/users'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminUsers() {
    const [item, setItem] = useState<IUser>({
        email: "",
        phone: "",
        first_name: "",
        role: "client",
    } as any)
    const t = useTranslations('admin-users')
    const [dialog, setDialog] = useState(false)
    const [items, setItems] = useState<IUser[]>([])
    const [getLoading, setGetLoading] = useState(false)
    const [postLoading, setPostLoading] = useState(false)


    useEffect(() => {
        getItems()
    }, [])

    const getItems = async () => {
        try {
            setGetLoading(true)
            const { data } = await getUsers({})
            setItems(data.result)
        } catch (error) {
            console.log(error)
        } finally {
            setGetLoading(false)
        }
    }

    const handleCreate = async (e: FormEvent) => {
        e.preventDefault()
        
        try {
            setPostLoading(true)
            if(item.id) {
                const id = item.id
                delete item.id
                const { data } = await updateUser(id, item)
                setItems(items.map(i => i.id === id ? data.result : i))
            } else {
                const { data } = await createUser(item)
                setItems([...items, data.result])
            }
            
            closeDialog()
        } catch (error) {
            console.log(error)
        } finally {
            setPostLoading(false)
        }
    }

    const closeDialog = () => {
        setDialog(false)
        setItem({
            email: "",
            phone: "",
            first_name: "",
            last_name: "",
            password: "",
            role: "client",
        } as any)
    }

    const editItem = (i: any) => {
        setItem(i)
        setDialog(true)
    }

    const handleDelete = async (id: number) => {
        if(!confirm('Do you delete this item?')) return
        await deleteUser(id)
        setItems(items.filter(im => im.id !== id))
    }

    return (
        <div>
            <div className="flex items-center w-full">
                <div className="flex justify-between items-center gap-2 w-full">
                    <Button onClick={() => setDialog(true)} className="gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">{t('add-user')}</span>
                    </Button>
                </div>
            </div>
            <div className='w-full mt-4'>
                <Card x-chunk="dashboard-06-chunk-0" className='w-full'>
                    <CardHeader>
                        <CardTitle>{t('users-title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>{t('form-fname')} {t('form-lname')}</TableHead>
                                    <TableHead>{t('form-role')}</TableHead>
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
                                            <TableCell>{im.id}</TableCell>
                                            <TableCell>{im.first_name} {im.last_name}</TableCell>
                                            <TableCell>
                                                <Badge>{im.role}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                {im.email}
                                            </TableCell>
                                            <TableCell>
                                                {im.phone || '-'}
                                            </TableCell>
                                            <TableCell>
                                                { new Date(im.created_at!).toLocaleDateString() }
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2 items-center">
                                                    <Button onClick={() => editItem(im)} size='icon'>
                                                        <Pencil className="w-5 h-5" />
                                                    </Button>
                                                    <Button onClick={() => handleDelete(im.id!)} size='icon'>
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
            <Dialog open={dialog} onOpenChange={(o) => {
                if(!o) closeDialog()
                setDialog(o)
                }}>
                <DialogContent style={{ maxHeight: '95vh', overflow: 'auto' }}>
                    <DialogHeader>
                        <DialogTitle>{t('form-title')}</DialogTitle>

                        <form onSubmit={handleCreate} className="pt-4 space-y-2">
                            <div>
                                <label htmlFor="first_name">{t('form-fname')}</label>
                                <Input required value={item.first_name} onChange={e => setItem({...item, first_name: e.target.value})} id="first_name" placeholder={t('form-fname')} />
                            </div>
                            <div>
                                <label htmlFor="last_name">{t('form-lname')}</label>
                                <Input required value={item.last_name} onChange={e => setItem({...item, last_name: e.target.value})} id="last_name" placeholder={t('form-lname')} />
                            </div>
                            <div>
                                <label htmlFor="email">{t('form-email')}</label>
                                <Input required value={item.email} onChange={e => setItem({...item, email: e.target.value})} id="email" placeholder="example@mail.com" />
                            </div>
                            <div>
                                <label htmlFor="phone">{t('form-phone')}</label>
                                <Input value={item.phone} onChange={e => setItem({...item, phone: e.target.value})} id="phone" placeholder="+998 __ ___ __ __" />
                            </div>
                            <div>
                                <label htmlFor="password">{t('form-password')}</label>
                                <Input required value={item.password} onChange={e => setItem({...item, password: e.target.value})} id="password" placeholder={t('form-password')} />
                            </div>
                            <div>
                                <label>{t('form-role')}</label>
                                <Select required value={item.role} onValueChange={e => setItem({...item, role: e as any})}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="tailor">Tailor</SelectItem>
                                        <SelectItem value="client">Client</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="mt-2">
                                <Button type="submit" className="w-full" disabled={postLoading}>{t('create-btn')}</Button>
                            </div>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}