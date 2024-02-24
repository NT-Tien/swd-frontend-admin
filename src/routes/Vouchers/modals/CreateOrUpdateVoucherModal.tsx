import { Voucher_Create } from '@/api/voucher/Voucher_Create'
import { Voucher_Update } from '@/api/voucher/Voucher_Update'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { Voucher } from '@/lib/types/Voucher'
import { queryClient } from '@/main'
import { generateRandomCode } from '@/routes/Vouchers/util/generateRandomCode'
import { RotateRightOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Button, DatePicker, Flex, Form, Input, Modal, Tooltip } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { ReactNode, useState } from 'react'

type FieldType = {
    code: string
    expired_date: Dayjs
    amount: number
    limit_total_max: number
    limit_total_min: number
    discount_percent: number
}
type CreateVoucherModalProps = {
    children: ({ handleOpen }: { handleOpen: (voucher?: Voucher) => void }) => ReactNode
}

export default function CreateOrUpdateVoucherModal({ children }: CreateVoucherModalProps) {
    const [open, setOpen] = useState(false)
    const [currentVoucher, setCurrentVoucher] = useState<Voucher | undefined>()
    const [form] = Form.useForm<FieldType>()
    const { messageApi } = useMessage()

    const createVoucherMutation = useMutation({
        mutationFn: Voucher_Create,
        onMutate: () => {
            messageApi.open({
                type: 'loading',
                content: 'Creating voucher...',
                key: 'creating-voucher',
            })
        },
        onSettled: () => {
            messageApi.destroy('creating-voucher')
        },
        onSuccess: () => {
            handleClose()
            setTimeout(() => {
                messageApi.success('Voucher created successfully.')
            }, 250)
            queryClient.invalidateQueries({
                queryKey: ['vouchers'],
            })
        },
        onError: error => {
            devLog('Error creating voucher: ', error.message)
            setTimeout(() => {
                messageApi.error('Error creating voucher.')
            }, 250)
        },
    })

    const updateVoucherMutation = useMutation({
        mutationFn: Voucher_Update,
        onMutate: () => {
            messageApi.open({
                type: 'loading',
                content: 'Updating voucher...',
                key: 'updating-voucher',
            })
        },
        onSettled: () => {
            messageApi.destroy('updating-voucher')
        },
        onSuccess: () => {
            handleClose()
            setTimeout(() => {
                messageApi.success('Voucher updated successfully.')
            }, 250)
            queryClient.invalidateQueries({
                queryKey: ['vouchers'],
            })
            queryClient.invalidateQueries({
                queryKey: ['vouchers', currentVoucher?.id],
            })
        },
        onError: error => {
            devLog('Error updating voucher: ', error.message)
            setTimeout(() => {
                messageApi.error('Error updating voucher.')
            }, 250)
        },
    })

    function handleOpen(voucher?: Voucher) {
        setOpen(true)
        setCurrentVoucher(voucher)
    }

    function handleClose() {
        setOpen(false)
        form.resetFields()
        setCurrentVoucher(undefined)
    }

    function handleOk() {
        form.submit()
    }

    function handleGenerateCode() {
        form.setFieldsValue({
            code: generateRandomCode(),
        })
    }

    return (
        <>
            {children({ handleOpen })}
            <Modal
                open={open}
                onCancel={handleClose}
                title={currentVoucher ? 'Update Voucher' : 'Create Voucher'}
                footer={[
                    <Button type='default' onClick={handleClose}>
                        Close
                    </Button>,
                    <Button type='primary' loading={createVoucherMutation.isPending} onClick={handleOk}>
                        {currentVoucher ? 'Update Voucher' : 'Create Voucher'}
                    </Button>,
                ]}
            >
                <Form<FieldType>
                    name='create-voucher-modal-form'
                    form={form}
                    disabled={createVoucherMutation.isPending}
                    layout='vertical'
                    initialValues={{
                        code: currentVoucher?.code ?? '',
                        expired_date: currentVoucher?.expired_date ? dayjs(currentVoucher?.expired_date) : undefined,
                        amount: currentVoucher?.amount ?? undefined,
                        limit_total_max: currentVoucher?.limit_total_max ?? undefined,
                        limit_total_min: currentVoucher?.limit_total_min ?? undefined,
                        discount_percent: currentVoucher?.discount_percent ?? undefined,
                    }}
                    onFinish={values => {
                        if (currentVoucher) {
                            updateVoucherMutation.mutate({
                                id: currentVoucher.id,
                                payload: {
                                    code: values.code,
                                    expired_date: values.expired_date.toDate().toUTCString(),
                                    amount: values.amount,
                                    limit_total_max: values.limit_total_max,
                                    limit_total_min: values.limit_total_min,
                                    discount_percent: values.discount_percent,
                                },
                            })
                        } else {
                            createVoucherMutation.mutate({
                                code: values.code,
                                expired_date: values.expired_date.toDate().toUTCString(),
                                amount: values.amount,
                                limit_total_max: values.limit_total_max,
                                limit_total_min: values.limit_total_min,
                                discount_percent: values.discount_percent,
                            })
                        }
                    }}
                >
                    <Flex gap={10} align='center'>
                        <Form.Item<FieldType>
                            name='code'
                            label='Voucher Code'
                            rules={[
                                {
                                    required: true,
                                    message: 'Voucher code is required',
                                },
                                {
                                    min: 3,
                                    message: 'Voucher code must be at least 6 characters',
                                },
                                {
                                    max: 20,
                                    message: 'Voucher code must be at most 20 characters',
                                },
                            ]}
                            style={{
                                width: '100%',
                            }}
                        >
                            <Input placeholder='e.g., NEWCOMER123' />
                        </Form.Item>
                        <Tooltip title='Generate random code'>
                            <Button
                                icon={<RotateRightOutlined />}
                                onClick={handleGenerateCode}
                                style={{
                                    transform: 'translateY(4px)',
                                }}
                            />
                        </Tooltip>
                    </Flex>
                    <Flex gap={10}>
                        <Form.Item<FieldType>
                            name='expired_date'
                            label='Expired Date'
                            rules={[
                                {
                                    required: true,
                                    message: 'Expired date is required',
                                },
                                {
                                    validator: (_, value) => {
                                        if (currentVoucher) return Promise.resolve()
                                        if (value < Date.now()) {
                                            return Promise.reject('Expired date must be in the future.')
                                        }
                                        return Promise.resolve()
                                    },
                                },
                            ]}
                        >
                            <DatePicker
                                disabledDate={currentDate => {
                                    if (currentDate.toDate() < new Date()) return true
                                    return false
                                }}
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            name='amount'
                            label='Discount Amount'
                            style={{
                                width: '100%',
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Discount amount is required',
                                },
                            ]}
                        >
                            <Input type='number' />
                        </Form.Item>
                    </Flex>
                    <Flex gap={10}>
                        <Form.Item<FieldType>
                            name='limit_total_max'
                            label='Maximum Discount'
                            rules={[
                                {
                                    required: true,
                                    message: 'Maximum discount is required',
                                },
                            ]}
                            style={{
                                width: '100%',
                            }}
                        >
                            <Input type='number' />
                        </Form.Item>
                        <Form.Item<FieldType>
                            name='limit_total_min'
                            label='Minimum Discount'
                            rules={[
                                {
                                    required: true,
                                    message: 'Minimum discount is required',
                                },
                            ]}
                            style={{
                                width: '100%',
                            }}
                        >
                            <Input type='number' />
                        </Form.Item>
                    </Flex>
                    <Form.Item<FieldType>
                        name='discount_percent'
                        label='Discount Percentage'
                        rules={[
                            {
                                required: true,
                                message: 'Minimum discount is required',
                            },
                        ]}
                        style={{
                            width: '100%',
                        }}
                    >
                        <Input type='number' prefix='%' />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
