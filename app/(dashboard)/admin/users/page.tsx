'use client'

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { createUser, deleteUser, getUsers, updateUser } from '@/app/apiref/users'
import { Search, PlusCircle, Pencil, Trash2 } from 'lucide-react'
import { FormEvent, useEffect, useState } from "react"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { IUser } from '@/types'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function AdminUsers() {
    const [item, setItem] = useState<IUser>({
        email: "",
        phone: "",
        first_name: "",
        role: "client",
    })
    const [items, setItems] = useState<IUser[]>([])
    const [dialog, setDialog] = useState(false)
    const [getLoading, setGetLoading] = useState(false)
    const [postLoading, setPostLoading] = useState(false)
    const [files, setFiles] = useState<any[]>([])

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
        const form_data = new FormData()

        files.map(f => form_data.append('files', f))
        
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
        })
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
                    {/* <div className="relative md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                            />
                    </div> */}
                    
                    <Button onClick={() => setDialog(true)} className="gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add User</span>
                    </Button>
                </div>
            </div>
            <div className='w-full mt-4'>
                <Card x-chunk="dashboard-06-chunk-0" className='w-full'>
                    <CardHeader>
                        <CardTitle>Users</CardTitle>
                        <CardDescription>
                        Manage your products and view their sales performance.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="hidden w-[100px] sm:table-cell">
                                        <span>ID</span>
                                    </TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Email
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Phone
                                    </TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Created
                                    </TableHead>
                                    <TableHead>
                                        <span>Actions</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>

                                {
                                    items.map((im,i) => 
                                        <TableRow key={i}>
                                            <TableCell className="hidden sm:table-cell">
                                                {im.id}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {im.first_name} {im.last_name}
                                            </TableCell>
                                            <TableCell>
                                                <Badge>{im.role}</Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {im.email}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {im.phone || '-'}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
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
                    {/* <CardFooter>
                        <div className='flex items-center justify-between w-full'>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="20" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                    <SelectItem value="100">100</SelectItem>
                                </SelectContent>
                            </Select>
                            <div>
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink>1</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationNext />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>
                    </CardFooter> */}
                </Card>
            </div>
            <Dialog open={dialog} onOpenChange={(o) => setDialog(o)}>
                <DialogContent style={{ maxHeight: '95vh', overflow: 'auto' }}>
                    <DialogHeader>
                        <DialogTitle>Create new Service</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone.
                        </DialogDescription>

                        <form onSubmit={handleCreate} className="pt-4 space-y-2">
                            <div>
                                <label htmlFor="first_name">First name</label>
                                <Input required value={item.first_name} onChange={e => setItem({...item, first_name: e.target.value})} id="first_name" placeholder="Name" />
                            </div>
                            <div>
                                <label htmlFor="lirst_name">Last name</label>
                                <Input required value={item.last_name} onChange={e => setItem({...item, last_name: e.target.value})} id="last_name" placeholder="Surname" />
                            </div>
                            <div>
                                <label htmlFor="email">Email Address</label>
                                <Input required value={item.email} onChange={e => setItem({...item, email: e.target.value})} id="email" placeholder="example@mail.com" />
                            </div>
                            <div>
                                <label htmlFor="phone">Phone (optional)</label>
                                <Input value={item.phone} onChange={e => setItem({...item, phone: e.target.value})} id="phone" placeholder="+998 __ ___ __ __" />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <Input required value={item.password} onChange={e => setItem({...item, password: e.target.value})} id="password" placeholder="Password" />
                            </div>
                            <div>
                                <label>Role of User</label>
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
                                <Button type="submit" className="w-full" disabled={postLoading}>{postLoading?'Loading':'Create'}</Button>
                            </div>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
        // <div>
        //     {
        //         (await getUsers()).map((_,i) => <li>{i}</li>)
        //     }
        // </div>
    )
}