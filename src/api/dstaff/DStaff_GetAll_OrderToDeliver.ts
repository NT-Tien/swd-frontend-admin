import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Order, ResponseToOrderList } from '@/lib/types/Order'
import { queryOptions } from '@tanstack/react-query'
import axios from 'axios'

export type DStaff_GetAll_OrderToDeliver_Res = Order[]

export async function DStaff_GetAll_OrderToDeliver() {
    return await axios.get<DStaff_GetAll_OrderToDeliver_Res>(`/dstaff/get-order-need-to-shipping`, {
        headers: {
            Authorization: `Bearer ${AuthenticationHandler.getMemoryToken()}`,
        },
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<DStaff_GetAll_OrderToDeliver_Res>) => {
                if ('data' in res) {
                    // success
                    return ResponseToOrderList(res.data)
                } else {
                    // error
                    devLog('Error while marking order as delivered', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}

export const queryKeyDStaff_GetAll_OrderToDeliver = () => ['orders', 'to-deliver'] as const

export const queryDStaff_GetAll_OrderToDeliver = () =>
    queryOptions({
        queryKey: queryKeyDStaff_GetAll_OrderToDeliver(),
        queryFn: DStaff_GetAll_OrderToDeliver,
        select: data => data.data,
    })
