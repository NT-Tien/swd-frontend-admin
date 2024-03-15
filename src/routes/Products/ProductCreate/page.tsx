import { Optional_Create_Req } from '@/api/option-product/Optional_Create'
import { Product_GetByName } from '@/api/product/Product_GetByName'
import Head from '@/common/components/Head'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { Category } from '@/lib/types/Category'
import useRefresh from '@/lib/util/useRefresh'
import { queryClient } from '@/main'
import { DashboardBreadcrumb } from '@/routes/Dashboard/DashboardBreadcrumb'
import { ProductCreateRoute } from '@/routes/Products/ProductCreate'
import { ProductCreateBreadcrumb } from '@/routes/Products/ProductCreate/breadcrumb'
import { createProductWrapper } from '@/routes/Products/ProductCreate/util/createProductWrapper'
import { ProductListBreadcrumb } from '@/routes/Products/ProductList/breadcrumb'
import { ProductViewRoute } from '@/routes/Products/ProductView'
import { PlusCircle, X } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { Await, useNavigate } from '@tanstack/react-router'
import { Breadcrumb, Button, Card, Divider, Flex, Form, Input, Select, Tooltip, Typography, Upload, UploadFile } from 'antd'
import { Suspense } from 'react'

const { Item: FormItem, List: FormList } = Form

type FieldType = {
    name: string
    description: string
    categoryId: string
    images: UploadFile<any>[]
    optional: Optional_Create_Req[]
}

