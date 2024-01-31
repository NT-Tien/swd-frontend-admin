import { Category, ResponseToCategory } from '@/lib/types/Category'
import axios from 'axios'

export type Category_Create_Req = {
    name: string
}

export type Category_Create_Res = Category

export async function Category_Create(payload: Category_Create_Req) {
    return await axios.post<Category_Create_Res>('category/create', payload, {
        transformResponse: [
            (data: any) => {
                return data ? ResponseToCategory(JSON.parse(data)) : data
            },
        ],
    })
}