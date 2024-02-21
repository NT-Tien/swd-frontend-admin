import { ParseResponse } from '@/api/defaults'
import { Product, ResponseToProductList } from '@/lib/types/Product'
import { queryOptions } from '@tanstack/react-query'
import axios from 'axios'

export type Product_GetAll_Deleted_Req = {
    page: number
    size: number
}

export type Product_GetAll_Deleted_Res = GetResponse<Product>

export async function Product_GetAll_Deleted({ page, size }: Product_GetAll_Deleted_Req) {
    return await axios.get<Product_GetAll_Deleted_Res>(
        'product/get-all-deleted/' + encodeURIComponent(size) + '/' + encodeURIComponent(page),
        {
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
                        devLog('Error while getting deleted products', res.message, ' (', res.statusCode, ')')
                        throw new Error(res.message)
                    }
                },
            ],
        },
    )
}

export const queryProduct_GetAll_Deleted = ({ page, size }: Product_GetAll_Deleted_Req) =>
    queryOptions({
        queryKey: ['products-deleted', page, size],
        queryFn: () => Product_GetAll_Deleted({ page, size }),
        select: data => data.data,
    })
