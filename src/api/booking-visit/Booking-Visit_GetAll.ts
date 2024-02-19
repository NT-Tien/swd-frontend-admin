import axios from 'axios'
import { BookingVisit, ResponseToBookingVisitList } from '../../lib/types/BookingVisit'
import AuthenticationHandler from '../../lib/AuthenticationHandler'
import { ParseResponse } from '../defaults'
import { queryOptions } from '@tanstack/react-query'

export type BookingVisit_GetAll_Req = {
    page: number
    limit: number
}

export type BookingVisit_GetAll_Res = GetResponse<BookingVisit>

export async function BookingVisit_GetAll({ page, limit }: BookingVisit_GetAll_Req) {
    const token = AuthenticationHandler.getToken()

    return await axios.get<BookingVisit_GetAll_Res>(`/booking-visit/get-all/${encodeURIComponent(limit)}/${encodeURIComponent(page)}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<string[]>) => {
                if ('data' in res) {
                    // TODO - add total to response
                    return {
                        data: ResponseToBookingVisitList(res.data as unknown as Record<string, any>[]),
                        total: 404,
                    }
                } else {
                    devLog('Error while getting products', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}

export const queryBookingVisit_GetAll = ({ page, limit }: BookingVisit_GetAll_Req) =>
    queryOptions({
        queryKey: ['booking-visits', page, limit],
        queryFn: () => BookingVisit_GetAll({ page, limit }),
        select: data => data.data,
    })
