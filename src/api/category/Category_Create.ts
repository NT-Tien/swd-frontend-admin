import { getUrl } from '@/api/defaults'
import axios from 'axios'

export type Category_CreateDTO = {
    name: string
}

export function Category_Create(category: Category_CreateDTO) {
    return axios.post(getUrl('category/create'), category)
}
