import Head from '@/common/components/Head'
import RefreshButton from '@/common/components/RefreshButton'
import { CategoryListRoute } from '@/routes/Categories/CategoryList'
import AddCategoryModal from '@/routes/Categories/CategoryList/modals/AddCategoryModal'
import { tabItems } from '@/routes/Categories/CategoryList/util/tabItems'
import { tabKeys } from '@/routes/Products/ProductList/util/tabItems'
import { Plus } from '@phosphor-icons/react'
import { useNavigate } from '@tanstack/react-router'
import { Button, Flex, Tabs, Typography } from 'antd'

export default function CategoryListPage() {
    const tab = CategoryListRoute.useSearch({
        select: data => data.tab!,
    })
    const navigate = useNavigate()

    return (
        <>
            <Head title='Categories' />
            <Flex vertical gap={0}>
                <Typography.Title
                    level={2}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    Category List
                    <RefreshButton
                        queryKey={tab === 'all' ? ['categories'] : ['categories-deleted']}
                        isLoading={false}
                        style={{
                            marginLeft: '10px',
                        }}
                    />
                </Typography.Title>
                <Tabs
                    defaultActiveKey={tab}
                    items={tabItems}
                    onTabClick={key => {
                        navigate({
                            to: CategoryListRoute.to,
                            search: {
                                tab: key as tabKeys,
                            },
                        })
                    }}
                    tabBarExtraContent={
                        <Flex gap={5}>
                            <AddCategoryModal>
                                {({ handleOpen: handleOpenAddCategory }) => (
                                    <Button type='primary' icon={<Plus />} onClick={handleOpenAddCategory}>
                                        Add Category
                                    </Button>
                                )}
                            </AddCategoryModal>
                        </Flex>
                    }
                />
            </Flex>
        </>
    )
}
