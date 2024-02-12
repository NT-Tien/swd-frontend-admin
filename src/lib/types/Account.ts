export enum Role {
    ADMIN = 'admin',
    USER = 'user',
    STAFF = 'staff',
    DSTAFF = 'dstaff',
}

export type Account = {
    id: string
    createdAt: Date
    updatedAt: Date
    deletedAt: null | Date
    email: string
    password: string
    role: Role
}

export function ResponseToAccount(response: Record<string, any>): Account {
    return {
        id: response.id,
        createdAt: new Date(response.createdAt),
        updatedAt: new Date(response.updatedAt),
        deletedAt: response.deletedAt ? new Date(response.deletedAt) : null,
        email: response.email,
        password: response.password,
        role: response.role,
    } satisfies Account
}

export function ResponseToAccountList(response: Record<string, any>[]): Account[] {
    return response.map(ResponseToAccount)
}
