import { useEffect, useState } from 'react'
import { formatToLocaleDateString, GenericSelect, useQueryDynamicApi } from '@/lib'
import { Box } from '@mui/material'
import { DataGridCustom } from '@/libV4'
import { Controller } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'

const AffectedExpedients = ({ form }) => {
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

  const [columnsFile] = useState([
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
        return `${params?.process?.ProcessType?.name ?? ''}`
      },
    },
    {
      field: 'code',
      headerName: 'Código',
      width: 300,
      renderCell: (params) => {
        return `${params?.process?.processData?.taxPayerData?.codigo ?? ''}`
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
  ])

  return (
    <Box overflow='auto'>
      <DataGridCustom
        loading={isFetching}
        requestProps={{
          isCompanyRequest: true,
          baseKey: 'urlFiscalizacion',
          url: `/massive-activities/${data.id}/expedients`,
          additionalQry:
            data?.statusExpedients !== 'ALL' ? `&uploadStatus=${data?.statusExpedients}` : '',
          isPaginated: true,
        }}
        tableProps={{
          columns: columnsFile,
          containerProps: { className: 'h-[calc(100vh-1000px)] min-h-[270px]' },
        }}
        toolbarProps={{
          children: (
            <Controller
              name='statusExpedients'
              control={form?.control}
              rules={{ required: 'Este campo es requerido' }}
              render={({ field, fieldState: { error } }) => {
                const helperText = error ? error.message : ''
                return (
                  <GenericSelect
                    className='xs:col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2'
                    label='Estado'
                    helperText={helperText}
                    options={[
                      { label: `Todos (${summaryExpedients?.data?.totalRows ?? 0})`, value: 'ALL' },
                      {
                        label: `Pendientes (${summaryExpedients?.data?.cantRegPending ?? 0})`,
                        value: 'PENDING',
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
      />
    </Box>
  )
}

export default AffectedExpedients
