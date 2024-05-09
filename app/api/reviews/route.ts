import { prisma } from '@/app/db'
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    const result = await prisma.review.findMany({
        orderBy: { id: 'desc' },
    })
    return NextResponse.json({ result })
}

export async function POST(req: NextRequest) {
    const data = await req.json()
    const result = await prisma.review.create({ data })
    return NextResponse.json({ result })
}

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url).searchParams
    const id = Number(url.get("id")) || 0
    await prisma.review.delete({ where: { id } })
    return NextResponse.json({ result: true })
}