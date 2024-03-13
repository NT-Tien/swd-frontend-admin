import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import axios from 'axios'

export type Staff_OrderDesigns_SetPaid_Req = {
    orderId: string
}

export type Staff_OrderDesigns_SetPaid_Res = {
    success: boolean
}

export async function Staff_OrderDesigns_SetPaid({ orderId }: Staff_OrderDesigns_SetPaid_Req) {
    return await axios.put<Staff_OrderDesigns_SetPaid_Res>(`/staff/update-is-paid/${encodeURIComponent(orderId)}`, undefined, {
        headers: {
            Authorization: `Bearer ${AuthenticationHandler.getMemoryToken()}`,
        },
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<DeleteResponse>) => {
                return {
                    success: res.statusCode === 200,
                }
            },
        ],
    })
}
