import Link from "next/link"
import Image from "next/image"
import { useTranslations } from 'next-intl'
import { Button } from "@/components/ui/button"
import { Star, ShieldCheck, Rocket, BadgePercent } from 'lucide-react'

const index_cards = [
  { name: "home-card-1", icon: Star },
  { name: "home-card-2", icon: ShieldCheck },
  { name: "home-card-3", icon: Rocket },
  { name: "home-card-4", icon: BadgePercent },
]

export default function Home() {
  const t = useTranslations('home')

  return (
    <>
      <section className="flex items-center justify-center bg-background min-h-screen">
        <div className="relative container flex flex-col md:flex-row justify-between gap-8 items-center w-full py-24 sm:py-12">
          <div className="md:max-w-lg">
            <div>
              <span className="px-3 py-1 rounded border">
                <span className="text-sm font-medium text-primary">{t('toptitle')}</span>
              </span>

              <h1 className="mt-4 text-2xl font-extrabold tracking-tight lg:text-4xl">{t('title')}</h1>
              <p className="max-w-4xl mx-auto mt-6 text-base lg:text-lg text-secondary-foreground">
                {t('description')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/order">
                <Button size="lg" className="w-full">{t('order-btn')}</Button>
              </Link>
              <Link href='/register'>
                <Button size="lg" className="w-full" variant="outline">{t('sign-btn')}</Button>
              </Link>
            </div>
          </div>
          <div>
            <Image src='/photos/back-view-female-tailor-with-patterns-hands.jpg' height={800} width={800} className="w-full h-[450px] object-cover rounded" alt="Home Image" />
          </div>
        </div>
      </section>
      <section className="container bg-background min-h-[80vh]">
        <div className="py-8 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          <div className="py-6 col-span-1 md:col-span-2 lg:col-span-4 text-center">
            <h1 className="text-2xl md:text-3xl font-extrabold">{t('section-1-title')}</h1>
            <p className="mt-6 max-w-2xl text-base mx-auto">{t('section-1-description')}</p>
          </div>

          {
            index_cards.map((item,index) => 
              <div className="py-12 rounded-lg h-[250px] text-center p-6 hover:bg-muted flex flex-col items-center justify-center gap-8" key={index}>
                <item.icon className="h-16 w-16" />
                <h1>{t(item.name)}</h1>
              </div>)
          }

        </div>
      </section>
      <section className="container bg-background min-h-[60vh]">
        <div className="py-8 w-full grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="py-6 col-span-1 md:col-span-2 text-center">
            <h1 className="text-2xl md:text-3xl font-extrabold">{t('section-2-title')}</h1>
          </div>

          <div>
            {t('section-2-text').split('\n').map((p,i) => <p key={i}>{p} <br /></p>)}
            
            <div className="mt-4">
              <Link href='/contact'>
                <Button>{t('contact-btn')}</Button>
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
