import axios from 'axios'
import { ParseResponse } from '../defaults'
import { Product, ResponseToProduct } from '../../lib/types/Product'
import { queryOptions } from '@tanstack/react-query'

export type Product_GetByName_Req = {
    name: string
}

export type Product_GetByName_Res = Product | null

export async function Product_GetByName({ name }: Product_GetByName_Req) {
    return await axios.get<Product_GetByName_Res>('product/get-by-name/' + encodeURIComponent(name), {
        responseType: 'json',
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<Product>) => {
                if ('data' in res) {
                    return res.data ? ResponseToProduct(res.data) : null
                } else {
                    devLog('Error while getting product by name', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}

export const queryProduct_GetByName = ({ name }: Product_GetByName_Req) =>
    queryOptions({
        queryKey: ['product', name],
        queryFn: () => Product_GetByName({ name }),
        select: data => data.data,
    })
