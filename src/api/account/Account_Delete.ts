import Cookies from 'js-cookie'
import { ParseResponse } from '@/api/defaults'
import axios from 'axios'

export type Account_Delete_Req = {
    id: string
}

export type Account_Delete_Res = {
    success: boolean
}

export function Account_Delete({ id }: Account_Delete_Req) {
    const token = Cookies.get('token')

    return axios.delete<Account_Delete_Res>('/account/delete/' + encodeURIComponent(id), {
        headers: {
            Authorization: `Bearer ${token}`,
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
