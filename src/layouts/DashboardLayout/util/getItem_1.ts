import { MenuItem } from '@/lib/types/MenuItem'
import { ReactElement, cloneElement } from 'react'

type getItem_1Props = {
    key: string
    label: string
    icon?: ReactElement
    children?: MenuItem[]
    onClick?: () => void
}

export function getItem_1(props: getItem_1Props): MenuItem {
    return {
        ...props,
        icon: props.icon
            ? cloneElement(props.icon, { weight: 'fill', size: 16 })
            : undefined,
        style: {
            textTransform: 'capitalize',
            fontWeight: 'normal',
        },
    } satisfies MenuItem
}
