import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent as {
    price_min: string
    price_max: string
  }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

const handleConfirmPassword = (ref: string) => {
  return yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref(ref)], 'Passwords must and should match')
}

export const schema = yup.object({
  email: yup.string().email("Email isn't valid").required('Plesea enter your email'),
  password: yup.string().required('Please enter your password').min(6, 'Password should be than 6 character '),
  confirm_password: handleConfirmPassword('password'),
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  name: yup.string().trim().required('')
})

export const userSchema = yup.object({
  name: yup.string().max(50, 'Độ dài tối đa là 50 kí tự'),
  phone: yup.string().max(20, 'Độ dài tối đa là 20 kí tự'),
  address: yup.string().max(160, 'Độ dài tối đa là 160 kí tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
  password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  confirm_password: handleConfirmPassword('new_password'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 kí tự')
})

export type userSchema = yup.InferType<typeof userSchema>

export type Schema = yup.InferType<typeof schema>
