import { MenuItem } from '@/lib/types/MenuItem'

type getGroupProps = {
    key: string
    label: any
    children: MenuItem[]
    shown?: boolean
}

export function getGroup({ shown = true, ...props }: getGroupProps): MenuItem {
    return {
        ...props,
        type: 'group',
        style: {
            textTransform: 'uppercase',
            fontWeight: 'bold',
            userSelect: 'none',
            display: shown ? '' : 'none',
        },
    } satisfies MenuItem
}
