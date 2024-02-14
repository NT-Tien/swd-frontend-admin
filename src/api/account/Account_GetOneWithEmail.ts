import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role } from '@/lib/types/Account'
import axios from 'axios'

export type Account_GetOneWithEmail_Req = {
    email: string
}

export type Account_GetOneWithEmail_Res = {
    email: string
    role: Role
} | null

export async function Acocunt_GetOneWithEmail({ email }: Account_GetOneWithEmail_Req) {
    const token = AuthenticationHandler.getToken()

    return await axios.get<Account_GetOneWithEmail_Res>(`/account/get-one-with-email/${encodeURIComponent(email)}`, {
        headers: {
            Authorization: `Bearer ${token}`,
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
