import { ParseResponse } from '@/api/defaults'
import { Product, ResponseToProduct } from '@/lib/types/Product'
import { queryOptions } from '@tanstack/react-query'
import axios from 'axios'

export type Product_GetOne_Req = {
    id: string
}

export type Product_GetOne_Res = Product

export async function Product_GetOne({ id }: Product_GetOne_Req) {
    return axios.get<Product_GetOne_Res>('product/get-one/' + encodeURIComponent(id), {
        responseType: 'json',
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<Product>) => {
                if ('data' in res) {
                    return ResponseToProduct(res.data)
                } else {
                    devLog('Error while getting product', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}

export const queryKeyProduct_GetOne = ({ id }: Product_GetOne_Req) => ['product', id]
export const queryProduct_GetOne = ({ id }: Product_GetOne_Req) =>
    queryOptions({
        queryKey: queryKeyProduct_GetOne({ id }),
        queryFn: () => Product_GetOne({ id }),
        select: res => res.data,
    })