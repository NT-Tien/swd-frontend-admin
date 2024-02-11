import { Category_Create } from '@/api/category/Category_Create'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, Modal, message } from 'antd'
import { ReactNode, useState } from 'react'

const { Item: FormItem } = Form

type AddCategoryModalProps = {
    children: ({ handleOpen }: { handleOpen: () => void }) => ReactNode
}

type FieldType = {
    name: string
}

export default function AddCategoryModal({ children }: AddCategoryModalProps) {
    const [form] = Form.useForm<FieldType>()
    const [messageApi, contextHolder] = message.useMessage()
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()
    const createCategory = useMutation({
        mutationFn: Category_Create,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['categories'],
            })
            form.resetFields()
            messageApi.success('Successfully created category')
            setOpen(false)
        },
        onError(error) {
            devLog('Error creating category: ', error.message)
            messageApi.error('Something went wrong. Please try again.')
        },
    })

    async function handleOk() {
        await createCategory.mutateAsync({
            name: form.getFieldValue('name'),
        })
    }

    function handleCancel() {
        form.resetFields()
        setOpen(false)
    }

    function handleOpen() {
        setOpen(true)
    }

    return (
        <>
            {children({ handleOpen })}
            {contextHolder}
            <Modal
                title='Add Category'
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading
                footer={[
                    <Button onClick={handleCancel}>Cancel</Button>,
                    <Button form='add-category-form' htmlType='submit' color='primary' type='primary' loading={createCategory.isPending}>
                        Submit
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    name='add-category-form'
                    initialValues={{
                        name: '',
                    }}
                    autoComplete='off'
                    onFinish={handleOk}
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
                </Form>
            </Modal>
        </>
    )
}
