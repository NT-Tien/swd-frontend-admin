import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { ResponseToVoucher, Voucher } from '@/lib/types/Voucher'
import { queryOptions } from '@tanstack/react-query'
import axios from 'axios'

export type Voucher_GetOneByCode_Req = {
    code: string
}

export type Voucher_GetOneByCode_Res = Voucher | null

/**
 * Retrieves a single category from the server based on the provided ID.
 * @param id - The ID of the category to retrieve.
 * @returns A promise that resolves to the retrieved category or null if no category is found.
 * @throws NoDataError if no data is received from the server.
 * @throws Error if an error occurs while retrieving the category.
 */
export function Voucher_GetOneByCode({ code }: Voucher_GetOneByCode_Req) {
    return axios.get<Voucher_GetOneByCode_Res>('voucher/get-one-with-code/' + encodeURIComponent(code), {
        headers: {
            Authorization: `Bearer ${AuthenticationHandler.getMemoryToken()}`,
        },
        responseType: 'json',
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<Voucher>) => {
                if ('data' in res) {
                    // success
                    return res.data ? ResponseToVoucher(res.data) : null
                } else {
                    // error
                    devLog('Error while getting voucher', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}

export const queryVoucher_GetOneByCode = ({ code, enabled }: Voucher_GetOneByCode_Req & { enabled?: boolean }) =>
    queryOptions({
        queryKey: ['voucher', code],
        queryFn: () => Voucher_GetOneByCode({ code }),
        select: data => data.data,
        enabled: enabled ?? true,
    })
