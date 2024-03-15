import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Account, ResponseToAccount } from '@/lib/types/Account'
import axios from 'axios'

export type Account_Update_Role_Req = {
    id: string
    payload: {
        role: string
    }
}

export type Account_Update_Role_Res = Account

export async function Account_Update_Role({ id, payload }: Account_Update_Role_Req) {
    return await axios.put<Account_Update_Role_Res>(`account/update-role/${encodeURIComponent(id)}`, payload, {
        headers: {
            Authorization: `Bearer ${AuthenticationHandler.getMemoryToken()}`,
        },
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<Account_Update_Role_Res>) => {
                if ('data' in res) {
                    return ResponseToAccount(res.data)
                } else {
                    devLog('Error while updating account', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}
