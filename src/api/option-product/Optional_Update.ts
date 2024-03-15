import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
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
        headers: {
            Authorization: `Bearer ${AuthenticationHandler.getMemoryToken()}`,
        },
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<ProductOptional>) => {
                if ('data' in res) {
                    return ResponseToProductOptional(res.data)
                } else {
                    devLog('Error while updating optional', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}
