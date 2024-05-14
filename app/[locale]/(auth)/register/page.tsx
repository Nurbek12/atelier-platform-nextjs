'use client'

import Link from 'next/link'
import { toast } from 'sonner'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createUser } from '@/app/apiref/users'
import { useLocale, useTranslations } from 'next-intl'

export default function Register() {
    const router = useRouter()
    const locale = useLocale()
    const t = useTranslations('register')
    const [loading, setLoading] = useState(false)
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        phone: "",
    })

    const handleSubmit = async (e: FormEvent) => {
        try {
            setLoading(true)
            e.preventDefault()
            const { data } = await createUser(loginData)
            
            if(data.result === false) toast('This email already used!')
            else {
                toast('Successfully registered!')
                router.push('/'+locale+'/login')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="mx-auto grid w-[350px] gap-4">
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">{t('title')}</h1>
                    <p className="text-muted-foreground">
                        {t('description')}
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <label htmlFor="first-name">{t('form-fname')}</label>
                        <Input onChange={e => setLoginData({...loginData, first_name: e.target.value})} value={loginData.first_name} id="first-name" placeholder={t('form-fname')} required />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="last-name">{t('form-lname')}</label>
                        <Input onChange={e => setLoginData({...loginData, last_name: e.target.value})} value={loginData.last_name} id="last-name" placeholder={t('form-lname')} required />
                    </div>
                </div>
                <div className="grid gap-2">
                    <label htmlFor="email">{t('form-email')}</label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="example@gmail.com"
                        required
                        onChange={e => setLoginData({...loginData, email: e.target.value})} value={loginData.email}
                    />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="password">{t('form-password')}</label>
                    <Input id="password" type="password" required placeholder='******'
                        onChange={e => setLoginData({...loginData, password: e.target.value})} value={loginData.password}/>
                </div>
                <Button disabled={loading} type="submit" className="w-full">
                    {t('register-btn')}
                </Button>
            </form>
            <div className="mt-6 text-center text-sm">
                {t('form-footer')}{" "}
                <Link href="/login" className="underline">
                    {t('form-sign-up')}
                </Link>
            </div>
        </div>
    )
}