import { range } from 'lodash'
import React, { useEffect, useState } from 'react'

interface DateSelectProps {
  value?: Date
  onChange?: (value: Date) => void
  errorMessage?: string
}

const DateSelect = ({ errorMessage, onChange, value }: DateSelectProps) => {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  useEffect(() => {
    if (value) {
      setDate({
        date: value?.getDate(),
        month: value?.getMonth(),
        year: value?.getFullYear()
      })
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value: valueFromSelect } = e.target
    const newDate = {
      date: value?.getDate() || 1,
      month: value?.getMonth() || 0,
      year: value?.getFullYear() || 1990,
      [name]: valueFromSelect
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
      <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right '>Ngày sinh</div>
      <div className='sm:w-[80%] sm:pl-5'>
        <div className='flex justify-between'>
          <select
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3'
            onChange={handleChange}
            name='date'
            value={value?.getDate() || date.date}
          >
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3'
            onChange={handleChange}
            name='month'
            value={value?.getMonth() || date.month}
          >
            {range(0, 12).map((item) => (
              <option value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3'
            onChange={handleChange}
            name='year'
            value={value?.getFullYear() || date.year}
          >
            {range(1990, 2024).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
      </div>
    </div>
  )
}

export default DateSelect
