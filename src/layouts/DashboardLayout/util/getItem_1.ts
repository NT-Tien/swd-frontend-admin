import { MenuItem } from '@/lib/types/MenuItem'
import { ReactElement, cloneElement } from 'react'

type getItem_1Props = {
    key: string
    label: string
    icon?: ReactElement
    children?: MenuItem[]
    onClick?: () => void
    shown?: boolean
}

export function getItem_1({ shown = true, icon, onClick, ...props }: getItem_1Props): MenuItem {
    return {
        ...props,
        onClick: shown ? onClick : undefined,
        icon: icon ? cloneElement(icon, { weight: 'fill', size: 16 }) : undefined,
        style: {
            textTransform: 'capitalize',
            fontWeight: 'normal',
            userSelect: 'none',
            display: shown ? '' : 'none',
        },
    } satisfies MenuItem
}
