import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import useQueryConfig from './useQueryConfig'
import { Schema, schema } from '../utils/rules'
import { omit } from 'lodash'
import path from '../constant/path'

type FormData = Pick<Schema, 'name'>
const nameSchema = schema.pick(['name'])

const useSearchProduct = () => {
  const { register, handleSubmit, reset } = useForm<FormData>({ defaultValues: { name: '' }, resolver: yupResolver(nameSchema) })
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()

  const handleSearch = handleSubmit((data) => {
    const { order } = queryConfig
    const config = order ? omit({ ...queryConfig, name: data.name }, ['order', 'sort_by']) : { ...queryConfig, name: data.name }

    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
    reset()
  })

  return { register, handleSearch }
}

export default useSearchProduct
