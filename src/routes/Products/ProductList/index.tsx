import { Product_GetAll } from '@/api/product/Product_GetAll'
import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { Category } from '@/lib/types/Category'
import { Product } from '@/lib/types/Product'
import GetColumnSearchProps from '@/lib/util/getColumnSearchProps'
import { queryClient } from '@/router'
import { ProductCreateRoute } from '@/routes/Products/ProductCreate'
import DeleteProductModal from '@/routes/Products/ProductList/components/DeleteProductModal'
import { ProductViewRoute } from '@/routes/Products/ProductView'
import { ArrowsClockwise, Funnel, Pencil, Plus, Trash } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { createRoute, useNavigate } from '@tanstack/react-router'
import { Button, Dropdown, Flex, Input, Table, Typography } from 'antd'
import format from 'date-fns/format'

const component = function ProductListPage() {
    const navigate = useNavigate()

    const page = ProductListRoute.useSearch({
        select: data => data.page,
    })

    const {
        data: products,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['products', page],
        queryFn: () =>
            Product_GetAll({
                page,
                size: 5,
            }),
        select(res) {
            return res.data
        },
    })

    const searchColumnProps = GetColumnSearchProps<Product>()

    if (isError) {
        return <div>A fatal error has occurred.</div>
    }

    return (
        <DeleteProductModal>
            {({ handleOpen }) => (
                <Flex vertical gap={20}>
                    <Typography.Title level={2}>
                        Product List{' '}
                        <Button
                            size='small'
                            icon={<ArrowsClockwise size={16} weight='fill' />}
                            onClick={() => {
                                queryClient.invalidateQueries({
                                    queryKey: ['products'],
                                })
                            }}
                        ></Button>
                    </Typography.Title>
                    <Flex justify='space-between'>
                        <Flex gap={5}>
                            <Input.Search
                                style={{
                                    maxWidth: '300px',
                                }}
                            />
                            <Button>
                                <Funnel size={16} weight='fill' />
                            </Button>
                        </Flex>
                        <Flex gap={5}>
                            <Button
                                type='primary'
                                icon={<Plus />}
                                onClick={() =>
                                    navigate({
                                        to: ProductCreateRoute.to,
                                    })
                                }
                            >
                                Add Product
                            </Button>
                        </Flex>
                    </Flex>
                    <Table
                        dataSource={products?.data ?? []}
                        columns={[
                            {
                                title: 'No.',
                                render: (_, __, index) => index + 1,
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
                                render: value => format(new Date(value), 'dd/MM/yyyy'),
                                sorter: (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
                                sortDirections: ['ascend', 'descend'],
                                defaultSortOrder: 'descend',
                            },
                            {
                                title: 'Updated At',
                                dataIndex: 'updatedAt',
                                key: 'updatedAt',
                                render: value => format(new Date(value), 'dd/MM/yyyy'),
                                sorter: (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime(),
                                sortDirections: ['ascend', 'descend'],
                            },
                            {
                                title: 'Category',
                                dataIndex: 'category_id',
                                key: 'category_id',
                                render: (value: Category) => {
                                    return value.name
                                },
                            },
                            {
                                title: 'Description',
                                dataIndex: 'description',
                                key: 'description',
                                render: (value: string) => {
                                    return value.slice(0, 70) + (value.length > 70 ? '...' : '')
                                },
                                ...searchColumnProps('description'),
                            },
                            {
                                title: 'Deleted',
                                dataIndex: 'deletedAt',
                                key: 'deletedAt',
                                render: value => {
                                    if (value === null) return ''
                                    else return format(new Date(value), 'dd/MM/yyyy')
                                },
                                sorter: (a, b) => {
                                    if (a.deletedAt === null) return -1
                                    if (b.deletedAt === null) return 1
                                    return a.deletedAt.getTime() - b.deletedAt.getTime()
                                },
                                sortDirections: ['ascend', 'descend'],
                            },
                            {
                                title: 'Action',
                                dataIndex: 'action',
                                key: 'action',
                                render: (_, record) => (
                                    <Dropdown.Button
                                        menu={{
                                            items: [
                                                {
                                                    label: 'Update',
                                                    key: '1',
                                                    icon: <Pencil />,
                                                    style: {
                                                        marginBottom: '5px',
                                                    },
                                                    onClick: () => {},
                                                },
                                                {
                                                    label: 'Delete',
                                                    key: '2',
                                                    icon: <Trash />,
                                                    danger: true,
                                                    onClick: () => handleOpen(record.id),
                                                },
                                            ],
                                        }}
                                        onClick={() => {
                                            navigate({
                                                to: ProductViewRoute.to,
                                                params: {
                                                    id: record.id,
                                                },
                                            })
                                        }}
                                    >
                                        View
                                    </Dropdown.Button>
                                ),
                            },
                        ]}
                        pagination={{
                            pageSize: 8,
                        }}
                        loading={isLoading}
                    />
                </Flex>
            )}
        </DeleteProductModal>
    )
}

type ProductListSearch = {
    page: number
}

export const ProductListRoute = createRoute({
    path: '/products',
    component,
    validateSearch: (search: Record<string, unknown>): ProductListSearch => {
        return {
            page: search.page ? Number(search.page) : 1,
        }
    },
    getParentRoute: () => DashboardLayoutRoute,
})
