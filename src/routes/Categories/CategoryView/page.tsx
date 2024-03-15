import Head from '@/common/components/Head'
import { Product } from '@/lib/types/Product'
import GetColumnSearchProps from '@/lib/util/getColumnSearchProps'
import { CategoryListBreadcrumb } from '@/routes/Categories/CategoryList/breadcrumb'
import { CategoryViewRoute } from '@/routes/Categories/CategoryView'
import { CategoryViewBreadcrumb } from '@/routes/Categories/CategoryView/breadcrumb'
import { DashboardBreadcrumb } from '@/routes/Dashboard/DashboardBreadcrumb'
import { ProductViewRoute } from '@/routes/Products/ProductView'
import { Await, useNavigate } from '@tanstack/react-router'
import { Breadcrumb, Button, Card, Descriptions, Flex, Table, Typography } from 'antd'
import dayjs from 'dayjs'
import { Suspense } from 'react'

export default function CategoryViewPage() {
    const navigate = useNavigate()
    const { category, products } = CategoryViewRoute.useLoaderData()
    const id = CategoryViewRoute.useParams({ select: data => data.id })
    const page = CategoryViewRoute.useSearch({
        select: data => data.page!,
    })
    const size = CategoryViewRoute.useSearch({
        select: data => data.size!,
    })

    const searchColumnProps = GetColumnSearchProps<Product>()

    return (
        <>
            <Head title={`Category`} />
            <Suspense fallback={<Card loading />}>
                <Await promise={category}>
                    {({ data: category }) => (
                        <>
                            <Head title={`${category.name}`} />
                            <Breadcrumb
                                style={{
                                    marginBottom: '5px',
                                }}
                                items={[
                                    DashboardBreadcrumb(),
                                    CategoryListBreadcrumb(),
                                    CategoryViewBreadcrumb({ isCurrent: true, title: category.id }),
                                ]}
                            />
                            <Typography.Title level={2}>{category.name}</Typography.Title>
                            <Card title='Details'>
                                <Descriptions
                                    items={[
                                        {
                                            key: 'name',
                                            label: 'Name',
                                            children: category.name,
                                        },
                                        {
                                            key: 'createdAt',
                                            label: 'Created At',
                                            children: dayjs(category.createdAt).format('DD-MM-YYYY HH:mm:ss'),
                                        },
                                        {
                                            key: 'updatedAt',
                                            label: 'Updated At',
                                            children: dayjs(category.updatedAt).format('DD-MM-YYYY HH:mm:ss'),
                                        },
                                        {
                                            key: 'isDeleted',
                                            label: 'Deleted',
                                            children: category.deletedAt ? dayjs(category.deletedAt).format('DD-MM-YYYY HH:mm:ss') : 'No',
                                        },
                                    ]}
                                />
                            </Card>
                        </>
                    )}
                </Await>
            </Suspense>
            <Suspense fallback={<Card loading />}>
                <Await promise={products}>
                    {({ data: products }) => (
                        <Card
                            title={
                                <Flex align='center' justify='space-between'>
                                    <div>Products</div>
                                    <div>
                                        There {products.total === 1 ? 'is' : 'are'} {products.total} product{products.total !== 1 && 's'} in
                                        this category.
                                    </div>
                                </Flex>
                            }
                            style={{
                                marginTop: '10px',
                            }}
                        >
                            <Table
                                dataSource={products?.data}
                                columns={[
                                    {
                                        title: 'No.',
                                        render: (_, __, index) => index + 1 + (page - 1) * size,
                                        width: 70,
                                    },
                                    {
                                        title: 'Name',
                                        dataIndex: 'name',
                                        key: 'name',
                                        sorter: (a, b) => a.name.localeCompare(b.name),
                                        sortDirections: ['ascend', 'descend'],
                                        ...searchColumnProps('name'),
                                    },
                                    {
                                        title: 'Created At',
                                        dataIndex: 'createdAt',
                                        key: 'createdAt',
                                        render: value => dayjs(value).format('DD-MM-YYYY'),
                                        sorter: (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
                                        sortDirections: ['ascend', 'descend'],
                                        defaultSortOrder: 'descend',
                                        width: 150,
                                    },
                                    {
                                        title: 'Updated At',
                                        dataIndex: 'updatedAt',
                                        key: 'updatedAt',
                                        render: value => dayjs(value).format('DD-MM-YYYY'),
                                        sorter: (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime(),
                                        sortDirections: ['ascend', 'descend'],
                                        width: 150,
                                    },
                                    {
                                        title: 'Description',
                                        dataIndex: 'description',
                                        key: 'description',
                                        render: (value: string) => {
                                            return value.slice(0, 70) + (value.length > 70 ? '...' : '')
                                        },
                                        ellipsis: true,
                                        ...searchColumnProps('description'),
                                    },
                                    {
                                        title: 'Action',
                                        dataIndex: 'action',
                                        key: 'action',
                                        render: (_, record) => (
                                            <Button
                                                onClick={() => {
                                                    navigate({
                                                        to: ProductViewRoute.to,
                                                        params: {
                                                            id: record.id,
                                                        },
                                                        search: {
                                                            editing: false,
                                                        },
                                                    })
                                                }}
                                            >
                                                View
                                            </Button>
                                        ),
                                    },
                                ]}
                                pagination={{
                                    defaultCurrent: page,
                                    pageSize: size,
                                    total: products?.total ?? 0,
                                    pageSizeOptions: ['8', '16', '24', '32'],
                                    showSizeChanger: true,
                                    onShowSizeChange(_, size) {
                                        navigate({
                                            to: CategoryViewRoute.to,
                                            params: {
                                                id,
                                            },
                                            search: {
                                                page,
                                                size: size,
                                            },
                                        })
                                    },
                                    showTotal: (total, range) => {
                                        return `${range[0]}-${range[1]} of ${total} items`
                                    },
                                    showLessItems: true,
                                    showQuickJumper: true,
                                    onChange(page) {
                                        navigate({
                                            to: CategoryViewRoute.to,
                                            params: {
                                                id,
                                            },
                                            search: {
                                                page,
                                                size,
                                            },
                                        })
                                    },
                                }}
                            />
                        </Card>
                    )}
                </Await>
            </Suspense>
        </>
    )
}
