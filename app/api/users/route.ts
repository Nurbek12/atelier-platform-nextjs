import { prisma } from '@/app/db'
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const where: any = {}
    const url = new URL(req.url).searchParams
    if(url.get("role")) where.role = url.get("role")
    const result = await prisma.user.findMany({
        where,
        orderBy: { id: 'desc' }
    })
    return NextResponse.json({ result })
}

export async function POST(req: NextRequest) {
    const data = await req.json()
    const fuser = await prisma.user.findFirst({ where: { email: data.email } })
    if(fuser) return NextResponse.json({ result: false })
    if(!data?.role) data.role = 'client'
    const result = await prisma.user.create({ data })
    return NextResponse.json({ result })
}

export async function PUT(req: NextRequest) {
    const url = new URL(req.url).searchParams
    const id = Number(url.get("id")) || 0
    const data = await req.json()
    const result = await prisma.user.update({ where: { id }, data })
    return NextResponse.json({ result })
}

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url).searchParams
    const id = Number(url.get("id")) || 0
    await prisma.user.delete({ where: { id } })
    return NextResponse.json({ result: true })
}