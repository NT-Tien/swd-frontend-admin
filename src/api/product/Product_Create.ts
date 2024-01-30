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
    return await axios.post<Product_Create_Res>('product/create', product, {
        transformResponse: [
            (data: any) => {
                const parsedData = JSON.parse(data)

                // TODO Ensure that response is clearly valid
                return parsedData.id ? ResponseToProduct(parsedData) : null
            },
        ],
    })
}
