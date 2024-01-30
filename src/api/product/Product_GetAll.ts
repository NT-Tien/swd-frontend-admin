import { Product, ResponseToProductList } from '@/lib/types/Product'
import axios from 'axios'

export type Product_GetAll_Req = {
    page: number
    size: number
}

export type Product_GetAll_Res = GetResponse<Product>

export async function Product_GetAll({ page, size }: Product_GetAll_Req) {
    return await axios.get<Product_GetAll_Res>(
        'product/get-all/' +
            encodeURIComponent(size) +
            '/' +
            encodeURIComponent(page),
        {
            responseType: 'json',
            transformResponse: [
                (res: any) => {
                    const dataParsed = JSON.parse(res)
                    return {
                        data: ResponseToProductList(dataParsed[0]),
                        total: dataParsed[1],
                    }
                },
            ],
        },
    )
}
