import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Order, ResponseToOrder } from '@/lib/types/Order'
import axios from 'axios'

export type DStaff_OrderToCancel_Req = {
    id: string
}

export type DStaff_OrderToCancel_Res = Order

export async function DStaff_OrderToCancel({ id }: DStaff_OrderToCancel_Req) {
    return await axios.post<DStaff_OrderToCancel_Res>(`dstaff/update-status-order-cancel/${encodeURIComponent(id)}`, undefined, {
        headers: {
            Authorization: `Bearer ${AuthenticationHandler.getMemoryToken()}`,
        },
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<DStaff_OrderToCancel_Res>) => {
                if ('data' in res) {
                    // success
                    return ResponseToOrder(res.data)
                } else {
                    // error
                    devLog('Error while marking order as delivered', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}
