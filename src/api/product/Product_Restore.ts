import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Product, ResponseToProduct } from '@/lib/types/Product'
import axios from 'axios'

export type Product_Restore_Req = {
    id: string
}

export type Product_Restore_Res = Product

export default function Product_Restore({ id }: Product_Restore_Req) {
    return axios.put(`/product/restore/${encodeURIComponent(id)}`, null, {
        headers: {
            Authorization: `Bearer ${AuthenticationHandler.getMemoryToken()}`,
        },
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<Product_Restore_Res>) => {
                if ('data' in res) {
                    return ResponseToProduct(res.data)
                } else {
                    devLog('Error while restoring product', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}
