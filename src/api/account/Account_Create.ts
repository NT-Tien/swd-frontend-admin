import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Account, ResponseToAccount } from '@/lib/types/Account'
import axios from 'axios'

export type Account_Create_Req = {
    email: string
    password: string
    role: string
}

export type Account_Create_Res = Account

export async function Account_Create(payload: Account_Create_Req) {
    const token = AuthenticationHandler.getMemoryToken()

    return await axios.post<Account_Create_Res>('/account/create', payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<Account_Create_Res>) => {
                if ('data' in res) {
                    return ResponseToAccount(res.data)
                } else {
                    devLog('Error while creating account', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}
