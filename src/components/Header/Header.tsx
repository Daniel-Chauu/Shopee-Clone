import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { purchaseApi } from '../../apis/purchase.api'
import { purchasesStatus } from '../../constant/purchase'
import { AppContext } from '../../contexts/app.context'
import { CartIcon, ShopeeIcon } from '../Icons/Shopee'
import Popover from '../Popover'

import noproduct from '../../assets/images/no-product.png'
import useSearchProduct from '../../hooks/useSearchProduct'
import { formatCurrency } from '../../utils/utils'
import NavHeader from '../NavHeader/NavHeader'

interface HeaderProps {}

const MAX_PURCHASE = 5

const Header = ({}: HeaderProps) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext)
  const queriClient = useQueryClient()
  const { handleSearch, register } = useSearchProduct()

  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart }),
    enabled: isAuthenticated
  })

  const purchasesInCart = purchasesInCartData?.data.data

  return (
    <header className='text-white pb-5 pt-2 bg-gradientHeader px-14'>
      <div className=''>
        <NavHeader />

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
                          <Link to={'/cart'} className='p-2 bg-orange hover:bg-opacity-90 text-white rounded-sm'>
                            Xem giỏ hàng
                          </Link>
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
                  purchasesInCart && (
                    <span className='absolute bg-white rounded-full px-[6px] h-[16px] top-[-5px] right-[-9px] text-orange flex items-center justify-center text-xs '>
                      {purchasesInCart?.length}
                    </span>
                  )
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
