'use client'

import { createUser } from '@/app/apiref/users'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'

export default function Register() {
    const router = useRouter()
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        phone: "",
    })

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const { data } = await createUser(loginData)
        
        if(data.result === false) toast('This email already used!')
        else {
            toast('Successfully registered!')
            router.push('/login')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="mx-auto grid w-[350px] gap-4">
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Sign Up</h1>
                    <p className="text-muted-foreground">
                        Enter your information to create an account
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <label htmlFor="first-name">First name</label>
                        <Input onChange={e => setLoginData({...loginData, first_name: e.target.value})} value={loginData.first_name} id="first-name" placeholder="Max" required />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="last-name">Last name</label>
                        <Input onChange={e => setLoginData({...loginData, last_name: e.target.value})} value={loginData.last_name} id="last-name" placeholder="Robinson" required />
                    </div>
                </div>
                <div className="grid gap-2">
                    <label htmlFor="email">Email</label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        onChange={e => setLoginData({...loginData, email: e.target.value})} value={loginData.email}
                    />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="password">Password</label>
                    <Input id="password" type="password" required
                        onChange={e => setLoginData({...loginData, password: e.target.value})} value={loginData.password}/>
                </div>
                <Button type="submit" className="w-full">
                    Create an account
                </Button>
            </form>
            <div className="mt-6 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline">
                    Sign in
                </Link>
            </div>
        </div>
    )
}