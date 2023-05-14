import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { productApi } from '../../apis/product.api'
import ProductRating from '../../components/ProductRating'
import { formatCurrency, formatNumberToSocialStyle, generateNameId, getIdFromNameId, rateSale } from '../../utils/utils'
import Button from '../../components/Button'
import DOMPurify from 'dompurify'
import { Product } from '../../types/product.type'
import ProductItem from '../ProductList/ProductItem'
import InputNumber from '../../components/InputNumber'
import QuantityController from '../../components/QuantityController'
import { purchaseApi } from '../../apis/purchase.api'
import { toast } from 'react-toastify'
import { purchasesStatus } from '../../constant/purchase'
import path from '../../constant/path'

interface ProductDetailProps {}

const ProductDetail = ({}: ProductDetailProps) => {
  const navigate = useNavigate()
  const { nameId } = useParams()
  const queryClient = useQueryClient()
  const id = getIdFromNameId(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })

  const product = productDetailData?.data.data
  const [currentIndexImage, setCurrentIndexImage] = useState([0, 5])
  const currentImages = useMemo(() => (product ? product.images.slice(...currentIndexImage) : []), [product, currentIndexImage])
  const [activeImage, setActiveImage] = useState<string>('')
  const [buyCount, setBuyCount] = useState(1)
  const imageRef = useRef<HTMLImageElement>(null)

  const queryConfig = { page: '1', limit: '20', category: product?.category._id }
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productApi.getProductList(queryConfig),
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000
  })

  const addToCartMutation = useMutation(purchaseApi.addToCart, {
    onSuccess: (data) => {
      toast.success(data.data.message, {
        autoClose: 1700,
        pauseOnHover: false
      })
      queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product])

  const chooseActiveImage = (img: string) => {
    setActiveImage(img)
  }

  const next = () => {
    if (currentIndexImage[1] < (product as Product).images.length) {
      setCurrentIndexImage((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const prev = () => {
    if (currentIndexImage[0] > 0) {
      setCurrentIndexImage((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const handleAddToCart = () => {
    addToCartMutation.mutate({ product_id: product?._id as string, buy_count: buyCount })
  }

  const handleZoom = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    const { offsetX, offsetY } = e.nativeEvent
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }

  const resetImage = () => {
    imageRef.current?.removeAttribute('style')
  }

  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }

  const handleBuyNow = async () => {
    const res = await addToCartMutation.mutateAsync({ product_id: product?._id as string, buy_count: buyCount })
    const purchaseId = res.data.data._id
    navigate(path.cart, {
      state: {
        purchaseId
      }
    })
  }

  if (!product) return null
  return (
    <div className='bg-gray-100 '>
      <div className='container mx-auto'>
        <div className='bg-white p-4 shadow'>
          <div className='container'>
            <div className=' grid grid-cols-12 gap-x-12'>
              <div className='col-span-5 '>
                <div
                  className='w-full relative pt-[100%] shadow overflow-hidden cursor-zoom-in'
                  onMouseMove={handleZoom}
                  onMouseLeave={resetImage}
                >
                  <img
                    src={activeImage}
                    alt=''
                    className='absolute top-0 left-0 w-full h-full pointer-events-none bg-white object-cover '
                    ref={imageRef}
                  />
                </div>
                <div className='mt-3 relative grid grid-cols-5 gap-x-2'>
                  <button
                    className='w-6 h-8 absolute left-0 top-1/2 -translate-y-1/2 z-10 text-white bg-black bg-opacity-40 font-semibold cursor-pointer flex items-center  justify-center'
                    onClick={prev}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                    </svg>
                  </button>
                  {currentImages &&
                    currentImages.length > 0 &&
                    currentImages.map((image, index) => {
                      const isActive = activeImage === image
                      return (
                        <div className='w-full relative cursor-pointer pt-[100%]' key={index} onClick={() => chooseActiveImage(image)}>
                          <img src={image} alt='' className='absolute top-0 left-0 w-full h-full bg-white object-cover ' />
                          {isActive && <div className='absolute inset-0 border-2 border-red-500' />}
                        </div>
                      )
                    })}
                  <button
                    className='w-6 h-8 absolute right-0 top-1/2 -translate-y-1/2 z-10 text-white font-semibold cursor-pointer bg-black bg-opacity-40 flex items-center justify-center'
                    onClick={next}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                    </svg>
                  </button>
                </div>
              </div>
              <div className='col-span-7 '>
                <h2 className='text-2xl capitalize '>{product.name}</h2>
                <div className='flex mt-3 items-center'>
                  <div className='flex items-center'>
                    <span className='mr-2 text-orange border-b border-b-orange mt-1'>
                      {Number(product.rating.toString().slice(0, 3)).toFixed(1)}
                    </span>
                    <ProductRating
                      rating={product.rating}
                      activeClassname='fill-orange text-orange h-4 w-4'
                      nonActiveClassname='fill-gray-300 text-white h-4 w-4'
                    />
                  </div>
                  <div className='w-[1px] h-4 mx-4 bg-gray-500' />
                  <div className='flex items-center'>
                    <span className='text-[18px] mr-2 '>{formatNumberToSocialStyle(product.sold)}</span>
                    <span className='text-gray-500'>Đã bán</span>
                  </div>
                </div>
                <div className='px-5 py-4 mt-4 bg-gray-100 rounded-sm flex items-center'>
                  <span className='text-[15px] line-through text-gray-500'>₫{formatCurrency(product.price_before_discount)}</span>
                  <span className='ml-3 text-xl text-orange '>₫{formatCurrency(product.price)}</span>
                  <span className='inline-block px-1 ml-3 py-[2px] bg-orange text-white font-bold text-[14px] uppercase rounded-md'>
                    {rateSale(product.price_before_discount, product.price)} giảm
                  </span>{' '}
                </div>
                <div className='mt-8 flex items-center'>
                  <span className='text-gray-500 capitalize'>Số lượng</span>
                  <QuantityController
                    max={product.quantity}
                    onType={handleBuyCount}
                    onIncrease={handleBuyCount}
                    onDecrease={handleBuyCount}
                    value={buyCount.toString()}
                  />
                  <span className='ml-3 text-[14px] text-gray-500'>{product.quantity} sản phẩm có sẵn </span>
                </div>
                <div className='mt-8 flex items-center gap-x-4 h-[48px]'>
                  <Button
                    className='bg-orange bg-opacity-10 capitalize border border-orange text-orange py-3 rounded-sm px-4 flex items-center gap-x-3 cursor-pointer'
                    onClick={handleAddToCart}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                      />
                    </svg>
                    Thêm vào giỏ hàng
                  </Button>
                  <Button className='bg-orange  capitalize text-white rounded-sm cursor-pointer py-4 px-4' onClick={handleBuyNow}>
                    Mua ngay
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container mx-auto shadow-md'>
        <div className='p-4 my-6 bg-white'>
          <h3 className='p-3 bg-gray-100 uppercase text-xl'>Mô tả sản phẩm</h3>
          <div className='mx-4 mt-8 mb-4 text-sm leading-loose'>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description)
              }}
            />
          </div>
        </div>
      </div>
      <div className='container mx-auto shadow-md'>
        <div className='p-4 mt-6 bg-white'>
          <h2 className='text-xl bg-gray-100 px-2 py-4 uppercase'>Sản phẩm tương tự</h2>
          <div className='grid mt-5 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2'>
            {productsData?.data.data.products.map((product) => (
              <div className='col-span-1 bg-white' key={product._id}>
                <ProductItem product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
