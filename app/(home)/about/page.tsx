import Image from "next/image";

export default function About() {
    return (
        <>
            <section className="container py-20 bg-background min-h-screen">
                <div className="py-6 text-center">
                    <h1 className="text-xl md:text-2xl font-extrabold">О нашем ателье</h1>
                    <p className="mt-4 max-w-2xl text-base mx-auto">Узнайте больше о нашей команде, процессе создания заказов и нашей философии.</p>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1">
                        <p>Мы - команда профессионалов, которые любят свое дело и стараются создавать уникальные и качественные изделия для каждого клиента. Наше ателье специализируется на пошиве одежды по индивидуальным размерам, и мы гордимся тем, что можем удовлетворить самые сложные запросы наших клиентов.</p>
                        <h3 className="my-2 text-lg font-bold">Наша команда</h3>
                        <p>Наша команда состоит из опытных дизайнеров, портных и модельеров, которые имеют многолетний опыт работы в области моды и дизайна. Мы постоянно совершенствуем свои навыки и следим за последними тенденциями в мире моды, чтобы предлагать нашим клиентам только самое лучшее.</p>
                        <h3 className="my-2 text-lg font-bold">Наш процесс создания заказов</h3>
                        <p>Наш процесс создания заказов начинается с консультации с клиентом, во время которой мы обсуждаем его пожелания и предпочтения. Затем наши дизайнеры создают эскиз будущего изделия, который утверждается клиентом. После этого наши портные приступают к пошиву, используя только качественные материалы и технологии. На каждом этапе создания заказа мы консультируемся с клиентом, чтобы убедиться, что изделие полностью соответствует его ожиданиям.</p>
                        <h3 className="my-2 text-lg font-bold">Наши достижения</h3>
                        <p>За годы работы мы добились многих достижений, среди которых:</p>
                        <ul className="pl-6 list-disc">
                            <li>Создание уникальных изделий для многих известных персон и брендов</li>
                            <li>Участие в престижных модных показах и конкурсах</li>
                            <li>Получение множества положительных отзывов и благодарностей от наших клиентов</li>
                            <li>Создание собственного бренда одежды, который успешно продается в многих странах мира</li>
                        </ul>
                    </div>
                    
                    <div className="col-span-2 md:col-span-1 grid grid-cols-2 gap-4">
                        <div className="col-span-2 h-[400px]">
                            <Image src="/nophoto.jpg" className="w-full h-full object-cover rounded" height={400} width={600} alt="image" />
                        </div>
                        <img src="/nophoto.jpg" className="col-span-1 w-full h-full object-cover rounded" alt="image" />
                        <img src="/nophoto.jpg" className="col-span-1 w-full h-full object-cover rounded" alt="image" />
                    </div>

                </div>
            </section>
        </>
    )
}