import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { ProductOptional, ResponseToProductOptionalList } from '@/lib/types/ProductOptional'
import { queryOptions } from '@tanstack/react-query'
import axios from 'axios'

export type Optional_GetByProductId_Req = {
    productId: string
}

export type Optional_GetByProductId_Res = ProductOptional[]

export function Optional_GetByProductId({ productId }: Optional_GetByProductId_Req) {
    return axios.get<Optional_GetByProductId_Res>('option-products/get-all/' + encodeURIComponent(productId), {
        headers: {
            Authorization: `Bearer ${AuthenticationHandler.getMemoryToken()}`,
        },
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<ProductOptional[]>) => {
                if ('data' in res) {
                    return ResponseToProductOptionalList(res.data)
                } else {
                    devLog('Error while getting optionals', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}

export const queryOptional_GetByProductId = ({ productId }: Optional_GetByProductId_Req) =>
    queryOptions({
        queryKey: ['optional', productId],
        queryFn: () => Optional_GetByProductId({ productId }),
        select: data => data.data,
    })