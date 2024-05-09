export interface IUser {
    id: number

    first_name: string
    last_name: string
    phone: string
    email: string
    avatar: string
    experience: string

    role: "admin" | "tailor" | "client"

    created_at: string
    updated_at: string
}

export interface ITypeClothing {
    id: number

    name: string
    image: string
    
    created_at: string
    updated_at: string
}

export interface IMeansure {
    id: number

    chest: number
    waist: number
    hips: number
    sleeve: number
    pr_leng: number
    others: number

    created_at: string
    updated_at: string
}

export interface IOrder {
    id: number

    client_id?: number
    client?: IUser

    tailor_id?: number
    tailor?: IUser
    type_clothing: string

    preferred_fabric: string
    requirements: string
    contact_times_start: string
    contact_times_end: string

    first_name: string
    last_name: string
    email: string
    phone: string

    chest: number
    waist: number
    hips: number
    sleeve: number
    pr_leng: number
    others: number
    
    files: IOrderFile[]

    status: "new" | "process" | "finish"
    
    created_at: string
    updated_at: string
}

export interface IOrderFile {
    id: number

    name: string
    size: number
    file: string
    
    created_at: string
    updated_at: string
}

export interface IReview {
    id: number

    first_name: string
    last_name: string
    email: string
    phone?: string
    message: string
    rate: number
    
    created_at: string
    updated_at: string
}

export interface ITransaction {
    id: number

    
    
    created_at: string
    updated_at: string
}

export interface IService {
    id?: number

    title: string
    price: number
    style: string
    type: string
    description: string

    images?: IServiceImage
    
    created_at?: string
    updated_at?: string
}

export interface IServiceImage {
    id: number

    image: string
    thumbnail: string
    
    created_at: string
    updated_at: string
}