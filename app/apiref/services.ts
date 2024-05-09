import axios from 'axios'

export const getServices = (params: any) => axios.get('/api/services', { params })

export const createService = (data: any) => axios.post('/api/services', data)

export const updateService = (id: number, data: any) => axios.put('/api/services?id='+id, data)

export const deleteService = (id: number) => axios.delete('/api/services?id='+id)



export const createServiceImages = (data: any) => axios.post('/api/services/files', data)

export const deleteServiceImage = (id: number) => axios.delete('/api/services/files?id='+id)