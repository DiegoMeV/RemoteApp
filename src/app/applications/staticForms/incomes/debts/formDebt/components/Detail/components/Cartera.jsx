import { GenericTable } from '@/lib'
import { BasicTitle, useQueryDynamicApi } from '@/libV4'
import { Visibility } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const Cartera = ({ dataForm }) => {
  const { data: debts, isFetching } = useQueryDynamicApi({
    baseKey: 'urlPayments',
    url: `/vehicular/${dataForm?.idCodigo}/deudas`,
    enabled: !!dataForm?.idCodigo,
  })
  return (
    <div>
      <BasicTitle title='Detalle por vigencia' />
      <div className='p-2 backgroundGray1'>
        <div className={`h-[calc(100vh-300px)]`}>
          <GenericTable
            rows={debts?.data ?? []}
            columns={[
              { field: 'periodo', headerName: 'Periodo' },
              { field: 'subperiodo', headerName: 'Subperiodo' },
              { field: 'valor', headerName: 'Valor' },
              {
                field: 'options',
                headerName: '',
                sortable: false,
                disableColumnMenu: true,
                resizable: false,
                headerAlign: 'center',
                renderCell: () => (
                  <IconButton onClick={() => {}}>
                    <Visibility />
                  </IconButton>
                ),
              },
            ]}
            pagination={false}
            loading={isFetching}
            getRowId={(row) => `${row?.impuesto}`}
            initialState={{
              pinnedColumns: { right: ['options'] },
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

export default Cartera
