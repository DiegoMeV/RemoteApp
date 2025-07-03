import { GenericTable } from '@/lib'
import { BasicTitle, formatColombianMoney, formatToUTCDate, useQueryDynamicApi } from '@/libV4'
import { Visibility } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const Acuerdos = ({ dataForm }) => {
  const taxType = 'V'
  const { data: agreements, isFetching } = useQueryDynamicApi({
    baseKey: 'urlPayments',
    url: `/convenios/list-convenios/${taxType}?idCodigo=${dataForm?.idCodigo}`,
    enabled: !!dataForm?.idCodigo,
  })
  return (
    <div>
      <BasicTitle title='Convenios de pago' />
      <div className='p-2 backgroundGray1'>
        <div className={`h-[calc(100vh-300px)]`}>
          <GenericTable
            rows={agreements?.data ?? []}
            columns={[
              { field: 'convenio', headerName: 'Convenio' },
              {
                field: 'fecha',
                headerName: 'Fecha',
                renderCell: (params) => {
                  return formatToUTCDate(params?.row?.fecha)
                },
              },
              { field: 'inicial', headerName: 'Inicial' },
              {
                headerName: 'Periodo - Subperiodo inicial',
                field: 'periodoInicial',
                renderCell: (params) =>
                  `${params?.row?.periodoIni ?? ''} - ${params?.row?.subperiodoIni ?? ''}`,
              },
              {
                headerName: 'Periodo - Subperiodo final',
                field: 'periodoFinal',
                renderCell: (params) =>
                  `${params?.row?.periodoFin ?? ''} - ${params?.row?.subperiodoFin ?? ''}`,
              },
              {
                field: 'valor',
                headerName: 'Valor Convenio',
                valueGetter: (params) => Number(params?.value) || 0,
                renderCell: (params) => formatColombianMoney(`${params?.value}`),
                type: 'number',
              },
              {
                field: 'valor_pendiente',
                headerName: 'Valor pendiente de pago',
                valueGetter: (params) => Number(params?.value) || 0,
                renderCell: (params) => formatColombianMoney(`${params?.value}`),
                type: 'number',
              },
              { field: 'estado', headerName: 'Estado' },
              {
                field: 'options',
                headerName: '',
                width: 60,
                renderCell: (params) => {
                  return params.rowNode?.type === 'pinnedRow' ? null : (
                    <IconButton onClick={() => {}}>
                      <Visibility />
                    </IconButton>
                  )
                },
              },
            ]}
            pagination={false}
            loading={isFetching}
            initialState={{
              aggregation: {
                model: {
                  valor: 'sum',
                  valor_pendiente: 'sum',
                },
              },
            }}
            sx={{
              backgroundColor: 'backgroundWhite1',
              minHeight: '300px',
              '.MuiDataGrid-aggregationColumnHeaderLabel': {
                display: 'none',
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Acuerdos
