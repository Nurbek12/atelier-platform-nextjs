import { useTranslations } from 'next-intl'

export default function FitGuide() {
    const t = useTranslations('guide')

    return (
        <>
            <section className="container py-20 bg-background min-h-screen">
                <div className="py-6 text-center">
                    <h1 className="text-xl md:text-2xl font-extrabold">{t('title')}</h1>
                    <p className="mt-4 max-w-2xl text-base mx-auto">{t('description')}</p>
                </div>
                <div className="mt-6 flex flex-col gap-4" dangerouslySetInnerHTML={{__html:t.raw('html')}}></div>
            </section>
        </>
    )
}