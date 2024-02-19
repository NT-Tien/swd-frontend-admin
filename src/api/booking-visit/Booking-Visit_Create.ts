import axios from 'axios'
import { BookingVisit } from '../../lib/types/BookingVisit'
import { ParseResponse } from '../defaults'

export type BookingVisit_Create_Req = BookingVisit

export type BookingVisit_Create_Res = BookingVisit

export async function BookingVisit_Create(payload: BookingVisit_Create_Req) {
    return await axios.post<BookingVisit_Create_Res>('booking-visit/create', payload, {
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<any>) => {
                if ('data' in res) {
                    return res.data.data
                } else {
                    devLog('Error while creating booking visit', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}
