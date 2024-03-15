import { Role } from '@/lib/types/Account'
import { Tag } from 'antd'

export function getRoleTag(role: Role) {
    switch (role) {
        case Role.ADMIN: {
            return <Tag color='red-inverse'>Admin</Tag>
        }
        case Role.STAFF: {
            return <Tag color='blue-inverse'>Staff</Tag>
        }
        case Role.USER: {
            return <Tag color='green-inverse'>User</Tag>
        }
        case Role.DSTAFF: {
            return <Tag color='purple-inverse'>Delivery Staff</Tag>
        }

        default: {
            return <Tag color='grey-inverse'>Unknown</Tag>
        }
    }
}
