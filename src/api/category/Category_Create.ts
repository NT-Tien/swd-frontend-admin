/**
 * Creates a new category.
 * @param payload - The request payload containing the name of the category.
 * @returns A promise that resolves to the created category.
 * @throws {NoDataError} If no data is received in the response.
 * @throws {Error} If an error occurs while creating the category.
 */
import { ParseResponse } from '@/api/defaults'
import { Category, ResponseToCategory } from '@/lib/types/Category'
import axios from 'axios'

export type Category_Create_Req = {
    name: string
}
export type Category_Create_Res = Category

export async function Category_Create(payload: Category_Create_Req) {
    return await axios.post<Category_Create_Res>('category/create', payload, {
        transformResponse: [
            ParseResponse,
            (data: ApiResponse<Category>) => {
                if ('data' in data) {
                    // success
                    return ResponseToCategory(data.data)
                } else {
                    // error
                    devLog('Error while creating category', data.message, ' (', data.statusCode, ')')
                    throw new Error(data.message)
                }
            },
        ],
    })
}
