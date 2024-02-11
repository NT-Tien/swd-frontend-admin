import { ParseResponse } from '@/api/defaults'
import { Category, ResponseToCategoryList } from '@/lib/types/Category'
import { queryOptions } from '@tanstack/react-query'
import axios from 'axios'

/**
 * Retrieves all categories from the server.
 * @returns A promise that resolves to an object containing the category data and total count.
 * @throws NoDataError if no data is received from the server.
 */
export async function Category_GetAll() {
    return await axios.get<GetResponse<Category>>('/category/get-all', {
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<string[]>) => {
                if ('data' in res) {
                    return {
                        data: ResponseToCategoryList(res.data[0] as unknown as Record<string, any>[]),
                        total: res.data[1],
                    }
                } else {
                    // error
                    devLog('Error while getting categories', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}

export const queryCategory_GetAll = () =>
    queryOptions({
        queryKey: ['categories'],
        queryFn: () => Category_GetAll(),
        select: data => data.data,
    })