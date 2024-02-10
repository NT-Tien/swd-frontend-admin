import ViewMoreImagesModal from '@/routes/Products/ProductView/components/modal/ViewMoreImagesModal'
import { GetImages } from '@/routes/Products/ProductView/util/GetImages'
import { Plus } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { Button, Card, CardProps, Image, Skeleton } from 'antd'
import { Fragment } from 'react'

type ProductImagesViewProps = {
    imageLinks: string[]
    productId: string
} & CardProps

export default function ProductImagesView({ imageLinks, ...otherProps }: ProductImagesViewProps) {
    const {
        data: images,
        isLoading,
        isError,
        isSuccess,
    } = useQuery({
        queryKey: ['file', imageLinks],
        queryFn: () => GetImages(imageLinks),
        select: data => data,
        refetchOnWindowFocus: false,
    })

    if (isError) {
        return <div>Error fetching images</div>
    }

    return (
        <ViewMoreImagesModal>
            {({ handleOpen: handleOpenViewMoreImages }) => (
                <Card
                    title='Product Images'
                    style={{
                        width: '100%',
                    }}
                    {...otherProps}
                >
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 2fr)',
                            gap: '10px',
                        }}
                    >
                        {isLoading
                            ? new Array(6).fill(null).map((_, index) => (
                                  <Skeleton.Image
                                      key={`${index}-loading`}
                                      style={{
                                          height: '100%',
                                          width: '100%',
                                          aspectRatio: '1/1',
                                          borderRadius: '5px',
                                      }}
                                  ></Skeleton.Image>
                              ))
                            : isSuccess && (
                                  <Fragment>
                                      {images.slice(0, 5).map((img, index) => (
                                          <Fragment key={index}>
                                              <Image
                                                  src={img}
                                                  preview
                                                  width='100%'
                                                  style={{
                                                      objectFit: 'cover',
                                                      aspectRatio: '1/1',
                                                      borderRadius: '5px',
                                                  }}
                                              />
                                          </Fragment>
                                      ))}
                                      {images.length < 5 &&
                                          new Array(5 - images.length).fill(null).map((_, index) => (
                                              <Button
                                                  key={index + 'add-button'}
                                                  type='dashed'
                                                  style={{
                                                      height: '100%',
                                                      width: '100%',
                                                      aspectRatio: '1/1',
                                                      display: 'grid',
                                                      placeItems: 'center',
                                                  }}
                                              >
                                                  <Plus weight='bold' size='14' />
                                              </Button>
                                          ))}
                                      <Button
                                          type='dashed'
                                          style={{
                                              height: '100%',
                                              width: '100%',
                                              aspectRatio: '1/1',
                                          }}
                                          onClick={() => handleOpenViewMoreImages(images)}
                                      >
                                          View Details
                                      </Button>
                                  </Fragment>
                              )}
                    </div>
                </Card>
            )}
        </ViewMoreImagesModal>
    )
}
