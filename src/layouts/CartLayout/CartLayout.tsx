import React from 'react'
import NavHeader from '../../components/NavHeader/NavHeader'
import Footer from '../../components/Footer'
import { ShopeeIcon } from '../../components/Icons/Shopee'
import CartHeader from '../../components/CartHeader'

interface CartLayoutProps {
  children?: React.ReactNode
}

interface MainLayoutProps {}

const CartLayout = ({ children }: CartLayoutProps) => {
  return (
    <div className=''>
      <CartHeader />
      <div className='bg-gray-100 px-14'>{children}</div>
      <Footer />
    </div>
  )
}
export default CartLayout
