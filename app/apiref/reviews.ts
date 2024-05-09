import axios from 'axios'

export const getReviews = (params: any) => axios.get('/api/reviews', { params })

export const createReview = (data: any) => axios.post('/api/reviews', data)

export const deleteReview = (id: number) => axios.delete('/api/reviews?id='+id)