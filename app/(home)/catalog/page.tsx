import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ServiceCard } from '../../components/service-card'
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

const items = [
    { title: 'Пошив одежды по индивидуальным меркам', description: 'Мы создаем уникальные костюмы, платья, юбки и блузы, адаптированные к вашим индивидуальным меркам. Наша команда портных обеспечит вас индивидуальным подходом, качественными материалами и превосходным исполнением.' },
    { title: 'Модернизация и ремонт одежды', description: 'У нас вы можете обновить свою любимую одежду, добавив новые элементы декора, изменить фасон или размер, а также выполнить качественный ремонт изделий.' },
    { title: 'Консультации по стилю и моде', description: 'Наши опытные стилисты и дизайнеры помогут вам подобрать идеальный образ для любого случая, учитывая ваш индивидуальный стиль и предпочтения.' },
    { title: 'Подгонка и изменение размеров', description: 'Мы предлагаем услуги по подгонке и изменению размеров готовой одежды, чтобы она идеально сидела на вас и подчеркивала ваши достоинства.' },
    { title: 'Изготовление аксессуаров', description: 'Кроме одежды, мы также создаем стильные и оригинальные аксессуары: сумки, пояса, шляпы и многое другое, чтобы ваш образ был полностью завершенным и неповторимым.' },
]

export default function Contact() {
    return (
        <>
            <section className="container py-20 bg-background min-h-screen">
                <div className="py-6 text-center">
                    <h1 className="text-xl md:text-2xl font-extrabold">Добро пожаловать в наш каталог услуг!</h1>
                    <p className="mt-4 max-w-2xl text-base mx-auto">Ниже вы найдете полный список предоставляемых нами услуг с подробным описанием каждой из них</p>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:max-w-[400px]">
                        <Card className="mx-auto max-w-sm">
                            <CardHeader>
                                <CardTitle className="text-xl">Filter Services</CardTitle>
                                <CardDescription>Find services for your english</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <label htmlFor="email">Name</label>
                                        <Input
                                            id="email"
                                            type="text"
                                            placeholder="Example"
                                            />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <label htmlFor="first-name">Min price</label>
                                            <Input type="number" id="first-name" placeholder="0" min={0} />
                                        </div>
                                        <div className="grid gap-2">
                                            <label htmlFor="last-name">Max price</label>
                                            <Input type="number" id="last-name" placeholder="1 000 000" min={0} />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <label>Type</label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="light">Light</SelectItem>
                                                <SelectItem value="dark">Dark</SelectItem>
                                                <SelectItem value="system">System</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-2">
                                        <label>Style</label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Style" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="light">Light</SelectItem>
                                                <SelectItem value="dark">Dark</SelectItem>
                                                <SelectItem value="system">System</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Find Services
                                    </Button>
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm font-light">Не нашли нужную услугу? <Link href='/contact' className="underline">Свяжитесь с нами</Link>, и мы постараемся воплотить вашу модную мечту в жизнь!</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {
                            items.map((item,index) => <ServiceCard item={item} key={index} />)
                        }
                        <div className="mt-4 col-span-1 md:col-span-2">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink>1</PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationNext />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}