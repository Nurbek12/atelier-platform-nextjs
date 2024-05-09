import { prisma } from '@/app/db'
import { NextRequest, NextResponse } from "next/server"
import { imgkit } from '@/app/utils/img-upload'

export async function POST(req: NextRequest) {
    try {
        const url = new URL(req.url).searchParams
        const order_id = Number(url.get("order_id")) || 0
        const formdata = await req.formData()
        const images: any = []
        await Promise.all(formdata.getAll('file').map(async (f: any) => {
            const arb = await f.arrayBuffer()
            const b = Buffer.from(new Uint8Array(arb))
            const d = await imgkit.upload({
                file: b,
                folder: 'ateiler',
                fileName: f.name,
            })
            
            images.push({
                file: d.url,
                name: d.name,
                size: d.size,
                order_id,
            })
        }))
        const result = await prisma.orderFile.createMany({ data: images })
        return NextResponse.json({ result })
    } catch (error) {
        console.log(error)
        return NextResponse.json(false)
    }
}

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url).searchParams
    const id = Number(url.get("id")) || 0
    await prisma.orderFile.delete({ where: { id } })
    return NextResponse.json({ result: true })
}