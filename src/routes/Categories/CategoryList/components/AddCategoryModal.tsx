import { Category_Create } from '@/api/category/Category_Create'
import env from '@/env'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, Modal, message } from 'antd'
import { Dispatch, SetStateAction } from 'react'

const { Item: FormItem } = Form

type AddCategoryModalProps = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    names: string[]
}

type FieldType = {
    name: string
}

export default function AddCategoryModal({
    open,
    setOpen,
    names,
}: AddCategoryModalProps) {
    const [form] = Form.useForm<FieldType>()
    const [messageApi, contextHolder] = message.useMessage()
    const queryClient = useQueryClient()
    const createCategory = useMutation({
        mutationFn: Category_Create,
    })

    async function handleOk() {
        await createCategory.mutateAsync({
            name: form.getFieldValue('name'),
        })

        queryClient.invalidateQueries({
            queryKey: ['categories'],
        })

        if (createCategory.isSuccess) {
            setOpen(false)
            form.resetFields()
            messageApi.success('Successfully created category')
        }

        if (createCategory.isError) {
            // TODO Remove dev code
            if (env.APP_MODE === 'development') {
                messageApi.error(
                    createCategory.failureReason?.message ??
                        createCategory.error.message,
                )
            } else {
                messageApi.error('Something went wrong. Please try again.')
            }
        }
    }

    function handleCancel() {
        form.resetFields()
        setOpen(false)
    }

    return (
        <>
            {contextHolder}
            <Modal
                title='Add Category'
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading
                footer={[
                    <Button key='cancel' onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                        form='add-category-form'
                        key='submit'
                        htmlType='submit'
                        color='primary'
                        type='primary'
                        loading={createCategory.isPending}
                    >
                        Submit
                    </Button>,
                ]}
            >
                <Form<FieldType>
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
