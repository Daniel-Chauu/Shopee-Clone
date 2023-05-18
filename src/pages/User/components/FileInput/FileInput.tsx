import React, { useRef } from 'react'
import { config } from '../../../../constant/config'
import { toast } from 'react-toastify'

interface FileInputProps {
  onChange: (file?: File) => void
}

const FileInput = ({ onChange }: FileInputProps) => {
  const fileRef = useRef<HTMLInputElement>(null)

  const handleUploadImage = () => {
    fileRef.current?.click()
  }

  const handleChangImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if ((file && file.size >= config.maxSizeImage) || !file?.type.includes('image')) {
      toast.error('Dụng lượng file tối đa 1 MB. Định dạng:.JPEG, .PNG', {
        autoClose: 2000,
        position: 'top-center',
        pauseOnHover: false
      })
    } else {
      onChange && onChange(file)
    }
  }

  return (
    <>
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        ref={fileRef}
        onChange={handleChangImage}
        onClick={(e) => {
          ;(e.target as any).value = null
        }}
      />
      <button
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
        type='button'
        onClick={handleUploadImage}
      >
        Chọn ảnh
      </button>
    </>
  )
}

export default FileInput
