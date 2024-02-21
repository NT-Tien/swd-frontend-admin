import { ProductOptional } from '@/lib/types/ProductOptional'
import getColumnSearchProps from '@/lib/util/getColumnSearchProps'
import { Card, Flex, Table, theme } from 'antd'
import dayjs from 'dayjs'

const { useToken } = theme

type OptionalProductsCardProps = {
    optionalProducts: ProductOptional[]
}

export default function OptionalProductsCard({ optionalProducts }: OptionalProductsCardProps) {
    const { token } = useToken()

    const searchColumnProps = getColumnSearchProps<ProductOptional>()

    return (
        <Card
            title={
                <Flex justify='space-between'>
                    <span>Optional Products</span>
                    <span
                        style={{
                            fontSize: token.fontSizeLG,
                        }}
                    >
                        There {optionalProducts.length !== 1 ? 'are' : 'is'} {optionalProducts.length} optional product
                        {optionalProducts.length !== 1 && 's'}
                    </span>
                </Flex>
            }
            style={{
                width: '100%',
            }}
        >
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
                        render: value => <div>{dayjs(value).format('DD-MM-YYYY')}</div>,
                        sorter: (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
                    },
                    {
                        title: 'Updated',
                        dataIndex: 'updatedAt',
                        key: 'updatedAt',
                        render: value => <div>{dayjs(value).format('DD-MM-YYYY')}</div>,
                        sorter: (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime(),
                    },
                ]}
            />
        </Card>
    )
}
