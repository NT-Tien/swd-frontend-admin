import AllCategoriesList from '@/routes/Categories/CategoryList/components/AllCategoriesList'
import { TabsProps } from 'antd'

export type tabKeys = 'all' | 'disabled'

type Tab = NonNullable<TabsProps['items']>[number]
export const tabItems: (Tab & { key: tabKeys })[] = [
    {
        key: 'all',
        label: 'All',
        children: <AllCategoriesList key={`all-categories`} />,
    },
    {
        key: 'disabled',
        label: 'Disabled',
        children: <AllCategoriesList disabled key={`disabled-categories`} />,
    },
]
