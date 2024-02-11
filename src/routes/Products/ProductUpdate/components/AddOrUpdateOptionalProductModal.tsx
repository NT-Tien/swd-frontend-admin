import { Optional_Create } from '@/api/option-product/Optional_Create'
import { queryOptional_GetByProductId } from '@/api/option-product/Optional_GetByProductId'
import { Optional_Update } from '@/api/option-product/Optional_Update'
import { queryClient } from '@/router'
import { useMutation } from '@tanstack/react-query'
import { Form, Input, Modal } from 'antd'
import { MessageInstance } from 'antd/es/message/interface'
import { ReactNode, useState } from 'react'

type AddOrUpdateOptionalProductModalProps = {
    children: ({ handleOpen }: { handleOpen: (props: handleOpenProps) => void }) => ReactNode
    messageApi: MessageInstance
}

type handleOpenProps = {
    productId: string
    optionalProduct?: FieldType & {
        id: string
    }
}

type FieldType = {
    name: string
    material: string
    price: number
    quantity: number
}

export default function AddOrUpdateOptionalProductModal({ children, messageApi }: AddOrUpdateOptionalProductModalProps) {
    const [open, setOpen] = useState(false)
    const [productId, setProductId] = useState<string>('')
    const [optionalProductId, setOptionalProductId] = useState<string>('')
    const [form] = Form.useForm()

    const addOptionalProductMutation = useMutation({
        mutationFn: Optional_Create,
        onSuccess: () => {
            messageApi.success('Optional product created successfully')
            queryClient.invalidateQueries({
                queryKey: queryOptional_GetByProductId({ productId: productId || '' }).queryKey,
            })
        },
        onError: () => {
            messageApi.error('Failed to create optional product')
        },
    })

    const updateOptionalProductMutation = useMutation({
        mutationFn: Optional_Update,
        onSuccess: () => {
            messageApi.success('Optional product updated successfully')
            queryClient.invalidateQueries({
                queryKey: queryOptional_GetByProductId({ productId: productId || '' }).queryKey,
            })
        },
        onError: () => {
            messageApi.error('Failed to update optional product')
        },
    })

    function handleOpen({ productId, optionalProduct }: handleOpenProps) {
        setOpen(true)
        setProductId(productId)

        if (optionalProduct) {
            setOptionalProductId(optionalProduct.id)
            form.setFieldsValue(optionalProduct)
        } else {
            form.resetFields()
        }
    }

    function handleClose() {
        setOpen(false)
        setProductId('')
        setOptionalProductId('')
        form.resetFields()
    }

    return (
        <>
            {children({ handleOpen })}
            <Modal open={open} onCancel={handleClose} onOk={() => form.submit()}>
                <Form
                    form={form}
                    onFinish={async values => {
                        if (optionalProductId) {
                            await updateOptionalProductMutation.mutateAsync({
                                id: optionalProductId,
                                payload: {
                                    ...values,
                                },
                            })
                        } else {
                            await addOptionalProductMutation.mutateAsync({
                                ...values,
                                product_id: productId,
                            })
                        }
                        form.resetFields()
                        setOpen(false)
                    }}
                    layout='horizontal'
                    labelCol={{
                        span: 4,
                    }}
                    style={{
                        marginTop: '10px',
                    }}
                >
                    <Form.Item<FieldType>
                        name={'name'}
                        label='Name'
                        rules={[
                            {
                                required: true,
                                message: 'This field is required.',
                            },
                            {
                                min: 2,
                                message: 'This field must be at least 2 characters long.',
                            },
                            {
                                max: 200,
                                message: 'This field must be at most 200 characters long.',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name='price'
                        label='Price'
                        rules={[
                            {
                                required: true,
                                message: 'This field is required.',
                            },
                            {
                                transform(value) {
                                    return Number(value)
                                },
                                type: 'number',
                                min: 0,
                                message: 'This field must be a positive number.',
                            },
                        ]}
                    >
                        <Input type='number' />
                    </Form.Item>
                    <Form.Item<FieldType>
                        name='material'
                        label='Material'
                        rules={[
                            {
                                required: true,
                                message: 'This field is required.',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name='quantity'
                        label='Quantity'
                        rules={[
                            {
                                required: true,
                                message: 'This field is required.',
                            },
                            {
                                transform(value) {
                                    return Number(value)
                                },
                                type: 'integer',
                                min: 0,
                                message: 'This field must be a positive number.',
                            },
                        ]}
                    >
                        <Input type='number' />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
