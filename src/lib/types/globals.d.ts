import { BreadcrumbProps } from 'antd'

declare type GetResponse<T> = {
    data: T[]
    total: number
}

declare type DeleteResponse = {
    generatedMaps: string[]
    raw: string[]
    affected: number
}

declare type SuccessResponse<T> = {
    data: T
    message: string
    statusCode: 200 | 201 | 204
}

declare type ErrorResponse = {
    message: any
    statusCode: number
}

declare type ApiResponse<T> = SuccessResponse<T> | ErrorResponse

export type Breadcrumb = NonNullable<BreadcrumbProps['items']>[number]
