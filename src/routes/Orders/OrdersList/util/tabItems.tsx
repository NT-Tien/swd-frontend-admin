import AllOrdersList from '@/routes/Orders/OrdersList/components/AllOrdersList'
import { TabsProps } from 'antd'

export type tabKeys = 'all' | 'disabled'

type Tab = NonNullable<TabsProps['items']>[number]
export const tabItems: (Tab & { key: tabKeys })[] = [
    {
        key: 'all',
        label: 'All',
        children: <AllOrdersList />,
    },
    {
        key: 'disabled',
        label: 'Disabled',
        children: <AllOrdersList />,
    },
]
