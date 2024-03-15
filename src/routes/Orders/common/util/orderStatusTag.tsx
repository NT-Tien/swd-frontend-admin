import { DeliveryStatus } from '@/lib/types/Order'
import { Tag } from 'antd'
import { CSSProperties } from 'react'

const style: CSSProperties = {
    width: '80px',
    textAlign: 'center',
}

export function orderStatusTag(status: DeliveryStatus) {
    switch (status) {
        case DeliveryStatus.PENDING:
            return (
                <Tag color='default' style={style}>
                    {DeliveryStatus.PENDING}
                </Tag>
            )
        case DeliveryStatus.SHIPPING:
            return (
                <Tag color='blue-inverse' style={style}>
                    {DeliveryStatus.SHIPPING}
                </Tag>
            )
        case DeliveryStatus.DELIVERED:
            return (
                <Tag color='green-inverse' style={style}>
                    {DeliveryStatus.DELIVERED}
                </Tag>
            )
        case DeliveryStatus.CANCELED:
            return (
                <Tag color='red-inverse' style={style}>
                    {DeliveryStatus.CANCELED}
                </Tag>
            )
    }
}
