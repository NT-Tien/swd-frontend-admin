import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Account } from '@/lib/types/Account'
import axios from 'axios'

export type Account_Update_Password_Req = {
    id: string
    payload: {
        password: string
    }
}

export type Account_Update_Password_Res = Account

export async function Account_Update_Password({ id, payload }: Account_Update_Password_Req) {
    return await axios.put<Account_Update_Password_Res>(`/account/update-password/${encodeURIComponent(id)}`, payload, {
        headers: {
            Authorization: `Bearer ${AuthenticationHandler.getMemoryToken()}`,
        },
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<Account_Update_Password_Res>) => {
                if ('data' in res) {
                    return res.data
                } else {
                    devLog('Error while updating account password', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}
