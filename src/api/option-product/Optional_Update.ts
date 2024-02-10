import { ParseResponse } from '@/api/defaults'
import { ProductOptional, ResponseToProductOptional } from '@/lib/types/ProductOptional'
import axios from 'axios'

export type Optional_Update_Req = {
    id: string
    payload: {
        name: string
        material: string
        price: number
        quantity: number
    }
}

export function Optional_Update(payload: Optional_Update_Req) {
    return axios.put('option-products/update/' + encodeURIComponent(payload.id), payload.payload, {
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<ProductOptional>) => {
                if ('data' in res) {
                    return ResponseToProductOptional(res.data)
                } else {
                    console.error('Error while updating optional', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}
