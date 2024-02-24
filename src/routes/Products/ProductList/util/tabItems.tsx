import AllProductsList from '@/routes/Products/ProductList/components/AllProductsList'
import { TabsProps } from 'antd'

export type tabKeys = 'all' | 'disabled'

type Tab = NonNullable<TabsProps['items']>[number]
export const tabItems: (Tab & { key: tabKeys })[] = [
    {
        key: 'all',
        label: 'All',
        children: <AllProductsList />,
    },
    {
        key: 'disabled',
        label: 'Disabled',
        children: <AllProductsList disabled />,
    },
]
