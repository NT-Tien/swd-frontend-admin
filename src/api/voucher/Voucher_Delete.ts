import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import axios from 'axios'

export type Voucher_Delete_Req = {
    id: string
}

export type Voucher_Delete_Res = {
    success: boolean
}

export function Voucher_Delete({ id }: Voucher_Delete_Req) {
    return axios.put<Voucher_Delete_Res>('voucher/delete/' + encodeURIComponent(id), {
        headers: {
            Authorization: `Bearer ${AuthenticationHandler.getMemoryToken()}`,
        },
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<DeleteResponse>) => {
                if ('data' in res) {
                    // success
                    return {
                        success: res.statusCode === 200 && res.data.affected > 0,
                    }
                } else {
                    // error
                    devLog('Error while deleting voucher', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}
