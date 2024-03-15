import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
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
        headers: {
            Authorization: `Bearer ${AuthenticationHandler.getMemoryToken()}`,
        },
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
        select: res => res.data.filter(voucher => voucher.deletedAt === null),
    })

export const queryVoucher_GetAllDisabled = () =>
    queryOptions({
        queryKey: ['vouchers-disabled'],
        queryFn: () => Voucher_GetAll(),
        select: res => res.data.filter(voucher => voucher.deletedAt !== null),
    })