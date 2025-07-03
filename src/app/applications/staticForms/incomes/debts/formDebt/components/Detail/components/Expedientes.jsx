import { GenericTable } from '@/lib'
import { BasicTitle } from '@/libV4'
import { Visibility } from '@mui/icons-material'
import { IconButton } from '@mui/material'

const Expedientes = () => {
  return (
    <div>
      <BasicTitle title='Expedientes' />
      <div className='p-2 backgroundGray1'>
        <div className={`h-[calc(100vh-300px)]`}>
          <GenericTable
            rows={[]}
            columns={[
              { field: 'expediente', headerName: 'Expediente Nro.' },
              { field: 'tipo_expediente', headerName: 'Tipo de expediente' },
              { field: 'estado', headerName: 'Estado' },
              {
                field: 'options',
                headerName: '',
                width: 60,
                pinned: 'right',
                renderCell: () => (
                  <IconButton onClick={() => {}}>
                    <Visibility />
                  </IconButton>
                ),
              },
            ]}
            pagination={false}
            sx={{
              backgroundColor: 'backgroundWhite1',
              minHeight: '300px',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Expedientes
