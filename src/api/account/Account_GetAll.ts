import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Account, ResponseToAccountList } from '@/lib/types/Account'
import { queryOptions } from '@tanstack/react-query'
import axios from 'axios'

export type Account_GetAll_Req = {
    page: number
    size: number
}

export type Account_GetAll_Res = GetResponse<Account>

export async function Account_GetAll({ page, size }: Account_GetAll_Req) {
    return await axios.get<Account_GetAll_Res>(`/account/get-all/${encodeURIComponent(size)}/${encodeURIComponent(page)}`, {
        headers: {
            Authorization: `Bearer ${AuthenticationHandler.getMemoryToken()}`,
        },
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<string[]>) => {
                if ('data' in res) {
                    return {
                        data: ResponseToAccountList(res.data[0] as unknown as Record<string, any>[]),
                        total: res.data[1],
                    }
                } else {
                    // error
                    devLog('Error while getting accounts', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}

export const queryAccount_GetAll = ({ page, size }: Account_GetAll_Req) =>
    queryOptions({
        queryKey: ['accounts', page, size],
        queryFn: () => Account_GetAll({ page, size }),
        select: res => res.data,
    })
