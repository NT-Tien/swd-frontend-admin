import { getUrl } from '@/api/defaults'
import { Category } from '@/lib/types/Category'
import axios from 'axios'

export function Category_GetAll() {
    return axios
        .get<Category[]>(getUrl('category/get-all'))
        .then(res => res.data)
}
