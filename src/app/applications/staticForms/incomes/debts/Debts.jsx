import { Visibility } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { BasicTitle, useQueryDynamicApi } from '@/libV4'
import { useNavigate } from 'react-router-dom'
import { GenericTable } from '@/lib'

const Debts = () => {
  const { data: infoVehicles, isFetching } = useQueryDynamicApi({
    baseKey: 'urlPayments',
    url: `/vehicular`,
  })

  const navigate = useNavigate()

  return (
    <div>
      <BasicTitle title='Deudas' />
      <div className='p-2 backgroundGray1'>
        <div className={`h-[calc(100vh-200px)]`}>
          <GenericTable
            rows={infoVehicles?.data ?? []}
            columns={[
              { field: 'idCodigo', headerName: 'ID Codigo' },
              { field: 'codigo', headerName: 'Código' },
              { field: 'documento', headerName: 'Documento' },
              { field: 'propietario', headerName: 'Propietario' },
              { field: 'direccion', headerName: 'Dirección' },
              {
                field: 'options',
                headerName: '',
                width: 60,
                pinned: 'right',
                renderCell: (params) => (
                  <IconButton
                    onClick={() =>
                      navigate(
                        `/applications/staticForms/incomes/debts/formDebt?codigo=${params.row.codigo}`
                      )
                    }
                  >
                    <Visibility />
                  </IconButton>
                ),
              },
            ]}
            loading={isFetching}
            getRowId={(row) => row?.idCodigo}
            pagination={false}
          />
        </div>
      </div>
    </div>
  )
}

export default Debts
