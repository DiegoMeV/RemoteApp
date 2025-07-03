import { BackdropLoading, downloadFile, GenericForm, useDownloadExcel } from '@/libV4'
import { Button } from '@mui/material'
import { SummarizeOutlined } from '@mui/icons-material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useGetInputs } from './hooks'
import toast from 'react-hot-toast'
import dayjs from 'dayjs'

const ListRegistry = () => {
  const { control, getValues, watch, trigger } = useForm()
  const [query, setQuery] = useState('')

  const inputs = useGetInputs(watch)
  const { mutateAsync: downloadExcel, isPending: isPendingDownloadExcel } = useDownloadExcel({
    baseUrl: 'urlProcess',
    url: `/analytics/reports/managed-processes?${query}`,
    onSuccess: (blob) => {
      downloadFile(
        blob,
        `Reporte.xlsx`,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )
    },
    onError: (error) => {
      toast.error(error?.message || 'Ocurrió un error')
    },
  })

  const handleClick = async () => {
    const validate = await trigger()
    if (!validate) {
      return
    }
    const values = getValues()
    const queryParams = Object.entries(values)
      .map(([key, value]) => {
        const dates = ['dateFrom', 'dateTo']

        if (value?.id) {
          return `${key}=${value.id}`
        }
        if (value && value !== '') {
          if (dates.includes(key)) {
            return `${key}=${dayjs(value).format('YYYY-MM-DD')}`
          }
          return `${key}=${value}`
        }
        return undefined
      })
      .filter(Boolean)
      .join('&')

    setQuery(queryParams)
    downloadExcel()
  }

  return (
    <section className='grid grid-cols-12 gap-4 p-2'>
      <BackdropLoading loading={isPendingDownloadExcel} />
      <GenericForm
        inputs={inputs}
        control={control}
      />
      <div className='col-span-12 flex justify-end items-center'>
        <Button
          color='success'
          variant='contained'
          startIcon={<SummarizeOutlined />}
          onClick={handleClick}
        >
          Descargar excel
        </Button>
      </div>
    </section>
  )
}

export default ListRegistry
