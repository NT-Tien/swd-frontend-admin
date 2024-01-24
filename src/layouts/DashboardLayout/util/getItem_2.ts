import { MenuItem } from '@/lib/types/MenuItem'
import { DotOutline } from '@phosphor-icons/react'
import { ReactElement, cloneElement, createElement } from 'react'

type getItem_2Props = {
    key: string
    label: string
    icon?: ReactElement
    onClick?: () => void
}

export function getItem_2(props: getItem_2Props): MenuItem {
    if (!props.icon) {
        props.icon = createElement(DotOutline)
    }

    return {
        ...props,
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
        },
    } satisfies MenuItem
}
