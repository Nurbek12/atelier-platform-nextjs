import * as jose from 'jose'
import { prisma } from '@/app/db'
import { type NextRequest, NextResponse } from 'next/server'

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.JWT_SECRET),
}

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('token')

        if(!token?.value) {
            NextResponse.json({}).cookies.delete('token')
            request.cookies.delete('token')
            return NextResponse.redirect(new URL('/login', request.url))
        }
        const decoded = await jose.jwtVerify(token.value, jwtConfig.secret)

        if (decoded.payload.id) {
            const result = await prisma.user.findFirst({ 
                where: { id: decoded.payload.id }, 
                select: {
                    chest: true,
                    email: true,
                    first_name: true,
                    hips: true,
                    id: true,
                    last_name: true,
                    others: true,
                    phone: true,
                    pr_leng: true,
                    role: true,
                    sleeve: true,
                    waist: true,
                    created_at: true,
                }
            })

            if(!result) return NextResponse.json({ result: null })

            const whereQuery = {
                "client": {
                    OR: [
                        { client_id: result.id },
                        { email: result.email }
                    ]
                },
                "tailor": {
                    tailor_id: result.id
                }
            }

            const orders = await prisma.order.findMany({
                where: whereQuery[result.role as | 'client'],
                include: {
                    files: true,
                    client: true,
                    tailor: true,
                },
                orderBy: {
                    id: 'desc'
                }
            })
            return NextResponse.json({ result, orders })
        } else {
            return NextResponse.json({ result: null })
        }
    } catch (err) {
      console.log('isAuthenticated error: ', err)
      return NextResponse.json({ result: null })
    }
}