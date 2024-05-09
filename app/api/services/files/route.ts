import { prisma } from '@/app/db'
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: Request) {
    const data = await req.json()
    const result = await prisma.serviceImage.createMany({ data })
    return NextResponse.json({ result })
}

export async function DELETE(req: Request) {
    const url = new URL(req.url).searchParams
    const id = Number(url.get("id")) || 0
    await prisma.serviceImage.delete({ where: { id } })
    return NextResponse.json({ result: true })
}