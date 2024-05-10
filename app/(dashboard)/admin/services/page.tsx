'use client'

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
// import { getUsers } from '@/app/db/queries/services'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, PlusCircle, Pencil, Trash2, Upload } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FormEvent, useState, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import type { IService } from '@/types'
import { createService, deleteService, getServices, updateService } from '@/app/apiref/services'

export default function AdminUsers() {
    const [item, setItem] = useState<IService>({
        price: 0,
        type: "",
        style: "",
        title: "",
        description: "",
    })
    const [items, setItems] = useState<IService[]>([])
    const [dialog, setDialog] = useState(false)
    const [getLoading, setGetLoading] = useState(false)
    const [postLoading, setPostLoading] = useState(false)
    const [files, setFiles] = useState<any[]>([])

    const pushFiles = (fls: FileList) => {
        if(files.length >= 4) return
        setFiles([...files, ...Array.from(fls)])
    }

    useEffect(() => {
        getItems()
    }, [])

    const getItems = async () => {
        try {
            setGetLoading(true)
            const { data } = await getServices({})
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
                const { data } = await updateService(id, item)
                setItems(items.map(i => i.id === id ? data.result : i))
            } else {
                const { data } = await createService(item)
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
        setFiles([])
        setDialog(false)
        setItem({
            price: 0,
            type: "",
            style: "",
            title: "",
            description: ""
        })
    }

    const editItem = (i: any) => {
        setItem(i)
        setDialog(true)
    }

    const handleDelete = async (id: number) => {
        if(!confirm('Do you delete this item?')) return
        await deleteService(id)
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
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Service
                        </span>
                    </Button>
                </div>
            </div>
            <div className='w-full mt-4'>
                <Card x-chunk="dashboard-06-chunk-0" className='w-full'>
                    <CardHeader>
                        <CardTitle>Services</CardTitle>
                        <CardDescription>
                        Manage your products and view their sales performance.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Style</TableHead>
                                    <TableHead>Type</TableHead>
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
                                                {im.title}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {im.price}
                                            </TableCell>
                                            <TableCell>
                                                <Badge>{im.type}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge>{im.style}</Badge>
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
                    <CardFooter>
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
                                        <PaginationItem className="cursor-pointer">
                                            <PaginationPrevious />
                                        </PaginationItem>
                                        <PaginationItem className="cursor-pointer">
                                            <PaginationLink>1</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem className="cursor-pointer">
                                            <PaginationNext />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>
                    </CardFooter>
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
                                <label htmlFor="title">Title</label>
                                <Input required onChange={e => setItem({...item, title: e.target.value})} value={item.title} id="title" placeholder="Example title" />
                            </div>
                            <div>
                                <label htmlFor="price">Price</label>
                                <Input required onChange={e => setItem({...item, price: +e.target.value})} value={item.price} placeholder="Price" id="price" type="number" min={0} />
                            </div>
                            <div>
                                <label>Style</label>
                                <Select required onValueChange={e => setItem({...item, style: e})} value={item.style}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Style" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Style 1">Style 1</SelectItem>
                                        <SelectItem value="Style 2">Style 2</SelectItem>
                                        <SelectItem value="Style 3">Style 3</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label>Type</label>
                                <Select required onValueChange={e => setItem({...item, type: e})} value={item.type}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Type 1">Type 1</SelectItem>
                                        <SelectItem value="Type 2">Type 2</SelectItem>
                                        <SelectItem value="Type 3">Type 3</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <Textarea required onChange={e => setItem({...item, description: e.target.value})} value={item.description} className="resize-none" placeholder="Description" rows={6} />
                            </div>
                            <div className="grid grid-cols-4 place-items-center gap-2">
                                <input max={4-files.length} hidden id="service-create-files" type="file" multiple accept="image/*" onChange={e => pushFiles(e.target.files!)} />
                                {
                                    files.map((f,i) => 
                                        <Image key={i} onDoubleClick={() => setFiles(files.filter((_,j) => j !== i))} src={URL.createObjectURL(f)} className='object-cover w-full h-full rounded'
                                            height={300} width={300} alt='image' />)
                                }
                                <button onClick={() => document.getElementById('service-create-files')?.click()} className="hover:bg-gray-200/30 flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                                    <Upload className="h-4 w-4 text-muted-foreground" />
                                    <span className="sr-only">Upload</span>
                                </button>
                            </div>
                            <div className="mt-2">
                                <Button type="submit" className="w-full" disabled={postLoading}>{postLoading?'Loading':'Create'}</Button>
                            </div>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}