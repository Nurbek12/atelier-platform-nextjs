import { prisma } from '@/app/db'
import { imgkit } from '@/app/utils/img-upload'
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const url = new URL(req.url).searchParams
    const service_id = Number(url.get("service_id")) || 0

    const result = await prisma.serviceImage.findMany({ where: { service_id } })
    return NextResponse.json({ result })
}

export async function POST(req: NextRequest) {
    const url = new URL(req.url).searchParams
        const service_id = Number(url.get("service_id")) || 0
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
                image: d.url,
                thumbnail: d.thumbnailUrl,
                service_id
            })
        }))
    const result = await prisma.serviceImage.createMany({ data: images })
    return NextResponse.json({ result })
}

export async function DELETE(req: Request) {
    const url = new URL(req.url).searchParams
    const id = Number(url.get("id")) || 0
    await prisma.serviceImage.delete({ where: { id } })
    return NextResponse.json({ result: true })
}