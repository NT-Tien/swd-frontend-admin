import {
    ProductOptional,
    ResponseToProductOptional,
} from '@/lib/types/ProductOptional'
import axios from 'axios'

export type Optional_Create_Req = {
    product_id: string
    name: string
    material: string
    price: number
    quantity: number
}

export type Optional_Create_Res = ProductOptional

export function Optional_Create(payload: Optional_Create_Req) {
    return axios.post<ProductOptional>('create', payload, {
        transformResponse: [
            (data: any) => {
                const dataParsed = JSON.parse(data)

                return dataParsed ? ResponseToProductOptional(dataParsed) : null
            },
        ],
    })
}
