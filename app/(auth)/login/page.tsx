'use client'

import Link from 'next/link'
import { toast } from "sonner"
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { authLogin } from '@/app/apiref/auth'

export default function Login() {
  const router = useRouter()
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const { data } = await authLogin(loginData)
    
    if(data.result === false) toast('Email or Password incorrect')
    else if(data.result.user?.role) {
      router.push('/'+data.result.user.role)
    }
  }

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            onChange={e => setLoginData({ ...loginData, email: e.target.value })}
            value={loginData.email}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <label htmlFor="password">Password</label>
          </div>
          <Input
            id="password"
            type="password"
            required
            onChange={e => setLoginData({ ...loginData, password: e.target.value })}
            value={loginData.password} />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline">
          Sign up
        </Link>
      </div>
    </div>
  )
}