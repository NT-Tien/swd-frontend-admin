import { Product } from '@/lib/types/Product'
import GetColumnSearchProps from '@/lib/util/getColumnSearchProps'
import { CategoryViewRoute } from '@/routes/Categories/CategoryView'
import { ProductViewRoute } from '@/routes/Products/ProductView'
import { Await, useNavigate } from '@tanstack/react-router'
import { Button, Card, Descriptions, Table, Typography } from 'antd'
import dayjs from 'dayjs'
import { Suspense } from 'react'

const size = 5

export default function CategoryViewPage() {
    const navigate = useNavigate()
    const { category, products } = CategoryViewRoute.useLoaderData()
    const id = CategoryViewRoute.useParams({ select: data => data.id })

    const searchColumnProps = GetColumnSearchProps<Product>()

    return (
        <div>
            <Suspense fallback={<Card loading />}>
                <Await promise={category}>
                    {({ data: category }) => (
                        <>
                            <Typography.Title level={2}>{category.name}</Typography.Title>
                            <Descriptions
                                items={[
                                    {
                                        key: 'id',
                                        label: 'ID',
                                        children: category.id,
                                    },
                                    {
                                        key: 'name',
                                        label: 'Name',
                                        children: category.name,
                                    },
                                    {
                                        key: 'createdAt',
                                        label: 'Created At',
                                        children: dayjs(category.createdAt).format('DD-MM-YYYY'),
                                    },
                                    {
                                        key: 'updatedAt',
                                        label: 'Updated At',
                                        children: dayjs(category.updatedAt).format('DD-MM-YYYY'),
                                    },
                                    {
                                        key: 'isDeleted',
                                        label: 'Deleted',
                                        children: category.deletedAt ? dayjs(category.deletedAt).format('DD-MM-YYYY') : 'No',
                                    },
                                ]}
                            />
                        </>
                    )}
                </Await>
            </Suspense>
            <Card
                title='Products in this category'
                style={{
                    marginTop: '10px',
                }}
            >
                <Suspense fallback={<Card loading />}>
                    <Await promise={products}>
                        {({ data: products }) => (
                            <Table
                                dataSource={products?.data ?? []}
                                columns={[
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
                                    pageSize: size,
                                    total: products?.total ?? 0,
                                    onChange(page) {
                                        navigate({
                                            to: CategoryViewRoute.to,
                                            params: {
                                                id,
                                            },
                                            search: {
                                                page,
                                            },
                                        })
                                    },
                                }}
                            />
                        )}
                    </Await>
                </Suspense>
            </Card>
        </div>
    )
}
