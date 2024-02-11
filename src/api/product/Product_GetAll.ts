import { ParseResponse } from '@/api/defaults'
import { Product, ResponseToProductList } from '@/lib/types/Product'
import { queryOptions } from '@tanstack/react-query'
import axios from 'axios'

export type Product_GetAll_Req = {
    page: number
    size: number
}

export type Product_GetAll_Res = GetResponse<Product>

export async function Product_GetAll({ page, size }: Product_GetAll_Req) {
    return await axios.get<Product_GetAll_Res>('product/get-all/' + encodeURIComponent(size) + '/' + encodeURIComponent(page), {
        responseType: 'json',
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<string[]>) => {
                if ('data' in res) {
                    // success
                    return {
                        data: ResponseToProductList(res.data[0] as unknown as Record<string, any>[]),
                        total: res.data[1],
                    }
                } else {
                    // error
                    devLog('Error while getting products', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}

export const queryProduct_GetAll = ({ page, size }: Product_GetAll_Req) =>
    queryOptions({
        queryKey: ['products', page, size],
        queryFn: () => Product_GetAll({ page, size }),
        select: data => data.data,
    })