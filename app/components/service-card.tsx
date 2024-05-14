import type { IService } from '@/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { useLocale } from 'next-intl'

export function ServiceCard({ item }: { item: IService }) {
    const locale = useLocale()
    const [image, setImage] = useState(0)
    return (
        <div className='p-4 rounded-xl border'>
            <div className='flex flex-col h-full'>
                <div className='mb-4 relative'>
                    <div className='h-[280px] overflow-hidden rounded'>
                        <img
                            alt="Product image"
                            className="h-full aspect-square w-full rounded-md object-cover"
                            height="300"
                            src={item.images?.[image]?.image || '/nophoto.jpg'}
                            width="700"
                            />
                    </div>
                    <div className='w-full absolute bottom-4 flex justify-center gap-3 items-center'>
                        {
                            item.images?.map((_,i) => <Button key={i} onClick={() => setImage(i)} size='icon' className='w-4 h-4' variant={i === image?'default':'outline'}></Button>)
                        }
                    </div>
                </div>

                <div className='flex-1 flex flex-col gap-1'>
                    <h1 className='font-medium text-lg'>{item[`title_${locale as 'uz'}`]}</h1>
                    <span className='text-xs text-gray-700 dark:text-gray-300'>{item.type}</span>
                    <p className='mt-2 text-[14px] flex-1'>{item[`description_${locale as 'uz'}`]}</p>
                    <div className='flex items-center justify-between'>
                        <span className='text-yellow-600 dark:text-yellow-400 text-xl'>{Number(item.price||100000).toLocaleString('ru-RU')} сум</span>
                        <Badge>{item.style}</Badge>
                    </div>
                </div>
            </div>
        </div>
    )
}