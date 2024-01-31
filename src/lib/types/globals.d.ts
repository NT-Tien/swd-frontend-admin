declare type GetResponse<T> = {
    data: T[]
    total: number
}

declare type ApiResponse<T> = {
    data: T[]
    message: string
    statusCode: number
}