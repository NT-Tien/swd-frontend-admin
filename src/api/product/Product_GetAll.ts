import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Product, ResponseToProductList } from '@/lib/types/Product'
import { queryOptions } from '@tanstack/react-query'
import axios from 'axios'

export type Product_GetAll_Req = {
    page: number
    size: number
    query?: string
    categoryId?: string
    sortBy?: string
    direction?: string
    deleted?: boolean
}

export type Product_GetAll_Res = GetResponse<Product>

export async function Product_GetAll({ page, size, query, categoryId, sortBy, direction, deleted }: Product_GetAll_Req) {
    return await axios.get<Product_GetAll_Res>(
        `product/get-all${deleted ? '-deleted' : ''}/${encodeURIComponent(size)}/${encodeURIComponent(page)}`,
        {
            params: {
                query,
                categoryId,
                sortBy,
                direction,
            },
            headers: {
                Authorization: `Bearer ${AuthenticationHandler.getMemoryToken()}`,
            },
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
        },
    )
}

export const queryKeyProduct_GetAll = ({ page, size, deleted }: Partial<Product_GetAll_Req>) => [
    `products${deleted ? '-deleted' : ''}`,
    page,
    size,
]

export const queryProduct_GetAll = ({ page, size, deleted }: Product_GetAll_Req) =>
    queryOptions({
        queryKey: queryKeyProduct_GetAll({ page, size, deleted }),
        queryFn: () => Product_GetAll({ page, size, deleted }),
        select: data => data.data,
    })