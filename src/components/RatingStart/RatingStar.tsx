import React from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from '../../constant/path'
import { QueryConfig } from '../../hooks/useQueryConfig'

interface RatingStarProps {
  queryConfig: QueryConfig
}

const RatingStar = ({ queryConfig }: RatingStarProps) => {
  const navigate = useNavigate()

  const handleFilterByStar = (star: number) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        page: '1',
        rating_filter: String(star)
      }).toString()
    })
  }
  return (
    <>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <li className='py-1 pl-2' key={index}>
            <div
              className='flex items-center text-sm cursor-pointer'
              onClick={() => handleFilterByStar(5 - index)}
              aria-hidden={true}
              tabIndex={0}
              role='button'
            >
              {Array(5)
                .fill(0)
                .map((_, indexStar) => {
                  if (indexStar < 5 - index) {
                    return (
                      <svg viewBox='0 0 9.5 8' className='w-4 h-4 mr-1' key={indexStar}>
                        <defs>
                          <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                            <stop offset={0} stopColor='#ffca11' />
                            <stop offset={1} stopColor='#ffad27' />
                          </linearGradient>
                          <polygon
                            id='ratingStar'
                            points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                          />
                        </defs>
                        <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                          <g transform='translate(-876 -1270)'>
                            <g transform='translate(155 992)'>
                              <g transform='translate(600 29)'>
                                <g transform='translate(10 239)'>
                                  <g transform='translate(101 10)'>
                                    <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    )
                  }
                  return (
                    <svg
                      enableBackground='new 0 0 15 15'
                      viewBox='0 0 15 15'
                      x={0}
                      y={0}
                      className='w-3 h-3 fill-current text-gray-300'
                      key={indexStar}
                    >
                      <polygon
                        points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeMiterlimit={10}
                      />
                    </svg>
                  )
                })}
              {index !== 0 && <span className='ml-2'>Trở lên</span>}
            </div>
          </li>
        ))}
    </>
  )
}

export default RatingStar
