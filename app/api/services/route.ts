import { prisma } from '@/app/db'
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const url = new URL(req.url).searchParams
    const whereClause: any = {}
    if (url.get("title")) whereClause.title = { contains: url.get("title") };
    if (url.get("min_price")) whereClause.price = { gte: +url.get("min_price")! };
    if (url.get("max_price")) whereClause.price = { lte: +url.get("max_price")! };
    if (url.get("type")) whereClause.type = { contains: url.get("type") };
    if (url.get("style")) whereClause.style = { contains: url.get("style") };
    const result = await prisma.service.findMany({
        where: whereClause,
        orderBy: { created_at: 'desc' },
        include: {
            images: true
        }
    })
    return NextResponse.json({ result })
}

export async function POST(req: NextRequest) {
    const data = await req.json()
    const result = await prisma.service.create({ data })
    return NextResponse.json({ result })
}

export async function PUT(req: NextRequest) {
    const url = new URL(req.url).searchParams
    const id = Number(url.get("id")) || 0
    const data = await req.json()
    const result = await prisma.service.update({ where: { id }, data })
    return NextResponse.json({ result })
}

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url).searchParams
    const id = Number(url.get("id")) || 0
    await prisma.serviceImage.deleteMany({ where: { service_id: id } })
    await prisma.service.delete({ where: { id } })
    return NextResponse.json({ result: true })
}