export default function ProductCreatePage() {
    const { messageApi } = useMessage()
    const navigate = useNavigate()
    const [form] = Form.useForm<FieldType>()
    const categories = ProductCreateRoute.useLoaderData({
        select: data => data.categories,
    })
    const refresh = useRefresh()
    const createProductMutation = useMutation({
        mutationFn: createProductWrapper,
        onSuccess(data) {
            form.resetFields()
            setTimeout(() => messageApi.success('Product created successfully.'), 250)
            queryClient.invalidateQueries({
                queryKey: ['products'],
            })
            navigate({
                to: ProductViewRoute.to,
                params: {
                    id: data.product.data.id,
                },
                search: {
                    editing: false,
                },
            })
        },
        onError(error) {
            devLog(error)
            setTimeout(() => messageApi.error('An error occurred while creating product. Please try again.'), 250)
        },
        onMutate: () => {
            messageApi.open({
                type: 'loading',
                content: 'Creating Product...',
                key: 'creating-product',
            })
        },
        onSettled: () => {
            messageApi.destroy('creating-product')
        },
    })

    return (
        <>
            <Head title='Create Product' />
            <div>
                <Breadcrumb
                    style={{
                        marginBottom: '5px',
                    }}
                    items={[DashboardBreadcrumb(), ProductListBreadcrumb(), ProductCreateBreadcrumb({ isCurrent: true })]}
                />
                <Flex
                    justify='space-between'
                    style={{
                        marginBottom: '20px',
                    }}
                >
                    <Typography.Title level={2}>Create a new Product</Typography.Title>
                    {/* <Button
                        type='primary'
                        icon={<UploadSimple size={14} />}
                        onClick={() => {
                            //TODO
                            alert('Not implemented yet')
                        }}
                    >
                        Import from JSON
                    </Button> */}
                </Flex>
                <Form<FieldType>
                    form={form}
                    name='create-product-form'
                    initialValues={{
                        images: [],
                        optional: [{}],
                    }}
                    onFinish={values => {
                        createProductMutation.mutate({
                            name: values.name,
                            description: values.description,
                            category_id: values.categoryId,
                            images: values.images,
                            optionals: values.optional,
                        })
                    }}
                    size='large'
                    layout='vertical'
                    requiredMark={false}
                    colon={false}
                    disabled={createProductMutation.isPending}
                >
                    <Card
                        size='default'
                        title='Main product Details'
                        style={{
                            marginBottom: 20,
                        }}
                    >
                        <Flex gap={20}>
                            {/* NAME INPUT */}
                            <FormItem<FieldType>
                                label='Name'
                                name='name'
                                hasFeedback
                                rules={[
                                    { required: true },
                                    { min: 2 },
                                    { max: 200 },
                                    {
                                        async validator(_, value) {
                                            const alreadyExists = await Product_GetByName({ name: value })
                                            if (alreadyExists.data !== null) {
                                                return Promise.reject('Product with this name already exists.')
                                            } else {
                                                return Promise.resolve()
                                            }
                                        },
                                    },
                                ]}
                                style={{
                                    width: '50%',
                                }}
                                validateDebounce={2000}
                            >
                                <Input placeholder='Mobile Phone' />
                            </FormItem>

                            {/* CATEGORY INPUT */}
                            <FormItem<FieldType>
                                label='Category'
                                name='categoryId'
                                style={{
                                    width: '50%',
                                }}
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Suspense fallback={<Input disabled />}>
                                    <Await promise={categories}>
                                        {categories => (
                                            <Select
                                                showSearch
                                                placeholder='Select a Category'
                                                options={categories.data.data.map((cat: Category) => ({
                                                    value: cat.id ?? '',
                                                    label: cat.name ?? '',
                                                }))}
                                                filterOption={(input, option) =>
                                                    ((option?.label as string) ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                onChange={value => {
                                                    form.setFieldValue('categoryId', value)
                                                }}
                                            />
                                        )}
                                    </Await>
                                </Suspense>
                            </FormItem>
                        </Flex>

                        {/* IMAGES INPUT */}
                        <FormItem<FieldType>
                            name='images'
                            label='Images'
                            rules={[{ required: true }]}
                            getValueFromEvent={e => {
                                if (Array.isArray(e)) return e

                                return e && e.fileList
                            }}
                        >
                            <Upload.Dragger
                                name='upload'
                                multiple
                                maxCount={3}
                                accept='image/*'
                                fileList={form.getFieldValue('images')}
                                listType='picture'
                                showUploadList
                                beforeUpload={() => false}
                                onRemove={file => {
                                    form.setFieldValue(
                                        'images',
                                        form.getFieldValue('images').filter((f: any) => f.uid !== file.uid),
                                    )
                                }}
                                // onPreview={file => handleOpen(file)}
                                onChange={info => {
                                    form.setFieldValue('images', info.fileList)
                                    refresh()
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        rowGap: 8,
                                    }}
                                >
                                    <p
                                        style={{
                                            fontSize: '1.2rem',
                                            fontWeight: 500,
                                        }}
                                    >
                                        Drag & drop product image here
                                    </p>
                                    <Divider>OR</Divider>
                                    <Button>Select Files</Button>
                                </div>
                            </Upload.Dragger>
                        </FormItem>

                        <FormItem<FieldType> label='Description' name='description' rules={[{ required: true }]}>
                            <Input.TextArea rows={5} />
                        </FormItem>
                    </Card>

                    <FormList name='optional'>
                        {(fields, { add, remove }) => (
                            <Card
                                title='Optional Products'
                                size='default'
                                extra={
                                    <Flex gap={20} align='center'>
                                        <div>
                                            You have added{' '}
                                            <strong>
                                                {fields.length} item
                                                {fields.length !== 1 && 's'}
                                            </strong>
                                            .
                                        </div>
                                        <Button
                                            size='middle'
                                            disabled={fields.length === 5}
                                            icon={<PlusCircle size={12} weight='bold' />}
                                            onClick={() => add()}
                                        >
                                            Add Item
                                        </Button>
                                    </Flex>
                                }
                            >
                                <div
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                        gap: 20,
                                    }}
                                >
                                    {fields.map(field => (
                                        <Card
                                            type='inner'
                                            size='small'
                                            title={`Item ${field.name + 1}`}
                                            key={field.key}
                                            extra={
                                                fields.length !== 1 ? (
                                                    <Button
                                                        ghost
                                                        shape='round'
                                                        type='primary'
                                                        onClick={() => remove(field.name)}
                                                        icon={
                                                            <X
                                                                style={{
                                                                    color: 'black',
                                                                }}
                                                            />
                                                        }
                                                        style={{
                                                            padding: '2px',
                                                            height: 'min-content',
                                                            border: 'none',
                                                        }}
                                                    ></Button>
                                                ) : (
                                                    <Tooltip title='You must have at least ONE variant.'>
                                                        <Button
                                                            disabled
                                                            ghost
                                                            shape='round'
                                                            type='primary'
                                                            icon={
                                                                <X
                                                                    style={{
                                                                        color: 'black',
                                                                    }}
                                                                />
                                                            }
                                                            style={{
                                                                padding: '2px',
                                                                height: 'min-content',
                                                                border: 'none',
                                                            }}
                                                        ></Button>
                                                    </Tooltip>
                                                )
                                            }
                                        >
                                            <Flex justify='between' gap={10}>
                                                <FormItem
                                                    name={[field.name, 'name']}
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
                                                    style={{
                                                        width: '65%',
                                                    }}
                                                >
                                                    <Input />
                                                </FormItem>

                                                <FormItem
                                                    name={[field.name, 'price']}
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
                                                    style={{
                                                        width: '45%',
                                                    }}
                                                >
                                                    <Input type='number' />
                                                </FormItem>
                                            </Flex>

                                            <Flex justify='between' gap={10}>
                                                <FormItem
                                                    name={[field.name, 'material']}
                                                    label='Material'
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'This field is required.',
                                                        },
                                                    ]}
                                                    style={{
                                                        width: '65%',
                                                    }}
                                                >
                                                    <Input />
                                                </FormItem>

                                                <FormItem
                                                    name={[field.name, 'quantity']}
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
                                                    style={{
                                                        width: '45%',
                                                    }}
                                                >
                                                    <Input type='number' />
                                                </FormItem>
                                            </Flex>
                                        </Card>
                                    ))}

                                    <Button
                                        type='dashed'
                                        onClick={() => add()}
                                        disabled={fields.length === 5}
                                        block
                                        style={{
                                            height: '100%',
                                            minHeight: '286.769px',
                                            width: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: 8,
                                        }}
                                    >
                                        <PlusCircle size={32} weight='bold' />
                                        <h5
                                            style={{
                                                fontSize: '1.2rem',
                                                fontWeight: 500,
                                            }}
                                        >
                                            Add Item
                                        </h5>
                                    </Button>
                                </div>
                            </Card>
                        )}
                    </FormList>

                    <Button
                        htmlType='submit'
                        type='primary'
                        style={{
                            marginTop: 20,
                        }}
                        loading={createProductMutation.isPending}
                    >
                        Create
                    </Button>
                </Form>
            </div>
        </>
    )
}
