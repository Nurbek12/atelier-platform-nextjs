import { prisma } from '..'
import type { User } from '@prisma/client'

export async function getUsers(): Promise<User[]> {
    return await prisma.user.findMany()
}

export async function createUser(data: any): Promise<User> {
    return await prisma.user.create(data)
}

export async function updateUser(id: number, data: any): Promise<User> {
    return await prisma.user.update({ where: { id }, data })
}

export async function removeUser(): Promise<Boolean> {
    await prisma.user.delete({ where: { id: 1 } })
    return true
}