import jwt from 'jsonwebtoken'
import { prisma } from '@/app/db'
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const body = await req.json()
    const user = await prisma.user.findFirst({ where: { email: body.email } })

    if(!user) return NextResponse.json({ result: false })
    
    if(user.password !== body.password) return NextResponse.json({ result: false })

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '4h' })

    const response = NextResponse.json({ result: { token, user } })

    response.cookies.set('token', token, { httpOnly: true, maxAge: 4 * 60 * 60 * 1000 })

    return response
}