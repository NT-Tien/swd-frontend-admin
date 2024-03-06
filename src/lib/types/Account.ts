export enum Role {
    ADMIN = 'admin',
    USER = 'user',
    STAFF = 'staff',
    DSTAFF = 'dstaff',
}

export function RoleToNumber(role: Role) {
    switch (role) {
        case Role.ADMIN:
            return 0
        case Role.USER:
            return 1
        case Role.STAFF:
            return 2
        case Role.DSTAFF:
            return 3
    }
}

export function isAuthorized(role: Role, currentRole?: Role): boolean {
    if (!currentRole) return false
    return RoleToNumber(role) >= RoleToNumber(currentRole)
}

export function getLargerRole(role1: Role, role2: Role): Role {
    return RoleToNumber(role1) > RoleToNumber(role2) ? role1 : role2
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
        role: response.role as Role,
    } satisfies Account
}

export function ResponseToAccountList(response: Record<string, any>[]): Account[] {
    return response.map(ResponseToAccount)
}
