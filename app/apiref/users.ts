import axios from "axios"

export const getUsers = (params: any) => axios.get('/api/users', { params })

export const createUser = (data: any) => axios.post('/api/users', data)

export const updateUser = (id: number, data: any) => axios.put('/api/users?id='+id, data)

export const deleteUser = (id: number) => axios.delete('/api/users?id='+id)