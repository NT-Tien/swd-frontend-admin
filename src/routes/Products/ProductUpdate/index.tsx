import { queryCategory_GetAll } from '@/api/category/Category_GetAll'
import { queryProduct_GetOne } from '@/api/product/Product_GetOne'
import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { useQuery } from '@tanstack/react-query'
import { Await, createRoute, defer } from '@tanstack/react-router'
import { Button, Card, Divider, Flex, Form, Input, Select, Switch, Upload, UploadFile } from 'antd'
import { Suspense, useState } from 'react'

const { Item: FormItem, List: FormList } = Form

type FieldType = {
    name: string
    description: string
    categoryId: string
    images: UploadFile<any>[]
    optional: {
        name: string
        material: string
        price: number
        quantity: number
    }[]
}

const component = function ProductUpdatePage() {
    const id = ProductUpdateRoute.useParams({
        select: data => data.id,
    })
    const categories = ProductUpdateRoute.useLoaderData({ select: data => data.categories })
    const {
        data: product,
        isSuccess,
        isLoading,
        isError,
        error,
    } = useQuery({
        ...queryProduct_GetOne({ id }),
        staleTime: Infinity,
        gcTime: 0,
        retry: 0,
    })

    const [form] = Form.useForm()
    const [isEditing, setIsEditing] = useState(false)
    function handleFinish() {}
    function handleFinishFailed() {}

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>{error.message}</div>
    }

    if (!isSuccess) return // product WILL exist after this line

    return (
        <>
            <Switch
                onChange={() => {
                    setIsEditing(!isEditing)
                }}
            />
            <Form<FieldType>
                form={form}
                name='create-product-form'
                initialValues={{
                    name: product.name,
                    description: product.description,
                    categoryId: product.category_id,
                    images: product.images,
                    optional: [],
                }}
                disabled={!isEditing}
                onFinish={handleFinish}
                onFinishFailed={handleFinishFailed}
                size='large'
                layout='vertical'
                requiredMark={false}
                colon={false}
            >
                <Card
                    size='default'
                    title='Main product Details'
                    style={{
                        marginBottom: 20,
                    }}
                >
                    <Flex gap={20}>
                        <FormItem<FieldType>
                            label='Name'
                            name='name'
                            rules={[{ required: true }, { min: 2 }, { max: 200 }]}
                            style={{
                                width: '50%',
                            }}
                        >
                            <Input placeholder='Mobile Phone' />
                        </FormItem>
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
                                        <>
                                            <Select
                                                showSearch
                                                placeholder='Select a Category'
                                                options={categories.data.data.map(cat => {
                                                    return {
                                                        value: cat?.id ?? '',
                                                        label: cat?.name ?? '',
                                                    }
                                                })}
                                                filterOption={(input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                }
                                                onChange={value => {
                                                    form.setFieldValue('categoryId', value)
                                                }}
                                            />
                                        </>
                                    )}
                                </Await>
                            </Suspense>
                        </FormItem>
                    </Flex>

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
                            defaultFileList={form.getFieldValue('images')}
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

                {/* <FormList name='optional'>
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
                                </FormList> */}

                <Button
                    htmlType='submit'
                    type='primary'
                    style={{
                        marginTop: 20,
                    }}
                >
                    Create
                </Button>
            </Form>
        </>
    )
}

export const ProductUpdateRoute = createRoute({
    path: '/products/$id/update',
    getParentRoute: () => DashboardLayoutRoute,
    parseParams: ({ id }) => {
        return {
            id: id ? String(id) : '',
        }
    },
    loader: async ({ context: { queryClient } }) => {
        const categories = queryClient.ensureQueryData(queryCategory_GetAll())

        return {
            categories: defer(categories),
        }
    },
    component,
})
