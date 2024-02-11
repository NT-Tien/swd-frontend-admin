import { ParseResponse } from '@/api/defaults'
import { ProductOptional, ResponseToProductOptional } from '@/lib/types/ProductOptional'
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
    return axios.post<Optional_Create_Res>('option-products/create', payload, {
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<ProductOptional>) => {
                if ('data' in res) {
                    return ResponseToProductOptional(res.data)
                } else {
                    devLog('Error while creating optional', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}
