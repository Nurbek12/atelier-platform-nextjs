import axios from 'axios'

export const getOrders = (params: any) => axios.get('/api/orders', { params })

export const createOrder = (data: any) => axios.post('/api/orders', data)

export const updateOrder = (id: number, data: any) => axios.put('/api/orders?id='+id, data)

export const deleteOrder = (id: number) => axios.delete('/api/orders?id='+id)



export const getOrderImages = (id: number) => axios.get('/api/orders/files?order_id='+id)

export const createOrderImages = (id: number, data: any) => axios.post('/api/orders/files?order_id='+id, data)

export const deleteOrderImage = (id: number) => axios.delete('/api/orders/files?id='+id)