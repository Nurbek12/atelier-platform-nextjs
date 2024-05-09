'use client'

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Search, PlusCircle, Pencil, Trash2 } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export default function AdminUsers() {
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
                    
                    <Button className="gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add User
                        </span>
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
                                    ([] as any[]).map((item,i) => 
                                        <TableRow key={i}>
                                            <TableCell className="hidden sm:table-cell">
                                                {item.id}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {item.first_name} {item.last_name}
                                            </TableCell>
                                            <TableCell>
                                                <Badge>{item.role}</Badge>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {item.email}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {item.phone}
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                { new Date(item.created_at).toLocaleDateString() }
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2 items-center">
                                                    <Button size='icon'>
                                                        <Pencil className="w-5 h-5" />
                                                    </Button>
                                                    <Button size='icon'>
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
                                        <PaginationItem>
                                            <PaginationPrevious />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink>1</PaginationLink>
                                        </PaginationItem>
                                        {/* <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink>10</PaginationLink>
                                        </PaginationItem> */}
                                        <PaginationItem>
                                            <PaginationNext />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
        // <div>
        //     {
        //         (await getUsers()).map((_,i) => <li>{i}</li>)
        //     }
        // </div>
    )
}