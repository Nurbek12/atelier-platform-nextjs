import axios from 'axios'

export const authLogin = (data: any) => axios.post('/api/auth/login', data)

export const authLogout = () => axios.get('/api/auth/logout')

export const authMe = () => axios.get('/api/auth/me')