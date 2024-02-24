import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import axios from 'axios'

export type Product_SoftDelete_Req = {
    id: string
}

export type Product_SoftDelete_Res = {
    success: boolean
}

export async function Product_SoftDelete({ id }: Product_SoftDelete_Req) {
    return await axios.delete<Product_SoftDelete_Res>('product/soft-delete/' + encodeURIComponent(id), {
        headers: {
            Authorization: `Bearer ${AuthenticationHandler.getCookieToken()}`,
        },
        responseType: 'json',
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
                    devLog('Error while soft deleting product', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}
