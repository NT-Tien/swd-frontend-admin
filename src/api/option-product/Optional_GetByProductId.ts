import { getUrl } from '@/api/defaults'
import {
    ProductOptional,
    ResponseToProductOptionalList,
} from '@/lib/types/ProductOptional'
import axios from 'axios'

export type Optional_GetByProductId_Req = {
    productId: string
}

export type Optional_GetByProductId_Res = ProductOptional[]

export function Optional_GetByProductId({
    productId,
}: Optional_GetByProductId_Req) {
    return axios.get<Optional_GetByProductId_Res>(
        'get-all/' + encodeURIComponent(productId),
        {
            transformResponse: [
                (data: any) => {
                    const parsedData = JSON.parse(data)

                    return parsedData
                        ? ResponseToProductOptionalList(parsedData)
                        : null
                },
            ],
        },
    )
}
