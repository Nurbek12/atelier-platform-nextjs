import { prisma } from '@/app/db'
import { sendMail } from '@/app/utils/mail'
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
    try {
        const data = await req.json()
        const result = await prisma.order.create({ data })
        return NextResponse.json({ result })
    } catch (error) {
        console.log(error);
        return NextResponse.json(false)
    }
}

export async function PUT(req: NextRequest) {
    const url = new URL(req.url).searchParams
    const id = Number(url.get("id")) || 0
    const data = await req.json()
    const order = await prisma.order.update({ where: { id }, data })
    if(order.status === 'process' && order.tailor_id) {
        await prisma.user.update({ where: { id: order.tailor_id }, data: { occupied: true } })
    }
    if(order.status === 'finish') {
        if(order.tailor_id) await prisma.user.update({ where: { id: order.tailor_id }, data: { occupied: false } })
        sendMail(order.email!, order.id, `${order.first_name} ${order.last_name}`)
    }
    return NextResponse.json({ result: true })
}

export async function DELETE(req: NextRequest) {
    const url = new URL(req.url).searchParams
    const id = Number(url.get("id")) || 0
    await prisma.orderFile.deleteMany({ where: { order_id: id } })
    await prisma.order.delete({ where: { id } })
    return NextResponse.json({ result: true })
}