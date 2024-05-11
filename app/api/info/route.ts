import { prisma } from '@/app/db'
import { NextResponse } from 'next/server'

export async function GET() {
    const clients = await prisma.user.count({ where: { role: 'client' } })
    const tailors = await prisma.user.count({ where: { role: 'tailor' } })
    const services = await prisma.service.count()
    const orders = await prisma.order.count()
    const monthly = await prisma.$queryRaw`
        SELECT date_trunc('day', created_at) as day, COUNT(*) as order_count
        FROM "Order"
        WHERE created_at >= date_trunc('month', CURRENT_TIMESTAMP)
        GROUP BY day
        ORDER BY day;
    `.then((result: any) => {
        return result.map((row: any) => {
            return {
                day: row.day,
                order_count: row.order_count.toString(),
            };
        });
    });

    return NextResponse.json({ clients, tailors, services, orders, monthly })
}