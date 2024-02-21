import { ParseResponse } from '@/api/defaults'
import { ResponseToVoucherList, Voucher } from '@/lib/types/Voucher'
import { queryOptions } from '@tanstack/react-query'
import axios from 'axios'

export type Voucher_GetAll_Res = Voucher[]

/**
 * Retrieves all categories from the server.
 * @returns A promise that resolves to an object containing the category data and total count.
 * @throws NoDataError if no data is received from the server.
 */
export async function Voucher_GetAll() {
    return await axios.get<Voucher_GetAll_Res>('/voucher/get-all', {
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<Voucher[]>) => {
                if ('data' in res) {
                    return ResponseToVoucherList(res.data)
                } else {
                    // error
                    devLog('Error while getting vouchers', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}

export const queryVoucher_GetAll = () =>
    queryOptions({
        queryKey: ['vouchers'],
        queryFn: () => Voucher_GetAll(),
        select: data => data.data,
    })
