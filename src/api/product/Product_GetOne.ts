import { Product, ResponseToProduct } from '@/lib/types/Product'
import axios from 'axios'

export type Product_GetOne_Req = {
    id: string
}

export type Product_GetOne_Res = Product | null

export async function Product_GetOne({ id }: Product_GetOne_Req) {
    return axios.get<Product_GetOne_Res>(
        'product/get-one/' + encodeURIComponent(id),
        {
            responseType: 'json',
            transformResponse: [
                (data: any) => {
                    return ResponseToProduct(JSON.parse(data))
                },
            ],
        },
    )
}
