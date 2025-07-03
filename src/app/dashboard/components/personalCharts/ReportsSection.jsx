import toast from 'react-hot-toast'
import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import { SummarizeOutlined } from '@mui/icons-material'
import { BackdropLoading, downloadFile, GenericForm, useDownloadExcelUrl } from '@/libV4'

const ReportsSection = () => {
  const form = useForm({
    defaultValues: {
      beforeDate: '',
      afterDate: '',
    },
  })

  const { mutateAsync: downloadExcel, isPending: pendingRequest } = useDownloadExcelUrl({
    baseUrl: 'urlProcess',
    method: 'get',
    onSuccess: async (blob) => {
      if (!blob?.success && blob?.error) {
        toast.error(blob?.error ?? 'Error al descargar el archivo')
        return
      }

      await downloadFile(
        blob,
        'reporte_actividades.xlsx',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )
    },
    onError: (err) => toast.error(err?.message || 'Ocurrió un error'),
  })

  const handleDownload = form?.handleSubmit(async (data) => {
    const { beforeDate, afterDate } = data

    if (afterDate && isNaN(new Date(afterDate).getTime())) {
      toast.error('La fecha "Desde" no es válida')
      return
    }
    if (beforeDate && isNaN(new Date(beforeDate).getTime())) {
      toast.error('La fecha "Hasta" no es válida')
      return
    }

    const queryParams = new URLSearchParams()

    if (beforeDate) {
      const before = new Date(beforeDate).toISOString()
      queryParams.append('before', before)
    }
    if (afterDate) {
      const after = new Date(afterDate).toISOString()
      queryParams.append('after', after)
    }

    const queryString = queryParams.toString()
    const url = `/analytics/activities-report${queryString ? `?${queryString}` : ''}`

    await downloadExcel({ url })
  })

  const inputs = [
    {
      name: 'afterDate',
      label: 'Desde',
      type: 'date',
      className: 'col-span-12 sm:col-span-6',
    },
    {
      name: 'beforeDate',
      label: 'Hasta',
      type: 'date',
      className: 'col-span-12 sm:col-span-6',
    },
  ]

  return (
    <article className='w-full flex items-center my-[10px]'>
      <BackdropLoading loading={pendingRequest} />
      <div className='w-full general_form_container'>
        <GenericForm
          inputs={inputs}
          control={form.control}
        />
      </div>
      <div className='w-full flex justify-end'>
        <Button
          onClick={handleDownload}
          color='success'
          variant='contained'
          startIcon={<SummarizeOutlined />}
        >
          Descargar excel
        </Button>
      </div>
    </article>
  )
}

export default ReportsSection
