import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role } from '@/lib/types/Account'
import { queryOptions } from '@tanstack/react-query'
import axios from 'axios'

export type Account_GetOneWithEmail_Req = {
    email: string
}

export type Account_GetOneWithEmail_Res = {
    email: string
    role: Role
} | null

export async function Account_GetOneWithEmail({ email }: Account_GetOneWithEmail_Req) {
    return await axios.get<Account_GetOneWithEmail_Res>(`/account/get-one-with-email/${encodeURIComponent(email)}`, {
        headers: {
            Authorization: `Bearer ${AuthenticationHandler.getCookieToken()}`,
        },
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<Account_GetOneWithEmail_Res>) => {
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

export const queryAccount_GetOneWithEmail = ({ email }: Account_GetOneWithEmail_Req) =>
    queryOptions({
        queryKey: ['account', email],
        queryFn: () => Account_GetOneWithEmail({ email }),
        select: res => res.data,
    })