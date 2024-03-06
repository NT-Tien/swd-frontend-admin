import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Order, ResponseToOrderList } from '@/lib/types/Order'
import { queryOptions } from '@tanstack/react-query'
import axios from 'axios'

export type Order_GetAll_Res = Order[]

export async function Order_GetAll() {
    return await axios.get<Order_GetAll_Res>('/payment/get-all', {
        headers: {
            Authorization: `Bearer ${AuthenticationHandler.getMemoryToken()}`,
        },
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<Order_GetAll_Res>) => {
                if ('data' in res) {
                    return ResponseToOrderList(res.data)
                } else {
                    devLog('Error while creating order', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}

export const queryKeyOrder_GetAll = () => ['orders']
export const queryOrder_GetAll = () =>
    queryOptions({
        queryKey: ['orders'],
        queryFn: () => Order_GetAll(),
        select: res => res.data,
    })
