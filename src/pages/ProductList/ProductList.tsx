import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { omitBy, isUndefined } from 'lodash'

import { productApi } from '../../apis/product.api'
import Pagination from '../../components/Paginate'
import useQueryParams from '../../hooks/useQueryParams'
import { ProductListConfig } from '../../types/product.type'
import AsideFilter from './AsideFilter'
import ProductItem from './ProductItem'
import SortProductList from './SortProductList'
import categoryApi from '../../apis/category.api'
import useQueryConfig from '../../hooks/useQueryConfig'

interface ProductListProps {}

const ProductList = ({}: ProductListProps) => {
  const queryConfig = useQueryConfig()

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProductList(queryConfig as ProductListConfig)
    },
    staleTime: 3 * 60 * 1000,
    keepPreviousData: true
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories', queryConfig],
    queryFn: () => {
      return categoryApi.getCategories()
    },
    keepPreviousData: true
  })

  return (
    <div className='bg-gray-200 px-12 py-3'>
      <div className='grid grid-cols-12 gap-x-2'>
        <div className='col-span-2'>
          <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data.data || []} />
        </div>
        <div className='col-span-10  p-2'>
          {productsData && <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />}
          <div className='grid mt-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
            {productsData?.data.data.products.map((product) => (
              <div className='col-span-1 bg-white' key={product._id}>
                <ProductItem product={product} />
              </div>
            ))}
          </div>
          {productsData && <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size}></Pagination>}
        </div>
      </div>
    </div>
  )
}

export default ProductList
