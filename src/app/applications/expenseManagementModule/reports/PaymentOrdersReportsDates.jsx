import { CardContentPage, TitlePage } from '@/app/audit/components'
import { LoadingMassive } from '@/app/audit/expedient/components'
import { downloadBuffer, useGetBufferDocument } from '@/lib'
import {
  AccessControl,
  BackdropLoading,
  GenericForm,
  NoAccessCard,
  useMutationDynamicBaseUrl,
} from '@/libV4'
import { SummarizeOutlined } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useStoreActions } from 'easy-peasy'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const PaymentOrdersReportsDates = () => {
  const expectedPath = 'applications/expenseManagementModule/reports/PaymentOrdersReportsDates'
  const timeoutRef = useRef(null)
  const [queueInfo, setQueueInfo] = useState()
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)
  const form = useForm()
  const rangeDates = [
    {
      label: 'Fecha de inicio',
      name: 'startDate',
      type: 'date',
      required: true,
      className: 'general_form_item md:col-span-4',
    },
    {
      label: 'Fecha de fin',
      name: 'endDate',
      type: 'date',
      required: true,
      className: 'general_form_item md:col-span-4',
      minDate: form.watch('startDate'),
      validate: (value) => {
        const startDate = form.getValues('startDate')
        if (startDate && value < startDate) {
          return 'La fecha de fin debe ser mayor o igual a la fecha de inicio'
        }
        return true
      },
    },
  ]
  const { mutateAsync: downloadExcelQueue, isPending: loadingQueue } = useMutationDynamicBaseUrl({
    baseKey: 'urlApps',
    url: '/queue-logs/EXCEL_GENERATION/',
    method: 'GET',
    onSuccess: (e) => {
      setQueueInfo(e?.data)
      if (e?.data?.[0]?.status === 'COMPLETED') {
        if (!e?.data?.[0]?.queueData?.documentId) {
          toast.success(e?.data?.[0]?.queueData?.message)
        } else {
          downloadXLSXApi({ qry: `${e?.data?.[0]?.queueData?.documentId}/documentos` })
        }
      }
      if (e?.data?.[0]?.status === 'QUEUED' || e?.data?.[0]?.status === 'INPROGRESS') {
        const path = window.location.pathname
        if (path.includes(expectedPath)) {
          timeoutRef.current = setTimeout(() => {
            downloadExcelQueue({ qry: e?.data?.[0]?.idQueue })
          }, 5000)
        }
      }
      if (e?.data?.[0]?.status === 'ERROR') {
        toast.error('Ah ocurrido un error con la cola', e?.data?.[0]?.queueData?.errorMsg)
      }
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  const { mutateAsync: downloadExcel, isPending: loadingGen } = useMutationDynamicBaseUrl({
    baseKey: 'urlApps',
    url: '/app-specific/siif-web/gestion-gasto/pay-order/excel',
    method: 'POST',
    onSuccess: (e) => {
      downloadExcelQueue({ qry: e?.data?.data?.idQueue })
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })
  const { mutateAsync: downloadXLSXApi, isPending: isLoadingXlsx } = useGetBufferDocument({
    onSuccess: async (response) => {
      const contentType = response.headers.get('Content-Type')
      if (contentType?.includes('pdf')) {
        await setPreviewer({
          open: true,
          bufferD: response,
          isRegenerable: false,
        })
        return
      } else {
        downloadBuffer(response)
      }
    },
    onError: (e) => {
      toast.error(e?.data?.error ?? 'Error al obtener el documento')
    },
  })

  // useEffect(() => {
  //   downloadExcelQueue()
  // }, [])

  const onSubmit = (data) => {
    downloadExcel({ body: data })
  }

  return (
    <AccessControl
      privilege={'aplicaciones.informes_gen_reportes_op.visualizar'}
      nodeContent={<NoAccessCard />}
    >
      <div className='flex flex-col relative'>
        <BackdropLoading loading={isLoadingXlsx || loadingQueue || loadingGen} />
        {['QUEUED', 'INPROGRESS'].includes(queueInfo?.[0]?.status) && (
          <LoadingMassive queueInfo={queueInfo} />
        )}
        <TitlePage
          title={'Informe de órdenes de pago entre fechas'}
          backpath={'/applications'}
        />
        <CardContentPage>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full flex flex-col gap-4'
          >
            <div className='general_form_container '>
              <GenericForm
                inputs={rangeDates}
                control={form?.control}
              />
              <Button
                type={'submit'}
                variant={'contained'}
                size={'small'}
                color='success'
                startIcon={<SummarizeOutlined />}
                className='general_form_item md:col-span-4'
              >
                {'Descargar Excel'}
              </Button>
            </div>
          </form>
        </CardContentPage>
      </div>
    </AccessControl>
  )
}

export default PaymentOrdersReportsDates
