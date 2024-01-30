import { Category, ResponseToCategoryList } from '@/lib/types/Category'
import axios from 'axios'

export type Category_GetAll_Res = GetResponse<Category> | null

export async function Category_GetAll() {
    return await axios.get<Category_GetAll_Res>('/category/get-all', {
        transformResponse: [
            (data: any) => {
                const dataParsed = JSON.parse(data)

                return dataParsed
                    ? {
                          data: ResponseToCategoryList(dataParsed[0]),
                          total: dataParsed[1],
                      }
                    : null
            },
        ],
    })
}
