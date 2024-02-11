import { ParseResponse } from '@/api/defaults'
import axios from 'axios'

export type Product_Delete_Req = {
    id: string
}

export type Product_Delete_Res = {
    success: boolean
}

export function Product_Delete({ id }: Product_Delete_Req) {
    return axios.delete<Product_Delete_Res>('product/delete/' + encodeURIComponent(id), {
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<DeleteResponse>) => {
                if ('data' in res) {
                    // success
                    return {
                        success: res.statusCode === 200 && res.data.affected > 0,
                    }
                } else {
                    // error
                    devLog('Error while deleting product', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}
