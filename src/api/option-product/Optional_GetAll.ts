import { ParseResponse } from '@/api/defaults'
import { ProductOptional, ResponseToProductOptionalList } from '@/lib/types/ProductOptional'
import axios from 'axios'

export type Optional_GetAll_Res = GetResponse<ProductOptional>

export function Optional_GetAll() {
    return axios.get<Optional_GetAll_Res>('option-products/get-all', {
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<string[]>) => {
                if ('data' in res) {
                    return {
                        data: ResponseToProductOptionalList(res.data[0] as unknown as Record<string, any>[]),
                        total: res.data[1],
                    }
                } else {
                    console.error('Error while getting optionals', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}
