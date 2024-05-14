import { prisma } from '@/app/db'
import { sendMail } from '@/app/utils/mail'
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    // sendMail('rustamovnurbek02@gmail.com', 'test', 'test')
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
    const order = await prisma.order.update({ where: { id }, data, include: { tailor: { select: { first_name: true, last_name: true, phone: true, id: true, email: true } } } })
    if(order.status === 'process' && order.tailor_id) {
        await prisma.user.update({ where: { id: order.tailor_id }, data: { occupied: true } })
        sendMail(order.email!, `Ваш заказ №${order.id} на сайте Ателье в процессе`, `Добрый день, ${order.first_name}!

Мы рады сообщить вам, что ваш заказ №${order.id} на сайте Couture Corner начал обрабатываться.

Наш администратор тщательно изучил ваше заявление и выбрал для вас профессионального швею. Вы можете связаться с ним/ей по следующим контактным данным:

Имя швеи: ${order.tailor?.first_name||'Не задано'} ${order.tailor?.last_name}
Телефон: ${order.tailor?.phone||'Не задано'}
Электронная почта: ${order.tailor?.email||'Не задано'}

Швея свяжется с вами в ближайшее время для уточнения деталей вашего заказа. Если у вас есть какие-либо вопросы или пожелания, пожалуйста, не стесняйтесь связаться с ним/ей напрямую.

С уважением,
Команда сайта Couture Corner.

Если у вас остались вопросы или возникли трудности, пожалуйста, свяжитесь с нами по электронной почте [Электронная почта сайта] или по телефону [Телефон сайта]. Спасибо, что выбрали нас!`)
    }
    if(order.status === 'finish') {
        if(order.tailor_id) await prisma.user.update({ where: { id: order.tailor_id }, data: { occupied: false } })
        sendMail(order.email!, `Ваш заказ №${order.id} на сайте Couture Corner завершен`, `Добрый день, ${order.first_name}!

Мы рады сообщить вам, что наша швея успешно завершила работу над вашим заказом №${order.id} на сайте Couture Corner.

В ближайшее время с вами свяжется наш менеджер для уточнения деталей доставки.

Мы надеемся, что вы останетесь довольны качеством нашей работы и будете рекомендовать нас своим друзьям и знакомым.

С уважением,
Команда сайта Couture Corner.

Если у вас остались вопросы или возникли трудности, пожалуйста, свяжитесь с нами по электронной почте [Электронная почта сайта] или по телефону [Телефон сайта]. Спасибо, что выбрали нас!`)
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