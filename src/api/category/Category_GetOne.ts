import { Category, ResponseToCategory } from '@/lib/types/Category'
import axios from 'axios'

export type Category_GetOne_Req = {
    id: string
}

export type Category_GetOne_Res = Category | null

export function Category_GetOne({ id }: Category_GetOne_Req) {
    return axios.get<Category_GetOne_Res>(
        'category/get-one/' + encodeURIComponent(id),
        {
            responseType: 'json',
            transformResponse: [
                (data: any) => {
                    return ResponseToCategory(JSON.parse(data))
                },
            ],
        },
    )
}
