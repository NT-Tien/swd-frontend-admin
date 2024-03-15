import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import axios from 'axios'

export type Account_Delete_Req = {
    id: string
}

export type Account_Delete_Res = {
    success: boolean
}

export function Account_Delete({ id }: Account_Delete_Req) {
    return axios.delete<Account_Delete_Res>('/account/delete/' + encodeURIComponent(id), {
        headers: {
            Authorization: `Bearer ${AuthenticationHandler.getMemoryToken()}`,
        },
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<DeleteResponse>) => {
                if ('data' in res) {
                    return {
                        success: res.statusCode === 200 && res.data.affected > 0,
                    }
                } else {
                    devLog('Error while deleting account', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}
