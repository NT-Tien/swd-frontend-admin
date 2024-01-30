import {
    ProductOptional,
    ResponseToProductOptionalList,
} from '@/lib/types/ProductOptional'
import axios from 'axios'

export type Optional_GetAll_Res = GetResponse<ProductOptional>

export function Optional_GetAll() {
    return axios.get<Optional_GetAll_Res>('get-all', {
        transformResponse: [
            (data: any) => {
                const dataParsed = JSON.parse(data)

                return dataParsed
                    ? {
                          data: ResponseToProductOptionalList(dataParsed),
                          total: dataParsed.length,
                      }
                    : null
            },
        ],
    })
}
