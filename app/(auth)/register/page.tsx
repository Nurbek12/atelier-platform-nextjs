import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function Register() {
    return (
        <div>
            <div className="mx-auto grid w-[350px] gap-4">
                <div className="grid gap-2 text-center">
                    <h1 className="text-3xl font-bold">Sign Up</h1>
                    <p className="text-muted-foreground">
                        Enter your information to create an account
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <label htmlFor="first-name">First name</label>
                        <Input id="first-name" placeholder="Max" required />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="last-name">Last name</label>
                        <Input id="last-name" placeholder="Robinson" required />
                    </div>
                </div>
                <div className="grid gap-2">
                    <label htmlFor="email">Email</label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <label htmlFor="password">Password</label>
                    <Input id="password" type="password" />
                </div>
                <Button type="submit" className="w-full">
                    Create an account
                </Button>
                <Button variant="outline" className="w-full">
                    Sign up with Google
                </Button>
            </div>
            <div className="mt-6 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline">
                    Sign in
                </Link>
            </div>
        </div>
    )
}