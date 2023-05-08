import { useFloating } from '@floating-ui/react-dom'
import { arrow, offset, shift } from '@floating-ui/react-dom-interactions'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { authApi } from '../../apis/auth.api'
import path from '../../constant/path'
import { AppContext } from '../../contexts/app.context'
import { getProfileFromLS } from '../../utils/auth'
import { CartIcon, ShopeeIcon } from '../Icons/Shopee'
import Popover from '../Popover'
import { Schema, schema } from '../../utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import useQueryConfig from '../../hooks/useQueryConfig'
import { purchaseApi } from '../../apis/purchase.api'
import { purchasesStatus } from '../../constant/purchase'

import noproduct from '../../assets/images/no-product.png'
import { formatCurrency } from '../../utils/utils'

interface HeaderProps {}

type FormData = Pick<Schema, 'name'>
const nameSchema = schema.pick(['name'])

const MAX_PURCHASE = 5

const Header = ({}: HeaderProps) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext)
  const profile = getProfileFromLS()
  const { register, handleSubmit, reset } = useForm<FormData>({ defaultValues: { name: '' }, resolver: yupResolver(nameSchema) })
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()

  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })

  const purchasesInCart = purchasesInCartData?.data.data
  console.log('🚀 ~ purchasesInCart:', purchasesInCart)

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setIsAuthenticated(false)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const handleSearch = handleSubmit((data) => {
    const { order } = queryConfig
    const config = order ? omit({ ...queryConfig, name: data.name }, ['order', 'sort_by']) : { ...queryConfig, name: data.name }

    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
    reset()
  })

  return (
    <header className='text-white pb-5 pt-2 bg-gradientHeader px-14'>
      <div className=''>
        <div className='flex justify-end gap-x-3 items-center '>
          <Popover
            renderPopover={
              <div className='bg-white relative shadow-md rounded-sm border border-gray-200 z-99 text-[14px]'>
                <div className='flex flex-col py-2 px-3'>
                  <button className='py-2 pl-3 pr-28 text-left hover:text-orange'>Tiếng Việt</button>
                  <button className='py-2 pl-3 pr-28 text-left hover:text-orange mt-2'>English</button>
                </div>
              </div>
            }
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
                d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
              />
            </svg>
            <span>Tiếng Việt</span>
          </Popover>
          {!isAuthenticated && (
            <div className='ml-3'>
              <Link to={path.login} className='hover:opacity-80 mr-2'>
                Đăng nhập
              </Link>
              <Link to={path.register} className='hover:opacity-80'>
                Đăng ký
              </Link>
            </div>
          )}
          {isAuthenticated && (
            <Popover
              renderPopover={
                <div className='bg-white relative shadow-md rounded-sm border border-gray-200 z-99 text-[14px] text-left'>
                  <div className='flex flex-col py-2 px-3'>
                    <Link to={'/'} className='py-2 pr-3 hover:text-orange text-left'>
                      Tài khoản của tôi
                    </Link>
                    <Link to={'/'} className='py-2 pr-3 hover:text-orange mt-2 text-left'>
                      Đơn mua
                    </Link>
                    <button onClick={handleLogout} className='py-2 pr-3 hover:text-orange mt-2 text-left'>
                      Đăng xuất
                    </button>
                  </div>
                </div>
              }
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
                  d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
                />
              </svg>
              <span>{profile?.email}</span>
            </Popover>
          )}
        </div>

        <div className='grid grid-cols-12 gap-4 mt-4 items-center'>
          <ShopeeIcon className='col-span-2' />
          <form action='' className='col-span-9 relative' onSubmit={handleSearch}>
            <input
              type='text'
              className='w-full p-3 rounded-sm outline-none pr-20 text-black'
              {...register('name')}
              placeholder='Nhập tên sản phẩm muốn tìm'
            />
            <button className='absolute right-1 top-1 bg-[#fb5533] p-2 rounded-sm'>Search</button>
          </form>
          <div className='col-span-1 flex justify-center items-center'>
            <Popover
              placement='bottom-end'
              renderPopover={
                <div className='relative left-7 max-w-[400px] rounded-sm border border-gray-200 bg-white text-sm shadow-md p-3'>
                  {purchasesInCart && purchasesInCart.length > 0 && (
                    <div className='text-gray-400 capitalize w-full'>Sản phẩm mới thêm</div>
                  )}
                  <div className='flex flex-col gap-3 mt-3'>
                    {purchasesInCart && purchasesInCart.length > 0 ? (
                      <>
                        {purchasesInCart.slice(0, 5).map((purchase) => (
                          <div className='flex' key={purchase._id}>
                            <div className='flex-shrink-0 mr-2'>
                              <img src={purchase.product.image} alt='' className='w-8 h-8 ' />
                            </div>
                            <p className='truncate text-[14px]'>{purchase.product.name}</p>
                            <span className='text-orange'>₫{formatCurrency(purchase.price)}</span>
                          </div>
                        ))}
                        <div className='flex justify-between items-center mt-4'>
                          <div className='text-gray-400 text-xs'>
                            <span className='mr-2'>
                              {purchasesInCart.length > MAX_PURCHASE ? purchasesInCart.length - MAX_PURCHASE : ''}
                            </span>
                            <span>Thêm hàng vào giỏ</span>
                          </div>
                          <button className='p-2 bg-orange hover:bg-opacity-90 text-white rounded-sm'>Xem giỏ hàng</button>
                        </div>
                      </>
                    ) : (
                      <div className='w-[300px] h-[300px] flex justify-center items-center flex-col'>
                        <img src={noproduct} alt='anhh' className=' object-cover w-[60%]' />
                        <span className='text-xl'>Chưa có sản phẩm nào</span>
                      </div>
                    )}
                  </div>
                </div>
              }
              initialOpen
            >
              <CartIcon
                className='relative'
                children={
                  <span className='absolute bg-white rounded-full px-[6px] h-[16px] top-[-5px] right-[-9px] text-orange flex items-center justify-center text-xs '>
                    {purchasesInCart?.length}
                  </span>
                }
              />
            </Popover>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
