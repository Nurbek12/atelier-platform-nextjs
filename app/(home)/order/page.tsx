import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

const type_items = [
  "костюм",
  "платье",
  "юбка",
  "блуза",
  "брюки",
  "пальто",
  "жилет",
  "комбинезон",
  "шорты",
  "топ",
  "свитер",
  "джинсы",
  "халат",
  "купальник",
  "нижнее белье",
  "пиджак",
  "плащ",
  "спортивная одежда",
  "трикотаж",
  "футляр",
  "шуба",
  "жакет",
  "джинсовая куртка",
  "кожаная куртка",
  "майка",
  "рубашка",
  "сумочка",
  "туфли",
  "ботинки",
  "сапоги",
  "сандалии",
  "тапочки",
  "шляпа",
  "перчатки",
  "шарф",
  "ремень",
  "носки",
  "колготки",
  "галстук",
  "бабочка",
  "бандана",
  "брелоки",
  "браслеты",
  "булавки",
  "броши",
  "серьги",
  "кольца",
  "очки",
  "часы"
]

export default function Contact() {
    return (
        <>
            <section className="container py-20 bg-background min-h-screen">
                <div className="py-6 text-center">
                    <h1 className="text-xl md:text-2xl font-extrabold">Создайте наряд вашей мечты с нашим ателье</h1>
                    <p className="mt-4 max-w-2xl text-base mx-auto">Здесь вы можете заказать нашу услугу по пошиву одежды на заказ.</p>
                </div>
                {/* grid col-span-1 md:grid-cols-2 gap-4 */}
                <div className="mt-6 flex justify-center">
                    <div className='max-w-[600px]'>
                        <Card>
                            <CardHeader>
                                <CardTitle>Форма заказа</CardTitle>
                                {/* <CardDescription></CardDescription> */}
                            </CardHeader>
                            <CardContent>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="first_name">Имя</label>
                                        <Input id='first_name' placeholder='First Name' />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="last_name">Фамилия</label>
                                        <Input id='last_name' placeholder='Last Name' />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="last_name">Контактный телефон</label>
                                        <Input id='last_name' placeholder='+998 00 000 00 00' />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="last_name">Адрес электронной почты</label>
                                        <Input id='last_name' placeholder='example@domain.com' />
                                    </div>

                                    <div className='col-span-2 border-b'></div>
                                    <div className='col-span-2'>
                                        <h1 className='text-xl font-medium'>Детали заказа:</h1>
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label>Тип одежды</label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Тип одежды" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    type_items.map((item,index) => <SelectItem value={item} key={index}>{item}</SelectItem>)
                                                }
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className='col-span-2 border-b'></div>
                                    <div className='col-span-2'>
                                        <h1 className='text-xl font-medium'>Размеры:</h1>
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="last_name">Грудь</label>
                                        <Input id='last_name' placeholder='0' type='number' />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="last_name">Талия</label>
                                        <Input id='last_name' placeholder='0' type='number' />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="last_name">Бедра</label>
                                        <Input id='last_name' placeholder='0' type='number' />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="last_name">Длина рукава</label>
                                        <Input id='last_name' placeholder='0' type='number' />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="last_name">Длина изделия</label>
                                        <Input id='last_name' placeholder='0' type='number' />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="other_params">Другие параметры</label>
                                        <Input id='other_params' placeholder='0' type='number' />
                                    </div>

                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="tkn">Предпочтительная ткань</label>
                                        <Input id='tkn' placeholder='Example' />
                                    </div>
                                    <div className='col-span-2 md:col-span-1'>
                                        <label htmlFor="time">Удобное время для связи</label>
                                        <div className='flex gap-4'>
                                            <Input id='time' placeholder='00:00' type='time' />
                                            <Input placeholder='00:00' type='time' />
                                        </div>
                                    </div>

                                    <div className='col-span-2'>
                                        <label htmlFor="desc">Дополнительные требования и пожелания</label>
                                        <Textarea id="desc" rows={6} className='resize-none'  />
                                    </div>
                                    
                                    <div className='col-span-2 border-b'></div>
                                    <div className='col-span-2'>
                                        <h1 className='font-medium'>Прикрепить фото или эскиз:</h1>
                                    </div>
                                    <div className='col-span-2'>
                                        <div className="grid grid-cols-4 place-items-center gap-2">
                                            <Image src='/nophoto.jpg' className='object-cover rounded' height={300} width={300} alt='image' />
                                            <button className="hover:bg-gray-200/30 flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                                                <Upload className="h-4 w-4 text-muted-foreground" />
                                                <span className="sr-only">Upload</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='col-span-2'>
                                        <Button className='w-full'>Отправить</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* <div className='bg-muted'>
                    <h3>Благодарим вас за выбор нашего ателье!</h3>
                    <p>Мы гордимся тем, что наши клиенты доверяют нам созданием их нарядов, и стараемся оправдать их ожидания. Мы надеемся, что вы будете довольны нашим сервисом и качеством нашей работы. Спасибо за выбор нашего ателье, и мы надеемся, что вы вернетесь к нам снова!</p>
                </div> */}
            </section>
        </>
    )
}


// : Тип одежды: [выберите из списка: костюм, платье, юбка, блуза, другое]
// Размеры:
// Грудь: [поле для ввода]
// Талия: [поле для ввода]
// Бедра: [поле для ввода]
// Длина рукава: [поле для ввода]
// Длина изделия: [поле для ввода]
// Другие параметры: [поле для ввода]
// Предпочтительная ткань: [поле для ввода]
// Дополнительные требования и пожелания: [поле для ввода]
// Прикрепить фото или эскиз: [поле для загрузки файлов]
// Предпочтительный способ связи: [выберите из списка: телефон, электронная почта]
// Удобное время для связи: [поле для ввода]