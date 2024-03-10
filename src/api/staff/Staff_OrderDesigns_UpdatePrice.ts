import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import axios from 'axios'

export type Staff_OrderDesigns_UpdatePrice_Req = {
    id: string
    price: number
}

export type Staff_OrderDesigns_UpdatePrice_Res = { success: boolean }

export async function Staff_OrderDesigns_UpdatePrice({ id, price }: Staff_OrderDesigns_UpdatePrice_Req) {
    return await axios.put<Staff_OrderDesigns_UpdatePrice_Res>(`/staff/update-price-order-design/${id}/${price}`, undefined, {
        headers: {
            Authorization: `Bearer ${AuthenticationHandler.getCookieToken()}`,
        },
        responseType: 'json',
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<DeleteResponse>) => {
                if ('data' in res) {
                    return {
                        success: res.statusCode === 200 && res.data.affected > 0,
                    }
                } else {
                    devLog('Error while updating order design price', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}
