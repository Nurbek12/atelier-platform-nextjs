'use client'

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, Trash2 } from 'lucide-react'
import { useEffect, useState } from "react"
import { getReviews, deleteReview } from '@/app/apiref/reviews'
import type { IReview } from '@/types'

export default function AdminMessages() {
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
            <div className="flex items-center w-full">
                <div className="flex justify-between items-center gap-2 w-full">
                    <div className="relative md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                            />
                    </div>
                </div>
            </div>
            <div className='w-full mt-4'>
                <Card x-chunk="dashboard-06-chunk-0" className='w-full'>
                    <CardHeader>
                        <CardTitle>Messages</CardTitle>
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
                                    <TableHead>Rate</TableHead>
                                    <TableHead>
                                        Email
                                    </TableHead>
                                    <TableHead>
                                        Phone
                                    </TableHead>
                                    <TableHead>
                                        Message
                                    </TableHead>
                                    <TableHead>
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
                                            <TableCell>
                                                {im.id}
                                            </TableCell>
                                            <TableCell className="font-medium">
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
        </div>
    )
}