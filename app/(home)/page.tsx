import Link from "next/link"
import Image from "next/image" 
import { Button } from "@/components/ui/button"
import { Star, ShieldCheck, Rocket, BadgePercent } from 'lucide-react'

const index_cards = [
  { name: "Индивидуальный подход к каждому клиенту", icon: Star },
  { name: "Высокое качество материалов и исполнения", icon: ShieldCheck },
  { name: "Быстрое и качественное выполнение заказов", icon: Rocket },
  { name: "Удобные цены и гибкая система скидок", icon: BadgePercent },
]

export default function Home() {
  return (
    <>
      <section className="flex items-center justify-center bg-background h-screen">
        <div className="relative items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <div>
              <span className="w-auto px-3 py-1 rounded border">
                <span className="text-sm font-medium text-primary">Sort Your notes easily</span>
              </span>

              <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-4xl">Добро пожаловать в Couture Corner!</h1>
              <p className="max-w-4xl mx-auto mt-8 text-base lg:text-lg text-secondary-foreground">
                Мы - команда опытных портных и дизайнеров, готовых воплотить ваши самые смелые модные идеи в реальность. Наше ателье специализируется на создании индивидуальной и качественной одежды по вашим меркам и пожеланиям.
              </p>
            </div>

            <div className="flex justify-center gap-4 max-w-sm mx-auto mt-10">
              <Link href="/order">
                <Button size="lg" className="w-full">Order a Clothing</Button>
              </Link>
              <Link href='/register'>
                <Button size="lg" className="w-full" variant="outline">Sign up for free</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="container bg-background min-h-[80vh]">
        <div className="py-8 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          <div className="py-6 col-span-1 md:col-span-2 lg:col-span-4 text-center">
            <h1 className="text-2xl md:text-3xl font-extrabold">Почему выбирают нас</h1>
            <p className="mt-6 max-w-2xl text-base mx-auto">Присоединяйтесь к нам сегодня и давайте создадим нечто по-настоящему уникальное и стильное вместе!</p>
          </div>

          {
            index_cards.map((item,index) => 
              <div className="py-12 rounded-lg h-[250px] text-center p-6 hover:bg-muted flex flex-col items-center justify-center gap-8" key={index}>
                <item.icon className="h-16 w-16" />
                <h1>{item.name}</h1>
              </div>)
          }

        </div>
      </section>
      <section className="container bg-background min-h-[60vh]">
        <div className="py-8 w-full grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="py-6 col-span-1 md:col-span-2 text-center">
            <h1 className="text-2xl md:text-3xl font-extrabold">Коротко о нас</h1>
          </div>

          <div>
            <p>Мы предлагаем широкий спектр услуг: от пошива костюмов и платьев до ремонта и модернизации вашей любимой одежды. Доверьтесь нашему профессионализму и стилю, и мы сделаем все возможное, чтобы вы выглядели на все 100% в любой ситуации!</p>
            <br />
            <p>Наша команда состоит из высококвалифицированных специалистов, которые имеют многолетний опыт работы в области пошива и дизайна одежды. Мы используем только качественные материалы и современное оборудование, чтобы гарантировать, что наши изделия не только красивы, но и удобны в ношении.</p>
            <br />
            <p>Наша компания ценит свою репутацию и стремится к долгосрочному сотрудничеству с каждым клиентом. Мы готовы предоставить вам гибкую систему скидок и специальные предложения при повторных заказах.</p>
            <br />
            <p>Свяжитесь с нами сегодня, и мы поможем вам создать образ мечты!</p>
            <div className="mt-4">
              <Link href='/contact'>
                <Button>Contact us</Button>
              </Link>
            </div>
          </div>

          <div className="overflow-hidden h-full">
            <Image height={800} width={800} alt="image" src="/auth-bg-1.jpg" className="object-cover rounded"></Image>
          </div>

        </div>
      </section>
    </>
  )
}
