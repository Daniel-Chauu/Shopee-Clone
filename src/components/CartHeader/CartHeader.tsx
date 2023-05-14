import React from 'react'
import NavHeader from '../NavHeader/NavHeader'
import { ShopeeIcon } from '../Icons/Shopee'
import useSearchProduct from '../../hooks/useSearchProduct'

interface CartHeaderProps {}

const CartHeader = ({}: CartHeaderProps) => {
  const { handleSearch, register } = useSearchProduct()

  return (
    <div className='text-white pb-5 pt-2 bg-gradientHeader px-14'>
      <div className=''>
        <NavHeader />
        <div className='flex justify-between items-center mt-3'>
          <div className='flex items-center gap-x-5'>
            <ShopeeIcon className='inline-block w-32 h-12' />
            <div className='h-8 w-[1px] bg-white'></div>
            <span className='text-xl pt-2'>Giỏ Hàng</span>
          </div>
          <form autoComplete='off' className='mt-2 min-w-[530px] relative' onSubmit={handleSearch}>
            <input
              type='text'
              className='w-full p-3 rounded-sm outline-none pr-20 text-black'
              placeholder='Nhập tên sản phẩm muốn tìm'
              {...register('name')}
            />
            <button className='absolute right-1 top-1 bg-[#fb5533] p-2 rounded-sm'>Search</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CartHeader
