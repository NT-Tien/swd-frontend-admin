/**
 * Creates a new category.
 * @param payload - The request payload containing the name of the category.
 * @returns A promise that resolves to the created category.
 * @throws {NoDataError} If no data is received in the response.
 * @throws {Error} If an error occurs while creating the category.
 */
import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { ResponseToVoucher, Voucher } from '@/lib/types/Voucher'
import axios from 'axios'

export type Voucher_Create_Req = {
    code: string
    expired_date: string
    amount: number
    limit_total_max: number
    limit_total_min: number
    discount_percent: number
}
export type Voucher_Create_Res = Voucher

export async function Voucher_Create(payload: Voucher_Create_Req) {
    return await axios.post<Voucher_Create_Res>('voucher/create', payload, {
        headers: {
            Authorization: `Bearer ${AuthenticationHandler.getMemoryToken()}`,
        },
        transformResponse: [
            ParseResponse,
            (data: ApiResponse<Voucher>) => {
                if ('data' in data) {
                    // success
                    return ResponseToVoucher(data.data)
                } else {
                    // error
                    devLog('Error while creating category', data.message, ' (', data.statusCode, ')')
                    throw new Error(data.message)
                }
            },
        ],
    })
}
