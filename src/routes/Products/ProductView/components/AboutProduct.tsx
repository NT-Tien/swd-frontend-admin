import { Product } from '@/lib/types/Product'
import OptionalProductsCard from '@/routes/Products/ProductView/components/OptionalProductsCard'
import ProductImagesView from '@/routes/Products/ProductView/components/ProductImagesView'
import ViewDescriptionModal from '@/routes/Products/ProductView/components/modal/ViewDescriptionModal'
import { Card, Col, Flex, Row, Typography } from 'antd'
import format from 'date-fns/format'

const DEFAULT_GUTTER_SIZE = 10

type AboutProductProps = {
    product: Product
}

export default function AboutProduct({ product }: AboutProductProps) {
    return (
        <ViewDescriptionModal>
            {({ handleOpen: handleOpenViewDescription }) => (
                <Flex gap={DEFAULT_GUTTER_SIZE} vertical>
                    <Row gutter={[DEFAULT_GUTTER_SIZE, DEFAULT_GUTTER_SIZE]}>
                        <Col
                            span={16}
                            style={{
                                height: '375px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: DEFAULT_GUTTER_SIZE,
                            }}
                        >
                            <Flex gap={DEFAULT_GUTTER_SIZE}>
                                <Card
                                    title='Activity'
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    This product is active
                                </Card>
                                <Card
                                    title='Created On'
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    {format(product.createdAt, 'MM/dd/yyyy')}
                                </Card>
                                <Card
                                    title='Updated On'
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    {format(product.updatedAt, 'MM/dd/yyyy')}
                                </Card>
                                <Card
                                    title='Category'
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    {product.category_id.name}
                                </Card>
                            </Flex>
                            <Card
                                title='Description'
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    flexGrow: 1,
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleOpenViewDescription(product.description)}
                            >
                                <Typography.Paragraph ellipsis={{ rows: 5, expandable: false }}>{product.description}</Typography.Paragraph>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <ProductImagesView imageLinks={product.images} productId={product.id} />
                        </Col>
                    </Row>
                    <Row gutter={[DEFAULT_GUTTER_SIZE, DEFAULT_GUTTER_SIZE]}>
                        <OptionalProductsCard productId={product.id} />
                    </Row>
                </Flex>
            )}
        </ViewDescriptionModal>
    )
}
