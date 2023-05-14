import React, { useContext } from 'react'
import Popover from '../Popover'
import { AppContext } from '../../contexts/app.context'
import { Link } from 'react-router-dom'
import path from '../../constant/path'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from '../../apis/auth.api'
import { toast } from 'react-toastify'
import { purchasesStatus } from '../../constant/purchase'
import { getProfileFromLS } from '../../utils/auth'

interface NavHeaderProps {}

const NavHeader = ({}: NavHeaderProps) => {
  const queriClient = useQueryClient()

  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext)
  const profile = getProfileFromLS()

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: (data) => {
      setIsAuthenticated(false)
      toast.success(data.data.message, {
        autoClose: 1700,
        pauseOnHover: false
      })
      queriClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
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
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
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
                <Link to={'/user'} className='py-2 pr-3 hover:text-orange text-left'>
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
  )
}

export default NavHeader
