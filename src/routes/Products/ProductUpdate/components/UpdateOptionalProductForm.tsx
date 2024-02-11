import { queryOptional_GetByProductId } from '@/api/option-product/Optional_GetByProductId'
import AddOrUpdateOptionalProductModal from '@/routes/Products/ProductUpdate/components/AddOrUpdateOptionalProductModal'
import DeleteOptionalProductModal from '@/routes/Products/ProductUpdate/components/DeleteOptionalProductModal'
import { Trash } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { Button, Dropdown, Table, message } from 'antd'

type UpdateOptionalProductFormProps = {
    productId: string
}

export default function UpdateOptionalProductForm({ productId }: UpdateOptionalProductFormProps) {
    const [messageApi, contextHolder] = message.useMessage()
    const { data: optionalProducts, isLoading, isError } = useQuery(queryOptional_GetByProductId({ productId }))

    if (isError) {
        return <div>Failed to load optional products</div>
    }

    return (
        <>
            {contextHolder}
            <div>
                <AddOrUpdateOptionalProductModal messageApi={messageApi}>
                    {({ handleOpen }) => (
                        <>
                            <Button onClick={() => handleOpen({ productId })}>Add Optional Product</Button>
                            <DeleteOptionalProductModal productId={productId}>
                                {({ handleOpen: openDeleteModal }) => (
                                    <Table
                                        loading={isLoading}
                                        tableLayout='auto'
                                        dataSource={optionalProducts}
                                        columns={[
                                            {
                                                title: 'No.',
                                                render: (_, __, index) => index + 1,
                                            },
                                            {
                                                title: 'Name',
                                                dataIndex: 'name',
                                                key: 'name',
                                            },
                                            {
                                                title: 'Material',
                                                dataIndex: 'material',
                                                key: 'material',
                                            },
                                            {
                                                title: 'Price',
                                                dataIndex: 'price',
                                                key: 'price',
                                            },
                                            {
                                                title: 'Quantity',
                                                dataIndex: 'quantity',
                                                key: 'quantity',
                                            },
                                            {
                                                title: 'Action',
                                                render: (_, record) => (
                                                    <Dropdown.Button
                                                        menu={{
                                                            items: [
                                                                {
                                                                    key: 'Delete',
                                                                    label: 'Delete',
                                                                    onClick: () => openDeleteModal(record.id),
                                                                    danger: true,
                                                                    icon: <Trash />,
                                                                },
                                                            ],
                                                        }}
                                                        onClick={() =>
                                                            handleOpen({
                                                                productId,
                                                                optionalProduct: record,
                                                            })
                                                        }
                                                    >
                                                        Update
                                                    </Dropdown.Button>
                                                ),
                                            },
                                        ]}
                                    />
                                )}
                            </DeleteOptionalProductModal>
                        </>
                    )}
                </AddOrUpdateOptionalProductModal>
            </div>
        </>
    )
}
