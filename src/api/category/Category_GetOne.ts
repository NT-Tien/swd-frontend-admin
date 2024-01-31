import { ParseResponse } from '@/api/defaults'
import { Category, ResponseToCategory } from '@/lib/types/Category'
import axios from 'axios'

export type Category_GetOne_Req = {
    id: string
}

export type Category_GetOne_Res = Category | null

/**
 * Retrieves a single category from the server based on the provided ID.
 * @param id - The ID of the category to retrieve.
 * @returns A promise that resolves to the retrieved category or null if no category is found.
 * @throws NoDataError if no data is received from the server.
 * @throws Error if an error occurs while retrieving the category.
 */
export function Category_GetOne({ id }: Category_GetOne_Req) {
    return axios.get<Category_GetOne_Res>('category/get-one/' + encodeURIComponent(id), {
        responseType: 'json',
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<Category>) => {
                if ('data' in res) {
                    // success
                    return ResponseToCategory(res.data)
                } else {
                    // error
                    console.error('Error while getting category', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}
