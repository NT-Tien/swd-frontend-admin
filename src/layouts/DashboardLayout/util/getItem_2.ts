import { MenuItem } from '@/lib/types/MenuItem'
import { DotOutline } from '@phosphor-icons/react'
import { ReactElement, cloneElement, createElement } from 'react'

type getItem_2Props = {
    key: string
    label: string
    icon?: ReactElement
    onClick?: () => void
    shown?: boolean
}

export function getItem_2({ shown = true, ...props }: getItem_2Props): MenuItem {
    if (!props.icon) {
        props.icon = createElement(DotOutline)
    }

    return {
        ...props,
        onClick: shown ? props.onClick : undefined,
        icon: props.icon
            ? cloneElement(props.icon, {
                  weight: 'fill',
                  size: 16,
              })
            : undefined,
        style: {
            textTransform: 'capitalize',
            fontWeight: 'normal',
            userSelect: 'none',
            display: shown ? '' : 'none',
        },
    } satisfies MenuItem
}
