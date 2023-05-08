import React from 'react'
import InputNumber, { InputNumberProps } from '../InputNumber'

interface QuantityControllerProps extends InputNumberProps {
  max?: number
  onType?: (value: number) => void
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  classNameWrapper?: string
}

const QuantityController = ({
  max,
  onDecrease,
  onType,
  onIncrease,
  classNameWrapper = 'ml-10 h-[32px]',
  value,
  ...rest
}: QuantityControllerProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value)
    if (max && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }

    onType && onType(_value)
  }

  const handleIncrease = () => {
    let _value = Number(value) + 1
    if (max && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
  }
  const handleDecrease = () => {
    let _value = Number(value) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
  }

  return (
    <div className={`flex items-center text-gray-500 ${classNameWrapper}`}>
      <button className='border border-gray-200 flex items-center justify-center w-[32px] h-full cursor-pointer' onClick={handleDecrease}>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
        </svg>
      </button>
      <InputNumber
        classNameInput=' border-gray-300 outline-none text-center border-t border-b w-14 h-full'
        classNameError='hidden'
        value={value}
        onChange={handleChange}
        className='h-full'
        {...rest}
      ></InputNumber>
      <button className='border border-gray-200 flex items-center justify-center w-[32px] h-full cursor-pointer' onClick={handleIncrease}>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}

export default QuantityController
