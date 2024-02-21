/**
 * Creates a new category.
 * @param payload - The request payload containing the name of the category.
 * @returns A promise that resolves to the created category.
 * @throws {NoDataError} If no data is received in the response.
 * @throws {Error} If an error occurs while creating the category.
 */
import { ParseResponse } from '@/api/defaults'
import { ResponseToVoucher, Voucher } from '@/lib/types/Voucher'
import axios from 'axios'

export type Voucher_Create_Req = Omit<Voucher, 'createdAt' | 'id' | 'updatedAt' | 'deletedAt'>
export type Voucher_Create_Res = Voucher

export async function Voucher_Create(payload: Voucher_Create_Req) {
    return await axios.post<Voucher_Create_Res>('voucher/create', payload, {
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
