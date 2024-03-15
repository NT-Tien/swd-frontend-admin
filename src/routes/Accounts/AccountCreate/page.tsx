import { Account_Create } from '@/api/account/Account_Create'
import { Account_GetOneWithEmail } from '@/api/account/Account_GetOneWithEmail'
import Head from '@/common/components/Head'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { Role } from '@/lib/types/Account'
import { queryClient } from '@/main'
import { AccountCreateBreadcrumb } from '@/routes/Accounts/AccountCreate/breadcrumb'
import { AccountListRoute } from '@/routes/Accounts/AccountList'
import { AccountListBreadcrumb } from '@/routes/Accounts/AccountList/breadcrumb'
import { DashboardBreadcrumb } from '@/routes/Dashboard/DashboardBreadcrumb'
import { UploadSimple } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Breadcrumb, Button, Card, Flex, Form, Input, Select, Typography } from 'antd'

type FieldType = {
    email: string
    password: string
    confirmPassword: string
    role: string
}

export default function AccountCreatePage() {
    const [form] = Form.useForm()
    const { messageApi } = useMessage()
    const navigate = useNavigate()
    const createAccountMutation = useMutation({
        mutationFn: Account_Create,
        onMutate: () => {
            messageApi.open({
                type: 'loading',
                content: 'Creating account...',
                key: 'creating-account',
            })
        },
        onSettled: () => {
            messageApi.destroy('creating-account')
        },
        onSuccess: () => {
            form.resetFields()
            setTimeout(() => {
                messageApi.success(
                    <span>
                        Account created successfully.
                        <Button
                            onClick={() => navigate({ to: AccountListRoute.to, search: { page: 1, size: 8 } })}
                            style={{
                                marginLeft: '10px',
                            }}
                        >
                            View
                        </Button>
                    </span>,
                )
            }, 250)
            queryClient.invalidateQueries({
                queryKey: ['accounts'],
            })
        },
        onError: error => {
            devLog('Error creating account: ', error.message)
            setTimeout(() => {
                messageApi.error('Error creating account.')
            }, 250)
        },
    })

    return (
        <>
            <Head title='Create Account' />
            <Breadcrumb
                style={{
                    marginBottom: '5px',
                }}
                items={[DashboardBreadcrumb(), AccountListBreadcrumb(), AccountCreateBreadcrumb({ isCurrent: true })]}
            />
            <Flex vertical>
                <Flex justify='space-between'>
                    <Typography.Title level={2}>Create a new Account</Typography.Title>
                    <Button type='primary' icon={<UploadSimple size={14} />}>
                        Import from JSON
                    </Button>
                </Flex>
                <Card size='default' title='Account Details'>
                    <Form
                        name='create-account-modal-form'
                        form={form}
                        initialValues={{
                            email: '',
                            password: '',
                            confirmPassword: '',
                            role: Role.USER,
                        }}
                        disabled={createAccountMutation.isPending}
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
                                        try {
                                            const exists = await Account_GetOneWithEmail({ email: value })
                                            console.log('SUCCESS')
                                            if (exists.data === null) {
                                                return Promise.resolve()
                                            } else {
                                                return Promise.reject('Email already exists')
                                            }
                                        } catch (error) {
                                            console.log('ERRORED')
                                            return Promise.resolve()
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
                        <Form.Item>
                            <Button type='primary' htmlType='submit' loading={createAccountMutation.isPending}>
                                Create Account
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Flex>
        </>
    )
}
