import { Plus } from '@phosphor-icons/react'
import { Button, Flex, Input, Table, Typography } from 'antd'

export default function ListTemplate() {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            name: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            name: 'Images',
            dataIndex: 'images',
            key: 'images',
        },
        {
            name: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
    ]

    return (
        <Flex vertical gap={20}>
            <Typography.Title level={2}>Product List</Typography.Title>
            <Flex justify='space-between'>
                <Input.Search
                    style={{
                        maxWidth: '300px',
                    }}
                />
                <Button type='primary' icon={<Plus />}>
                    Add Product
                </Button>
            </Flex>
            <Table />
        </Flex>
    )
}
