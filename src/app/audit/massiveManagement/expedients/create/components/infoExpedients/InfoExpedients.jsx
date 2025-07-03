import { formatToLocaleDateString, GenericSelect, useQueryDynamicApi } from '@/lib'
import { Box } from '@mui/material'
import { DataGridCustom } from '@/libV4'
import { useApis } from './useApis'
import { LoadingMassive } from '@/app/audit/expedient/components'
import { Controller } from 'react-hook-form'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Download } from '@mui/icons-material'

const InfoExpedients = ({ form, idMassiveActivity, getMassiveActivitiesQueue, queueInfo }) => {
  const data = form.watch()
  const queryClient = useQueryClient()

  const statusOptions = {
    PENDING: 'Pendiente',
    COMPLETED: 'Completado',
    ERROR: 'Error',
  }
  const { data: summaryExpedients, isFetching } = useQueryDynamicApi({
    url: `/massive-activities/${data.id}/expedients/summary`,
    baseKey: 'urlFiscalizacion',
    isCompanyRequest: true,
  })

  useEffect(() => {
    queryClient.invalidateQueries([`/massive-activities/${data.id}/expedients`])
  }, [data.id, data.statusExpedients, queryClient])

  const columnsFile = [
    { field: 'processIdentifier', headerName: 'Número de expediente', width: 150 },
    {
      field: 'managementDate',
      headerName: 'Fecha de expediente',
      width: 150,
      renderCell: (params) => formatToLocaleDateString(params.managementDate),
    },
    {
      field: 'typeProcess',
      headerName: 'Tipo de proceso',
      width: 150,
      renderCell: (params) => {
        return `${params?.process?.ProcessType?.name}`
      },
    },
    {
      field: 'code',
      headerName: 'Código',
      width: 300,
      renderCell: (params) => {
        return `${params?.process?.processData?.taxPayerData?.codigo}`
      },
    },
    {
      field: 'uploadStatus',
      headerName: 'Estado',
      minWidth: 150,
      renderCell: (params) => {
        return `${statusOptions[params?.uploadStatus]}`
      },
    },
    {
      field: 'errorMsg',
      headerName: 'Mensaje de error',
      minWidth: 150,
    },
  ]
  const { downloadZipApi, genZipApi, isPendingZip, isPendingZipGen } = useApis({
    idMassiveActivity,
    getMassiveActivitiesQueue,
  })
  const buttonProps = {
    privilege: 'documentos.plantillas.crear_plantillas',
    onClick: () => {
      if (data?.urlZipFile) {
        downloadZipApi({
          method: 'POST',
          qry: 'zip',
          body: { url: data.urlZipFile, name: `${idMassiveActivity}` },
        })
        return
      }
      genZipApi()
    },
    className: 'xs:col-span-12 sm:col-span-12 md:col-span-4 lg:col-span-2',
    startIcon: <Download />,
    label: 'ZIP',
  }

  return (
    <Box overflow='auto'>
      <DataGridCustom
        loading={isFetching}
        toolbarProps={{
          buttonProps,
          searchProps: { className: 'xs:col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-7' },
          children: (
            <Controller
              name='statusExpedients'
              control={form?.control}
              rules={{ required: 'Este campo es requerido' }}
              render={({ field, fieldState: { error } }) => {
                const helperText = error ? error.message : ''
                return (
                  <GenericSelect
                    className='xs:col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3'
                    label='Estado'
                    helperText={helperText}
                    options={[
                      { label: `Todos (${summaryExpedients?.data?.totalRows ?? 0})`, value: 'ALL' },
                      {
                        label: `Procesados (${summaryExpedients?.data?.cantRegProc ?? 0})`,
                        value: 'COMPLETED',
                      },
                      {
                        label: `Errores (${summaryExpedients?.data?.cantRegError ?? 0})`,
                        value: 'ERROR',
                      },
                    ]}
                    {...field}
                  />
                )
              }}
            />
          ),
        }}
        tableProps={{
          loading: isPendingZip || isPendingZipGen,
          columns: columnsFile,
          containerProps: { className: 'h-[calc(100vh-1000px)] min-h-[220px]' },
        }}
        requestProps={{
          isCompanyRequest: true,
          baseKey: 'urlFiscalizacion',
          url: `/massive-activities/${data.id}/expedients`,
          additionalQry:
            data?.statusExpedients !== 'ALL' ? `&uploadStatus=${data?.statusExpedients}` : '',
          isPaginated: true,
        }}
      />
      {['QUEUED', 'INPROGRESS'].includes(queueInfo?.[0]?.status) && (
        <LoadingMassive queueInfo={queueInfo} />
      )}
    </Box>
  )
}

export default InfoExpedients
