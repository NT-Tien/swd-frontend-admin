import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Product, ResponseToProduct } from '@/lib/types/Product'
import axios from 'axios'

export type Product_Create_Req = {
    name: string
    images: string[]
    category_id: string
    description: string
}

export type Product_Create_Res = Product

export async function Product_Create(product: Product_Create_Req) {
    const token = AuthenticationHandler.getToken()

    return await axios.post<Product_Create_Res>('product/create', product, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<Product>) => {
                if ('data' in res) {
                    return ResponseToProduct(res.data)
                } else {
                    devLog('Error while creating product', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}
