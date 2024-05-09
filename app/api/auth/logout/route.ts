import { NextResponse } from 'next/server'

export async function GET() {
    const reqest = NextResponse.json({ result: true })

    reqest.cookies.set('token', '', { httpOnly: true, expires: new Date(0) })

    return reqest
}