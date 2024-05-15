'use client'

import Link from 'next/link'
import { toast } from "sonner"
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { authLogin } from '@/app/apiref/auth'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useTranslations, useLocale } from 'next-intl'

export default function Login() {
  const router = useRouter()
  const locale = useLocale()
  const t = useTranslations('login')
  const [loading, setLoading] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async (e: FormEvent) => {
    try {
      setLoading(true)
      e.preventDefault()
      const { data } = await authLogin(loginData)
      
      if(data.result === false) toast({
        en:'Email or Password incorrect!',
        ru:'Неверный электронная почта или пароль',
        uz: 'Elektron pochta yoki parol noto\'g\'ri',
    }[locale as 'en'])
      else if(data.result.user?.role) {
        router.push('/'+locale+'/'+data.result.user.role)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground">
          {t('description')}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="email">{t('form-email')}</label>
          <Input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            required
            onChange={e => setLoginData({ ...loginData, email: e.target.value })}
            value={loginData.email}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <label htmlFor="password">{t('form-password')}</label>
          </div>
          <Input
            id="password"
            type="password"
            required
            placeholder='*******'
            onChange={e => setLoginData({ ...loginData, password: e.target.value })}
            value={loginData.password} />
        </div>
        <Button disabled={loading} type="submit" className="w-full">
          {t('login-btn')}
        </Button>
      </form>
      <div className="text-center text-sm">
        {t('form-footer')}{" "}
        <Link href={"/"+locale+"/register"} className="underline">
          {t('form-sign-up')}
        </Link>
      </div>
    </div>
  )
}