import React, { useContext, useEffect, useMemo, useState } from 'react'
import Button from '../../components/Button'
import QuantityController from '../../components/QuantityController'
import { formatCurrency, generateNameId } from '../../utils/utils'
import path from '../../constant/path'
import { Link, useLocation } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { purchasesStatus } from '../../constant/purchase'
import { purchaseApi } from '../../apis/purchase.api'
import { Purchase } from '../../types/purchase.type'
import { produce } from 'immer'
import { toast } from 'react-toastify'
import { keyBy } from 'lodash'
import { AppContext } from '../../contexts/app.context'

interface CartProps {}

const Cart = ({}: CartProps) => {
  const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)
  const [quantity, setQuantity] = useState<number>(0)
  const location = useLocation()
  console.log('🚀 ~ location:', location)
  const choosePurchaseFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId

  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })
  const buyProductsMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        position: 'top-center',
        autoClose: 1000,
        pauseOnHover: false
      })
    }
  })
  const deletePurchasesMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message)
    }
  })

  const purchasesInCart = purchasesInCartData?.data.data
  const isAllChecked = extendedPurchases.length > 0 ? extendedPurchases.every((purchase) => purchase.checked) : false
  const checkedPurchase = useMemo(() => extendedPurchases.filter((purchase) => purchase.checked), [extendedPurchases])
  const checkedPurchaseCount = useMemo(() => checkedPurchase.length, [checkedPurchase])
  const totalPrice = useMemo(
    () =>
      checkedPurchase.reduce((result, current) => {
        return result + current.product.price * current.buy_count
      }, 0),
    [checkedPurchase]
  )
  const totalSavingPrice = useMemo(
    () =>
      checkedPurchase.reduce((result, current) => {
        return result + (current.product.price_before_discount - current.product.price) * current.buy_count
      }, 0),
    [checkedPurchase]
  )

  useEffect(() => {
    purchasesInCart &&
      setExtendedPurchases((prev) => {
        const extendedPurchaseObject = keyBy(prev, '_id')
        return purchasesInCart.map((purchase, index) => {
          const isChoosePurchaseFromLocation = choosePurchaseFromLocation === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked: isChoosePurchaseFromLocation || Boolean(extendedPurchaseObject[purchase._id]?.checked)
          }
        })
      })
  }, [purchasesInCart])

  useEffect(() => {
    return () => {
      console.log('clean up')
      window.history.replaceState(null, '')
    }
  }, [purchasesInCart])

  const handleChecked = (purchaseId: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const curentExtendedPurchase = extendedPurchases.map((purchase, index) => {
      if (purchaseId === index) {
        return {
          ...purchase,
          checked: !purchase.checked
        }
      }
      return { ...purchase }
    })
    setExtendedPurchases(curentExtendedPurchase)
  }

  const handleCheckAll = () => {
    setExtendedPurchases(
      extendedPurchases.map((purchase) => {
        return {
          ...purchase,
          checked: !isAllChecked
        }
      })
    )
  }

  const handleQuantity = (purchaseIndex: number, value: number, enabled: boolean) => {
    if (enabled) {
      const purchase = extendedPurchases[purchaseIndex]
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }

  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const handleDeletePurchase = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex]._id
    deletePurchasesMutation.mutate([purchaseId])
  }

  const handleDeletePurchases = () => {
    const purchaseIds = checkedPurchase.map((purchase) => purchase._id)
    deletePurchasesMutation.mutate(purchaseIds)
  }

  const handleBuyProducts = () => {
    if (checkedPurchase.length > 0) {
      const body = checkedPurchase.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductsMutation.mutate(body)
    }
  }

  return (
    <div className='bg-neutral-100 w-full py-16'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input type='checkbox' className='h-5 w-5 accent-orange' checked={isAllChecked} onChange={handleCheckAll} />
                  </div>
                  <div className='flex-grow text-black'>Sản phẩm</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid grid-cols-5 text-center'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1'>Số lượng</div>
                  <div className='col-span-1'>Số tiền</div>
                  <div className='col-span-1'>Thao tác</div>
                </div>
              </div>
            </div>
            {extendedPurchases.length > 0 && (
              <div className='my-3 rounded-sm bg-white p-5 shadow'>
                {extendedPurchases?.map((purchase, index) => (
                  <div
                    key={purchase._id}
                    className='mb-5 grid grid-cols-12 rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0'
                  >
                    <div className='col-span-6'>
                      <div className='flex items-center justify-center'>
                        <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                          <input
                            type='checkbox'
                            className='h-5 w-5 accent-orange cursor-pointer'
                            checked={purchase.checked}
                            onChange={handleChecked(index)}
                          />
                        </div>
                        <div className='flex-grow'>
                          <div className='flex'>
                            <Link
                              className='h-20 w-20 flex-shrink-0'
                              to={`${path.home}${generateNameId({
                                name: purchase.product.name,
                                id: purchase.product._id
                              })}`}
                            >
                              <img alt={purchase.product.name} src={purchase.product.image} />
                            </Link>
                            <div className='flex-grow px-2 pt-1 pb-2'>
                              <Link
                                to={`${path.home}${generateNameId({
                                  name: purchase.product.name,
                                  id: purchase.product._id
                                })}`}
                                className='line-clamp-2 text-left'
                              >
                                {purchase.product.name}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-span-6'>
                      <div className='grid grid-cols-5 items-center'>
                        <div className='col-span-2'>
                          <div className='flex items-center justify-center'>
                            <span className='text-gray-300 line-through'>₫{formatCurrency(purchase.product.price_before_discount)}</span>
                            <span className='ml-3'>₫{formatCurrency(purchase.product.price)}</span>
                          </div>
                        </div>
                        <div className='col-span-1'>
                          <QuantityController
                            max={purchase.product.quantity}
                            value={purchase.buy_count}
                            classNameWrapper='flex items-center'
                            onIncrease={(value) => {
                              setQuantity(value)
                              quantity !== purchase.product.quantity && handleQuantity(index, value, value <= purchase.product.quantity)
                            }}
                            onDecrease={(value) => {
                              setQuantity(value)
                              quantity !== 1 && handleQuantity(index, value, value >= 1)
                            }}
                            onType={handleTypeQuantity(index)}
                            onFocusOut={(value) =>
                              handleQuantity(
                                index,
                                value,
                                value >= 1 &&
                                  value <= purchase.product.quantity &&
                                  value !== (purchasesInCart as Purchase[])[index].buy_count
                              )
                            }
                            disabled={purchase.disabled}
                          />
                        </div>
                        <div className='col-span-1'>
                          <span className='text-orange'>₫{formatCurrency(purchase.product.price * purchase.buy_count)}</span>
                        </div>
                        <div className='col-span-1'>
                          <button className='bg-none text-black transition-colors hover:text-orange' onClick={handleDeletePurchase(index)}>
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
          <div className='flex items-center'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input type='checkbox' className='h-5 w-5 accent-orange' checked={isAllChecked} onChange={handleCheckAll} />
            </div>
            <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>
              Chọn tất cả ({extendedPurchases.length})
            </button>
            <button className='mx-3 border-none bg-none' onClick={handleDeletePurchases}>
              Xóa
            </button>
          </div>

          <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
            <div>
              <div className='flex items-center sm:justify-end'>
                <div>Tổng thanh toán ({checkedPurchaseCount} sản phẩm):</div>
                <div className='ml-2 text-2xl text-orange'>₫{formatCurrency(totalPrice)}</div>
              </div>
              <div className='flex items-center text-sm sm:justify-end'>
                <div className='text-gray-500'>Tiết kiệm</div>
                <div className='ml-6 text-orange'>₫{formatCurrency(totalSavingPrice)}</div>
              </div>
            </div>
            <Button
              className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
              onClick={handleBuyProducts}
              disabled={buyProductsMutation.isLoading}
            >
              Mua hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
