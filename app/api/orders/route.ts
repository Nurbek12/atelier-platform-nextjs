import { prisma } from '@/app/db'
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    const result = await prisma.order.findMany({
        orderBy: { id: 'desc' },
        include: {
            files: true,
            client: true,
            tailor: true
        }
    })
    return NextResponse.json({ result })
}

export async function POST(req: NextRequest) {
    const data = await req.json()
    const result = await prisma.order.create({ data })
    return NextResponse.json({ result })
}

export async function PUT(req: NextRequest) {
    const url = new URL(req.url).searchParams
    const id = Number(url.get("id")) || 0
    const data = await req.json()
    await prisma.order.update({ where: { id }, data })
    return NextResponse.json({ result: true })
}

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url).searchParams
    const id = Number(url.get("id")) || 0
    await prisma.order.delete({ where: { id } })
    return NextResponse.json({ result: true })
}