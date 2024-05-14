import { useTranslations, useLocale } from 'next-intl'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
    {
        question: {
            ru: 'Как я могу сделать заказ?',
            uz: 'Buyurtma qanday qilish mumkin?',
            en: 'How can I place an order?',
        },
        answer: {
            ru: 'Вы можете сделать заказ, связавшись с нами через форму обратной связи на нашем сайте, по телефону или электронной почте. Также вы можете посетить наше ателье для личной консультации.',
            uz: 'Siz bilan bog‘lanish uchun quyidagi ko‘rsatilgan telefon raqamlarimizdan yoki elektron pochtamizdan foydalanishingiz mumkin. Bizing uchun eng qulay va qulay bo‘lgan paytda murojaat qilishingiz mumkin.',
            en: 'You can place an order by contacting us through the feedback form on our website, by phone or email. You can also visit our studio for a personal consultation.',
        },
    },
    {
        question: {
            ru: 'Какие виды оплаты вы принимаете?',
            uz: 'Qanday to‘lov turlari qabul qilinadi?',
            en: 'What forms of payment do you accept?',
        },
        answer: {
            ru: 'Мы принимаем к оплате наличные, банковские переводы и оплату банковскими картами.',
            uz: 'Namuda to‘lovlar qabul qilinadi: naqd, bank kartasi yoki bank o‘tkazmalari orqali.',
            en: 'We accept cash, bank transfers, and credit card payments.',
        },
    },
    {
        question: {
            ru: 'Какие сроки выполнения заказа?',
            uz: 'Buyurtma ifodalanish muddatlari nechida?',
            en: 'What are the order fulfillment deadlines?',
        },
        answer: {
            ru: 'Сроки выполнения заказа зависят от сложности работы и объема заказов. Общие сроки выполнения заказа обсуждаются индивидуально с каждым клиентом.',
            uz: 'Buyurtma ifodalanish muddatlari ishning qatnashchiligi va buyurtmalar soni bilan bog‘liq. Umumiy buyurtma ifodalanish muddatlari har bir mijoz bilan ajratilgan.',
            en: 'The delivery time depends on the complexity and volume of the order. The approximate delivery time is discussed individually with each client.',
        },
    },
    {
        question: {
            ru: 'Могу ли я внести изменения в свой заказ после его размещения?',
            uz: 'Buyurtma berilgan keyin uni o‘zgartirish mumkinmi?',
            en: 'Can I make changes to my order after it has been placed?',
        },
        answer: {
            ru: 'Если вы хотите внести изменения в ваш заказ, пожалуйста, свяжитесь с нами как можно скорее. Мы будем стараться удовлетворить ваши пожелания, но не гарантируем, что это будет возможно, если работа уже начата.',
            uz: 'Agar siz buyurtmani o‘zgartirishni xohaysiz, iltimos, biz bilan ajratib borishingizni so‘raymiz. Biz sizning so‘ralganlarini bajarishga harakat qilamiz, lekin agar ish boshlandi, unda o‘zgarishlar munkim bo‘lmaydi.',
            en: 'If you would like to make changes to your order, please contact us as soon as possible. We will do our best to accommodate your request, but we cannot guarantee that it will be possible if work has already begun.',
        },
    },
    {
        question: {
            ru: "Как я могу отследить статус своего заказа?",
            en: "How can I track the status of my order?",
            uz: "Buyurtma holatini qanday ko'rib olish mumkin?"
        },
        answer: {
            ru: "Вы можете отследить статус своего заказа, связавшись с нами по телефону или электронной почте.",
            en: "You can track the status of your order by contacting us via phone or email.",
            uz: "Siz buyurtma holatini telefon yoki elektron pochtamiz orqali biz bilan bog'lanib ko'rib olishingiz mumkin."
        }
    },
    {
        question: {
            ru: "Что делать, если я недоволен качеством выполненной работы?",
            en: "What should I do if I am not satisfied with the quality of the work done?",
            uz: "Ishlamagan ishning sifatidan qayg'urmagan bo'lsa, nima qilishim kerak?"
        },
        answer: {
            ru: "Если вы недовольны качеством выполненной работы, пожалуйста, свяжитесь с нами как можно скорее. Мы будем рады исправить любые недочеты и удовлетворить ваши пожелания.",
            en: "If you are not satisfied with the quality of the work done, please contact us as soon as possible. We will be happy to correct any deficiencies and meet your requirements.",
            uz: "Agar siz ishlamagan ishning sifatidan qayg'urmagansiz, iltimos, biz bilan ajratib borishing. Biz har do'stlikdan o'tgan xatolarni to'g'irib, sizning so'ralganlariningizni bajarishga harakat qilamiz."
        }
    },
    {
        question: {
            ru: "Как я могу связаться с вами?",
            en: "How can I contact you?",
            uz: "Menga qanday aloqaga chiqish mumkin?"
        },
        answer: {
            ru: "Вы можете связаться с нами через форму обратной связи на нашем сайте, по телефону или электронной почте. Также вы можете посетить наше ателье для личной консультации.",
            en: "You can contact us through the contact form on our website, by phone, or email. You can also visit our studio for a personal consultation.",
            uz: "Biz bilan veb-saytimizdagi aloqa formasidan, telefon orqali yoki elektron pochta orqali bog'lanishingiz mumkin. Shuningdek, shaxsiy maslahat uchun bizning studio-mizga ham tashrif buyuring."
        }
    },
    {
        question: {
            ru: "Где находится ваше ателье?",
            en: "Where is your studio located?",
            uz: "Sizning atelyeingiz qayerda joylashgan?"
        },
        answer: {
            ru: "Адрес нашего ателье указан в разделе \"Контакты\" на нашем сайте.",
            en: "The address of our studio is indicated in the 'Contacts' section on our website.",
            uz: "Bizning atelye manzili veb-saytimizdagi 'Aloqa' bo'limida ko'rsatilgan."
        }
    },
    {
        question: {
            ru: "Что происходит, когда я заказываю вашу услугу?",
            en: "What happens when I order your service?",
            uz: "Sizning xizmatni buyurtma berganda nima bo'ladi?"
        },
        answer: {
            ru: "Вы открываете дверь в мир красоты и стиля, где ваше видение становится реальностью.",
            en: "You open the door to a world of beauty and style, where your vision becomes reality.",
            uz: "Siz go'zal va uslubning dunyosiga qapi ochasiz, bu erda sizning ko'ngil o'zingiz haqiqiyatga aylanadi."
        }
    },
    {
        question: {
            ru: "Как вы создаете наши наряды?",
            en: "How do you create our outfits?",
            uz: "Siz qanday kiyimlar yaratishingiz?"
        },
        answer: {
            ru: "С любовью, вниманием к деталям и с применением наших профессиональных навыков.",
            en: "With love, attention to detail, and using our professional skills.",
            uz: "Sevgi, tafsilotlariga e'tibor va bizning professional ko'nikmalarimizdan foydalanib."
        }
    },
    {
        question: {
            ru: "Почему вы лучше других ателье?",
            en: "Why are you better than other studios?",
            uz: "Siz boshqa atelyelardan qanday yaxshi?"
        },
        answer: {
            ru: "Потому что мы не просто создаем одежду, мы создаем произведения искусства.",
            en: "Because we don't just create clothing, we create works of art.",
            uz: "Biz faqat kiyimlar yaratmaymiz, biz san'at asarlarini yaratamiz."
        }
    },
    {
        question: {
            ru: "Как вы подбираете ткани для наших нарядов?",
            en: "How do you select fabrics for our outfits?",
            uz: "Siz kiyimlarimiz uchun qanday paxlaklarni tanlaysiz?"
        },
        answer: {
            ru: "Мы тщательно выбираем ткани, основываясь на ваших пожеланиях, и сочетаем их с нашим опытом и знаниями.",
            en: "We carefully select fabrics based on your preferences and combine them with our experience and knowledge.",
            uz: "Biz sizning istaklariga asosan paxlaklarni xavfsiz tanlaymiz va ularni bizning tajribamiz va bilimlari bilan birlashtiramiz."
        }
    },
    {
        question: {
            ru: "Как вы упаковываете наши наряды?",
            en: "How do you package our outfits?",
            uz: "Siz kiyimlarimizni qanday qilib qadoqlaysiz?"
        },
        answer: {
            ru: "Мы упаковываем наши наряды с такой же заботой, как и при их создании, чтобы они дошли до вас в идеальном состоянии.",
            en: "We package our outfits with the same care as when creating them, so they reach you in perfect condition.",
            uz: "Biz kiyimlarimizni yaratish paytida qarorga qarshi muammolarni hal qilishimizdek qadoqlaymiz, shuningdek, ular sizga ideal holatda yetib kelishini ta'minlaymiz."
        }
    },
    {
        question: {
            ru: "Что делает ваше ателье уникальным?",
            en: "What makes your studio unique?",
            uz: "Sizning atelye qanday maxsus qiladi?"
        },
        answer: {
            ru: "Наше ателье уникально тем, что мы сочетаем традиционные техники пошива с современными тенденциями и идеями.",
            en: "Our studio is unique because we blend traditional sewing techniques with modern trends and ideas.",
            uz: "Bizning atelye maxsus shundayki, biz odatiy terish usullarini so'nggi tendentsiyalar va ideyalar bilan birlashtiramiz."
        }
    }
]

export default function Faqs() {
    const locale = useLocale()
    const t = useTranslations('faqs')

    return (
        <>
            <section className="container py-20 bg-background min-h-screen">
                <div className="py-6 text-center">
                    <h1 className="text-xl md:text-2xl font-extrabold">{t('title')}</h1>
                    <p className="mt-4 max-w-2xl text-base mx-auto">{t('description')}</p>
                </div>
                <div className="flex flex-col gap-4">
                    {
                        faqs.map((item, index) =>
                            <Accordion type="single" collapsible key={index}>
                                <AccordionItem value={'item' + index}>
                                    <AccordionTrigger className="text-left">{item.question[locale as 'uz']}</AccordionTrigger>
                                    <AccordionContent>
                                        {item.answer[locale as 'uz']}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>)
                    }
                </div>
            </section>
        </>
    )
}