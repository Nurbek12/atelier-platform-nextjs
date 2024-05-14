import Image from "next/image"
import { useTranslations } from "next-intl"

export default function About() {
    const t = useTranslations('about')

    return (
        <>
            <section className="container py-20 bg-background min-h-screen">
                <div className="py-6 text-center">
                    <h1 className="text-xl md:text-2xl font-extrabold">{t('title')}</h1>
                    <p className="mt-4 max-w-2xl text-base mx-auto">{t('description')}</p>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1" dangerouslySetInnerHTML={{__html:t.raw('html')}}></div>
                    
                    <div className="col-span-2 md:col-span-1 grid grid-cols-2 gap-4">
                        <div className="col-span-2 h-[400px]">
                            <Image src="/photos/fashion-designer-woman-working-studio-sitting-desk.jpg" className="w-full h-full object-cover rounded" height={400} width={600} alt="image" />
                        </div>
                        <Image height={400} width={600} src="/photos/pexels-ron-lach-9850824.jpg" className="col-span-1 w-full h-[300px] object-cover rounded" alt="image" />
                        <Image height={400} width={600} src="/photos/trendy-color.jpg" className="col-span-1 w-full h-[300px] object-cover rounded" alt="image" />
                    </div>

                </div>
            </section>
        </>
    )
}