import { queryOptional_GetByProductId } from '@/api/option-product/Optional_GetByProductId'
import { ProductOptional } from '@/lib/types/ProductOptional'
import getColumnSearchProps from '@/lib/util/getColumnSearchProps'
import { useQuery } from '@tanstack/react-query'
import { Card, Flex, Spin, Table, theme } from 'antd'
import { format } from 'date-fns'

const { useToken } = theme

type OptionalProductsCardProps = {
    productId: string
}

export default function OptionalProductsCard({ productId }: OptionalProductsCardProps) {
    const { data: optionalProducts, isLoading, isError, isSuccess } = useQuery(queryOptional_GetByProductId({ productId }))
    const { token } = useToken()

    if (isError) {
        return <p>Error fetching optional products</p>
    }

    const searchColumnProps = getColumnSearchProps<ProductOptional>()

    return (
        <Card
            title={
                <Flex justify='space-between'>
                    <span>Optional Products</span>
                    {optionalProducts && (
                        <span
                            style={{
                                fontSize: token.fontSizeLG,
                            }}
                        >
                            There {optionalProducts.length !== 1 ? 'are' : 'is'} {optionalProducts.length} optional product
                            {optionalProducts.length !== 1 && 's'}
                        </span>
                    )}
                </Flex>
            }
            style={{
                width: '100%',
            }}
        >
            {isLoading && <Spin />}
            {isSuccess && (
                <Table
                    pagination={false}
                    dataSource={optionalProducts.map(op => ({
                        ...op,
                        key: op.id,
                    }))}
                    columns={[
                        {
                            title: 'Name',
                            dataIndex: 'name',
                            key: 'name',
                            sorter: (a, b) => a.name.localeCompare(b.name),
                            defaultSortOrder: 'ascend',
                            ...searchColumnProps('name'),
                        },
                        {
                            title: 'Price',
                            dataIndex: 'price',
                            key: 'price',
                            sorter: (a, b) => a.price - b.price,
                            ...searchColumnProps('price'),
                        },
                        {
                            title: 'Quantity',
                            dataIndex: 'quantity',
                            key: 'quantity',
                            sorter: (a, b) => a.quantity - b.quantity,
                            filters: [
                                {
                                    text: 'Out of Stock',
                                    value: 0,
                                },
                            ],
                            onFilter: (value, record) => record.quantity === value,
                        },
                        {
                            title: 'Material',
                            dataIndex: 'material',
                            key: 'material',
                            sorter: (a, b) => a.material.localeCompare(b.material),
                            filters: [...new Set(optionalProducts.map(op => op.material))].map(material => ({
                                text: material,
                                value: material,
                            })),
                            onFilter: (value, record) => record.material === value,
                        },
                        {
                            title: 'Created',
                            dataIndex: 'createdAt',
                            key: 'createdAt',
                            render: value => <div>{format(value, 'dd/MM/yyyy')}</div>,
                            sorter: (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
                        },
                        {
                            title: 'Updated',
                            dataIndex: 'updatedAt',
                            key: 'updatedAt',
                            render: value => <div>{format(value, 'dd/MM/yyyy')}</div>,
                            sorter: (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime(),
                        },
                    ]}
                />
            )}
        </Card>
    )
}
