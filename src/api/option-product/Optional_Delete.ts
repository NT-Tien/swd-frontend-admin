import { ParseResponse } from '@/api/defaults'
import axios from 'axios'

export type Optional_Delete_Req = {
    id: string
}

export type Optional_Delete_Res = {
    success: boolean
}

export function Optional_Delete({ id }: Optional_Delete_Req) {
    return axios.delete<Optional_Delete_Res>('option-products/delete/' + encodeURIComponent(id), {
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<DeleteResponse>) => {
                if ('data' in res) {
                    return {
                        success: res.statusCode === 200 && res.data.affected > 0,
                    }
                } else {
                    devLog('Error while deleting optional', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}
