import { ParseResponse } from '@/api/defaults'
import axios from 'axios'

export type Category_Delete_Req = {
    id: string
}

export type Category_Delete_Res = {
    success: boolean
}

export async function Category_Delete({ id }: Category_Delete_Req) {
    return await axios.delete<Category_Delete_Res>('category/delete/' + encodeURIComponent(id), {
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<DeleteResponse>) => {
                if ('data' in res) {
                    return {
                        success: res.statusCode === 200 && res.data.affected > 0,
                    }
                } else {
                    // error
                    console.error('Error while deleting category', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}
