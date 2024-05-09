import type { IService } from '@/types'
import Image from 'next/image'
// import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button'

export function ServiceCard({ item }: { item: any }) {
    return (
        // <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
            <div className='p-4 rounded-xl border'>
                <div className='flex flex-col h-full'>
                    <div className='mb-4 relative'>
                        <Image
                            alt="Product image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="300"
                            src="/auth-bg.jpg"
                            width="700"
                            />
                        <div className='w-full absolute bottom-4 flex justify-center gap-3 items-center'>
                            <Button size='icon' className='w-4 h-4' variant='default'></Button>
                            <Button size='icon' className='w-4 h-4' variant='outline'></Button>
                            <Button size='icon' className='w-4 h-4' variant='outline'></Button>
                            <Button size='icon' className='w-4 h-4' variant='outline'></Button>
                        </div>
                    </div>

                    <div className='flex-1 mb-4'>
                        <h1 className='text-center font-medium text-lg'>{item.title}</h1>
                        <p className='mt-2 text-center text-[15px]'>{item.description}</p>
                    </div>

                    {/* <Button type="submit" className="w-full">
                        Заказать
                    </Button> */}
                </div>
            </div>
        // </Card>
    )
}