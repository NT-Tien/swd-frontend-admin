import { Category_Create } from '@/api/category/Category_Create'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { AuthDashboardLayoutRoute } from '@/layouts/AuthenticatedLayout'
import { queryClient } from '@/main'
import { CategoryListRoute } from '@/routes/Categories/CategoryList'
import { UploadSimple } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { createRoute, useNavigate } from '@tanstack/react-router'
import { Button, Card, Flex, Form, Input, Typography } from 'antd'

const { Item: FormItem } = Form

type FieldType = {
    name: string
}

const component = function CategoryCreatePage() {
    const [form] = Form.useForm()
    const { messageApi } = useMessage()
    const navigate = useNavigate()
    const createCategory = useMutation({
        mutationFn: Category_Create,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['categories'],
            })
            form.resetFields()
            messageApi.success('Successfully created category')
        },
        onError(error) {
            devLog('Error creating category: ', error.message)
            messageApi.error('Something went wrong. Please try again.')
        },
    })

    async function handleFinish() {
        await createCategory.mutateAsync({
            name: form.getFieldValue('name'),
        })
        navigate({
            to: CategoryListRoute.to,
        })
    }

    return (
        <Flex vertical gap={20}>
            <Flex justify='space-between'>
                <Typography.Title level={2}>Create a new Product</Typography.Title>
                <Button
                    type='primary'
                    icon={<UploadSimple size={14} />}
                    onClick={() => {
                        //TODO
                        alert('Not implemented yet')
                    }}
                >
                    Import from JSON
                </Button>
            </Flex>
            <Card size='default' title='Category Details'>
                <Form
                    form={form}
                    name='add-category-form'
                    initialValues={{
                        name: '',
                    }}
                    autoComplete='off'
                    onFinish={handleFinish}
                >
                    <FormItem<FieldType>
                        name='name'
                        label='Name'
                        rules={[
                            {
                                required: true,
                                max: 200,
                                min: 1,
                            },
                            // TODO Check if name already exists
                        ]}
                    >
                        <Input disabled={createCategory.isPending} />
                    </FormItem>
                    <Button form='add-category-form' htmlType='submit' color='primary' type='primary' loading={createCategory.isPending}>
                        Submit
                    </Button>
                </Form>
            </Card>
        </Flex>
    )
}

export const CategoryCreateRoute = createRoute({
    path: '/categories/create',
    getParentRoute: () => AuthDashboardLayoutRoute,
    component,
})
