import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { ProductOptional } from '@/lib/types/ProductOptional'
import axios from 'axios'

export type Staff_UpdateQuantityProduct_Req = {
    id: string
    quantity: number
}

export type Staff_UpdateQuantityProduct_Res = Omit<ProductOptional, 'product_id'>

export async function Staff_UpdateQuantityProduct({ id, quantity }: Staff_UpdateQuantityProduct_Req) {
    return await axios.put(`/staff/update-quantity-product-in-stock/${encodeURIComponent(id)}/${encodeURIComponent(quantity)}`, undefined, {
        headers: {
            Authorization: `Bearer ${AuthenticationHandler.getMemoryToken()}`,
        },
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<Staff_UpdateQuantityProduct_Res>) => {
                if ('data' in res) {
                    return {
                        id: res.data.id,
                        createdAt: new Date(res.data.createdAt),
                        updatedAt: new Date(res.data.updatedAt),
                        deletedAt: res.data.deletedAt ? new Date(res.data.deletedAt) : null,
                        name: res.data.name,
                        material: res.data.material,
                        price: Number(res.data.price),
                        quantity: res.data.quantity,
                    }
                } else {
                    devLog('Error while deleting product', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}
