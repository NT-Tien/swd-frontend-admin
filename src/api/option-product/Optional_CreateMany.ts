import { ParseResponse } from '@/api/defaults'
import { ProductOptional, ResponseToProductOptionalList } from '@/lib/types/ProductOptional'
import axios from 'axios'

export type Optional_CreateMany_Req = {
    list: {
        product_id: string
        name: string
        price: number
        material: string
        quantity: number
    }[]
}

export type Optional_CreateMany_Res = ProductOptional[]

export function Optional_CreateMany({ list }: Optional_CreateMany_Req) {
    return axios.post('option-products/create-many', [...list], {
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<ProductOptional[]>) => {
                if ('data' in res) {
                    return ResponseToProductOptionalList(res.data)
                } else {
                    devLog('Error while creating optionals', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}
