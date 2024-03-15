import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { OrderDesign, ResponseToOrderDesignList } from '@/lib/types/OrderDesign'
import { queryOptions } from '@tanstack/react-query'
import axios from 'axios'

export type Staff_OrderDesigns_GetAll_Res = OrderDesign[]

export async function Staff_OrderDesigns_GetAll() {
    return await axios.get<Staff_OrderDesigns_GetAll_Res>('/staff/get-list-order-design', {
        headers: {
            Authorization: `Bearer ${AuthenticationHandler.getMemoryToken()}`,
        },
        responseType: 'json',
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<Staff_OrderDesigns_GetAll_Res>) => {
                if ('data' in res) {
                    return ResponseToOrderDesignList(res.data)
                } else {
                    devLog('Error while creating order', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}

export const queryKeyStaff_OrderDesigns_GetAll = () => ['staff', 'order-designs']
export const queryStaff_OrderDesigns_GetAll = () =>
    queryOptions({
        queryKey: queryKeyStaff_OrderDesigns_GetAll(),
        queryFn: () => Staff_OrderDesigns_GetAll(),
        select: res => res.data,
    })
