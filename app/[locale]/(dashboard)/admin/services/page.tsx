'use client'

import Image from "next/image"
import type { IService } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import { useTranslations, useLocale } from 'next-intl'
import { FormEvent, useState, useEffect } from "react"
import { serviceStyles, serviceTypes } from '@/constants'
import { PlusCircle, Pencil, Trash2, Upload } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createService, deleteService, getServices, updateService, createServiceImages, getServiceImages, deleteServiceImage } from '@/app/apiref/services'

export default function AdminUsers() {
    const locale = useLocale()
    const t1 = useTranslations('admin-orders')
    const t = useTranslations('admin-services')
    const [item, setItem] = useState<IService>({
        price: 0,
        type: "",
        style: "",
        title_en: "",
        title_uz: "",
        title_ru: "",
        description_ru: "",
        description_uz: "",
        description_en: ""
    })
    const [items, setItems] = useState<IService[]>([])
    const [dialog, setDialog] = useState(false)
    const [getLoading, setGetLoading] = useState(false)
    const [postLoading, setPostLoading] = useState(false)
    const [files, setFiles] = useState<any[]>([])

    const pushFiles = (fls: FileList) => {
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

        files.map(f => form_data.append('file', f))
        
        try {
            setPostLoading(true)
            if(item.id) {
                const { id, images, ...other } = item
                const { data } = await updateService(id, other)
                setItems(items.map(i => i.id === id ? data.result : i))

                if(files.length > 0) {
                    await createServiceImages(id!, form_data)
                    const imgs = await getServiceImages(id!)

                    setItems(items.map(i => {
                        if(i.id === id) return {...i, images: imgs.data.result }
                        else return i
                    }))
                }
            } else {
                const { data } = await createService(item)
                let images = []
                
                if(files.length > 0) {
                    await createServiceImages(data.result.id!, form_data)
                    const imgs = await getServiceImages(data.result.id!)
                    images = imgs.data.result
                }
                setItems([...items, {...data.result, images}])
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
            title_en: "",
            title_ru: "",
            title_uz: "",
            description_en: "",
            description_ru: "",
            description_uz: "",
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

    const handleDeleteImage = async (id: number, index: number) => {
        if(!confirm('Do you delete this image of item?')) return
        await deleteServiceImage(id)
        setItems(items.map(im => {
            if(im.id === id) {
                const updatedImages = [...im.images!];
                updatedImages.splice(index, 1);
                setItem({...im, images: updatedImages})
                return {...im, images: updatedImages}
            }
            return im
        }))
    }

    return (
        <div>
            <div className="flex items-center w-full">
                <div className="flex justify-between items-center gap-2 w-full">
                    <Button onClick={() => setDialog(true)} className="gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            {t('add-service')}
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
                                    <TableHead>{t('form-name')}</TableHead>
                                    <TableHead>{t('form-price')}</TableHead>
                                    <TableHead>{t('form-type')}</TableHead>
                                    <TableHead>{t('form-style')}</TableHead>
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
                                                {im[`title_${locale as 'uz'}`]}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {im.price}
                                            </TableCell>
                                            <TableCell>
                                                <Badge>{
                                                   serviceTypes.find(s => s.slug === im.type)?.title?.[locale as 'uz'] 
                                                }</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge>{
                                                   serviceStyles.find(s => s.slug === im.style)?.title?.[locale as 'uz'] 
                                                }</Badge>
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
                                <label htmlFor="title1">{t('form-name')} Uz</label>
                                <Input required onChange={e => setItem({...item, title_uz: e.target.value})} value={item.title_uz} id="title1" placeholder={t('form-name')+' Uz'} />
                            </div>
                            <div>
                                <label htmlFor="title2">{t('form-name')} Ru</label>
                                <Input required onChange={e => setItem({...item, title_ru: e.target.value})} value={item.title_ru} id="title2" placeholder={t('form-name')+' RU'} />
                            </div>
                            <div>
                                <label htmlFor="title3">{t('form-name')} En</label>
                                <Input required onChange={e => setItem({...item, title_en: e.target.value})} value={item.title_en} id="title3" placeholder={t('form-name')+' EN'} />
                            </div>
                            <div>
                                <label htmlFor="price">{t('form-price')}</label>
                                <Input required onChange={e => setItem({...item, price: +e.target.value})} value={item.price} placeholder={t('form-price')} id="price" type="number" min={0} />
                            </div>
                            <div>
                                <label>{t('form-style')}</label>
                                <Select required onValueChange={e => setItem({...item, style: e})} value={item.style}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('form-style')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            serviceStyles.map((s,i) => <SelectItem value={s.slug} key={i}>{s.title[locale as 'uz']}</SelectItem>)
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label>{t('form-type')}</label>
                                <Select required onValueChange={e => setItem({...item, type: e})} value={item.type}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('form-type')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            serviceTypes.map((s,i) => <SelectItem value={s.slug} key={i}>{s.title[locale as 'uz']}</SelectItem>)
                                        }
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label htmlFor="description1">{t('form-description')} Uz</label>
                                <Textarea required onChange={e => setItem({...item, description_uz: e.target.value})} value={item.description_uz} className="resize-none" id="description1" placeholder={t('form-description')+' Uz'} rows={6} />
                            </div>
                            <div>
                                <label htmlFor="description2">{t('form-description')} Ru</label>
                                <Textarea required onChange={e => setItem({...item, description_ru: e.target.value})} value={item.description_ru} className="resize-none" id="description2" placeholder={t('form-description')+' Ru'} rows={6} />
                            </div>
                            <div>
                                <label htmlFor="description3">{t('form-description')} En</label>
                                <Textarea required onChange={e => setItem({...item, description_en: e.target.value})} value={item.description_en} className="resize-none" id="description3" placeholder={t('form-description')+' En'} rows={6} />
                            </div>
                            {item.images?.length! > 0 && <div>
                                <label>{t1('images')}</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {
                                        item.images!.map((img, i) => <div key={i}>
                                            <img
                                                src={img.image}
                                                onDoubleClick={() => handleDeleteImage(img.id!, i)}
                                                className="w-full h-full object-cover rounded cursor-pointer border" />
                                        </div>)
                                    }
                                </div>
                            </div>}
                            <div className="grid grid-cols-4 place-items-center gap-2">
                                <input hidden id="service-create-files" type="file" multiple accept="image/*" onChange={e => pushFiles(e.target.files!)} />
                                {
                                    files.map((f,i) => 
                                        <Image key={i} onDoubleClick={() => setFiles(files.filter((_,j) => j !== i))} src={URL.createObjectURL(f)} className='object-cover w-full h-full rounded cursor-pointer'
                                            height={300} width={300} alt='image' />)
                                }
                                <button type="button" onClick={() => document.getElementById('service-create-files')?.click()} className="hover:bg-gray-200/30 flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                                    <Upload className="h-4 w-4 text-muted-foreground" />
                                    {/* <span className="sr-only">Upload</span> */}
                                </button>
                            </div>
                            <div className="mt-2">
                                <Button type="submit" className="w-full" disabled={postLoading}>{t('create')}</Button>
                            </div>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}