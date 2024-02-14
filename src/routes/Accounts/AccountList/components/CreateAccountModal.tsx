import { Account_Create } from '@/api/account/Account_Create'
import { Acocunt_GetOneWithEmail } from '@/api/account/Account_GetOneWithEmail'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { Role } from '@/lib/types/Account'
import { queryClient } from '@/main'
import { useMutation } from '@tanstack/react-query'
import { Card, Form, Input, Modal, Select } from 'antd'
import { ReactNode, useState } from 'react'

type FieldType = {
    email: string
    password: string
    confirmPassword: string
    role: string
}

type CreateAccountModalProps = {
    children: ({ handleOpen }: { handleOpen: () => void }) => ReactNode
}

export default function CreateAccountModal({ children }: CreateAccountModalProps) {
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm()
    const { messageApi } = useMessage()

    const createAccountMutation = useMutation({
        mutationFn: Account_Create,
        onSuccess: () => {
            messageApi.success('Account created successfully.')
            queryClient.invalidateQueries({
                queryKey: ['accounts'],
            })
            setOpen(false)
        },
        onError: () => {
            messageApi.error('Error creating account.')
        },
    })

    function handleOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
        form.resetFields()
    }

    function handleOk() {
        form.submit()
    }

    return (
        <>
            {children({ handleOpen })}
            <Modal open={open} onCancel={handleClose} onOk={handleOk} title='Create Account'>
                <Card
                    style={{
                        marginBlock: '10px',
                    }}
                >
                    <strong>Create a new Account</strong> with entered Role. The user will receive <strong>an email</strong> containing a
                    link to login and their password.
                </Card>
                <Form
                    name='create-account-modal-form'
                    form={form}
                    initialValues={{
                        email: '',
                        password: '',
                        confirmPassword: '',
                        role: Role.USER,
                    }}
                    layout='vertical'
                    onFinish={values => {
                        createAccountMutation.mutate({
                            email: values.email,
                            password: values.password,
                            role: values.role,
                        })
                    }}
                >
                    <Form.Item<FieldType>
                        name='email'
                        label='Email'
                        validateDebounce={500}
                        hasFeedback
                        validateFirst
                        rules={[
                            {
                                required: true,
                                type: 'email',
                            },
                            {
                                validator: async (_, value) => {
                                    const exists = await Acocunt_GetOneWithEmail({ email: value })
                                    if (exists.data === null) {
                                        return Promise.resolve()
                                    } else {
                                        return Promise.reject('Email already exists')
                                    }
                                },
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        name='password'
                        label='Password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input type='password' />
                    </Form.Item>
                    <Form.Item<FieldType>
                        name='confirmPassword'
                        label='Confirm Password'
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'))
                                },
                            }),
                        ]}
                    >
                        <Input type='password' />
                    </Form.Item>
                    <Form.Item<FieldType>
                        name='role'
                        label='Role'
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            options={Object.values(Role).map(role => ({
                                label: (
                                    <span
                                        style={{
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        {role}
                                    </span>
                                ),
                                value: role,
                            }))}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
