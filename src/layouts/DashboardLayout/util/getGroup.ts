import { MenuItem } from '@/lib/types/MenuItem'

type getGroupProps = {
    key: string
    label: string
    children: MenuItem[]
}

export function getGroup(props: getGroupProps): MenuItem {
    return {
        ...props,
        type: 'group',
        style: {
            textTransform: 'uppercase',
            fontWeight: 'bold',
        },
    } satisfies MenuItem
}
