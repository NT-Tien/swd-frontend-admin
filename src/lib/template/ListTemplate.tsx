import { Plus } from '@phosphor-icons/react'
import { Button, Flex, Input, Table, Typography } from 'antd'

export default function ListTemplate() {
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
