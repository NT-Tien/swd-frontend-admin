import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { ResponseToVoucher, Voucher } from '@/lib/types/Voucher'
import { queryOptions } from '@tanstack/react-query'
import axios from 'axios'

export type Voucher_GetOne_Req = {
    id: string
}

export type Voucher_GetOne_Res = Voucher | null

/**
 * Retrieves a single category from the server based on the provided ID.
 * @param id - The ID of the category to retrieve.
 * @returns A promise that resolves to the retrieved category or null if no category is found.
 * @throws NoDataError if no data is received from the server.
 * @throws Error if an error occurs while retrieving the category.
 */
export function Voucher_GetOne({ id }: Voucher_GetOne_Req) {
    return axios.get<Voucher_GetOne_Res>('voucher/get-one/' + encodeURIComponent(id), {
        headers: {
            Authorization: `Bearer ${AuthenticationHandler.getMemoryToken()}`,
        },
        responseType: 'json',
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<Voucher>) => {
                if ('data' in res) {
                    // success
                    return ResponseToVoucher(res.data)
                } else {
                    // error
                    devLog('Error while getting voucher', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}

export const queryVoucher_GetOne = ({ id, enabled }: Voucher_GetOne_Req & { enabled?: boolean }) =>
    queryOptions({
        queryKey: ['voucher', id],
        queryFn: () => Voucher_GetOne({ id }),
        select: data => data.data,
        enabled: enabled ?? true,
    })
