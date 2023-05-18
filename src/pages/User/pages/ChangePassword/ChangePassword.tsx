import React from 'react'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userSchema } from '../../../../utils/rules'
import { isAxiosUnprocessableEntityError } from '../../../../utils/utils'
import { ErrorResponse } from '../../../../types/utils.type'
import { useMutation } from '@tanstack/react-query'
import userApi from '../../../../apis/user.api'
import { omit } from 'lodash'

interface ChangePasswordProps {}

type FormData = Pick<userSchema, 'password' | 'new_password' | 'confirm_password'>
const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

const ChangePassword = ({}: ChangePasswordProps) => {
  const {
    control,
    register,
    reset,
    setValue,
    formState: { errors, isLoading },
    handleSubmit,
    watch,
    setError
  } = useForm<FormData>({
    defaultValues: {},
    resolver: yupResolver(passwordSchema)
  })

  const updateProfileMutation = useMutation(userApi.updateProfile)

  const onSubmit = handleSubmit(async (data) => {
    const body = omit(data, ['confirm_password'])
    const res = updateProfileMutation.mutate(body)
  })

  return (
    <>
      <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
        <div className='border-b border-b-gray-200 py-6'>
          <h1 className='text-lg font-medium capitalize text-gray-900'>Đổi mật khẩu</h1>
          <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
        </div>
        <form className='mt-8 mr-auto max-w-2xl' onSubmit={onSubmit}>
          <div className=' flex flex-col max-w-2xl flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right '>Mật khẩu cũ</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='password'
                register={register}
                errorMessage={errors.password?.message}
              />
            </div>
          </div>
          <div className=' flex flex-col max-w-2xl flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right '>Mật khẩu mới</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='new_password'
                register={register}
                errorMessage={errors.new_password?.message}
              />
            </div>
          </div>
          <div className=' flex flex-col max-w-2xl flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right '>Xác nhận mật khẩu mới</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='confirm_password'
                register={register}
                errorMessage={errors.confirm_password?.message}
              />
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                className='flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                type='submit'
              >
                Lưu
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default ChangePassword
