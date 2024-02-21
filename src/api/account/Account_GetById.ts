import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Account } from '@/lib/types/Account'
import { queryOptions } from '@tanstack/react-query'
import axios from 'axios'

export type Account_GetById_Req = {
    id: string
}

export type Account_GetById_Res = Account

export async function Account_GetById({ id }: Account_GetById_Req) {
    return await axios.get<Account_GetById_Res>(`/account/${encodeURIComponent(id)}`, {
        headers: {
            Authorization: `Bearer ${AuthenticationHandler.getToken()}`,
        },
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<Account_GetById_Res>) => {
                if ('data' in res) {
                    return res.data
                } else {
                    devLog('Invalid response', res)
                    throw new Error('Invalid response')
                }
            },
        ],
    })
}

export const queryAccount_GetById = ({ id }: Account_GetById_Req) =>
    queryOptions({
        queryKey: ['account', id],
        queryFn: () => Account_GetById({ id }),
        select: res => res.data,
    })
