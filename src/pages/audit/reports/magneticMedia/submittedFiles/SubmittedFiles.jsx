import { useForm } from 'react-hook-form'
import { ViewSubmittedFiles } from './view'
import { downloadFile, useDownloadExcel } from '@/libV4'
import toast from 'react-hot-toast'
import { useState } from 'react'
import dayjs from 'dayjs'

const SubmittedFiles = () => {
  const [years, setYears] = useState({
    fiscalYearFrom: '',
    fiscalYearTo: '',
  })
  const { control, getValues, trigger, watch } = useForm()
  const { mutateAsync: downloadExcel, isPending: isPendingDownloadExcel } = useDownloadExcel({
    baseUrl: 'urlMegMag',
    isCompany: false,
    url: `med-mag-taxpayer-files/report/${years.fiscalYearFrom}/${years.fiscalYearTo}`,
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

  const inputs = [
    {
      name: 'fiscalYearFrom',
      label: 'Año desde',
      type: 'date',
      className: 'col-span-6',
      openTo: 'year',
      views: ['year'],
      format: 'YYYY',
      maxDate: dayjs(new Date()),
      validate: (value) => {
        const dateToValue = watch('fiscalYearTo')
        if (value && dateToValue) {
          const dateTo = new Date(dateToValue)
          const dateFrom = new Date(value)
          if (dateFrom > dateTo) {
            return 'La fecha desde no puede ser mayor a la fecha hasta'
          }
        }
        if (value && new Date(value) > new Date()) {
          return 'La fecha hasta no puede ser mayor a la fecha actual'
        }

        return true
      },
    },
    {
      name: 'fiscalYearTo',
      label: 'Año hasta',
      type: 'date',
      className: 'col-span-6',
      openTo: 'year',
      views: ['year'],
      format: 'YYYY',
      minDate: watch('fiscalYearFrom'),
      maxDate: dayjs(new Date()),

      validate: (value) => {
        const dateFromValue = watch('fiscalYearFrom')
        if (value && dateFromValue) {
          const dateFrom = new Date(dateFromValue)
          const dateTo = new Date(value)
          if (dateTo < dateFrom) {
            return 'La fecha hasta no puede ser menor a la fecha desde'
          }
        }
        if (value && new Date(value) > new Date()) {
          return 'La fecha hasta no puede ser mayor a la fecha actual'
        }

        return true
      },
    },
  ]

  const handleClick = async () => {
    const validate = await trigger()
    if (!validate) {
      return
    }

    const values = getValues()
    const fiscalYearFrom = values.fiscalYearFrom
    const fiscalYearTo = values.fiscalYearTo

    if (fiscalYearFrom && fiscalYearTo) {
      const fromYear = fiscalYearFrom.year?.() ?? new Date(fiscalYearFrom).getFullYear()
      const toYear = fiscalYearTo.year?.() ?? new Date(fiscalYearTo).getFullYear()

      setYears({
        fiscalYearFrom: fromYear,
        fiscalYearTo: toYear,
      })

      await downloadExcel()
    } else {
      toast.error('Por favor, seleccione los años fiscales.')
    }
  }

  const props = {
    inputs,
    control,
    handleClick,
    isPendingDownloadExcel,
  }
  return <ViewSubmittedFiles {...props} />
}

export default SubmittedFiles
