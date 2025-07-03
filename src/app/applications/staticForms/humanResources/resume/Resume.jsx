import { BasicTitle, QueryTable } from '@/libV4'
import { Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useStoreState } from 'easy-peasy'

const Resume = () => {
  const userData = useStoreState((state) => state.user.userData)
  const nit_compania = userData?.companies?.[0]?.Company?.taxId

  return (
    <div>
      <BasicTitle title='Hoja de vida' />
      <div className='p-2 backgroundGray1'>
        <QueryTable
          queryProps={{
            lovQuery: `SELECT *
                      FROM siif.v_hojas_de_vida
                      WHERE nit_compania = ${nit_compania}
                      AND (
                        TRANSLATE(UPPER(tercero), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE TRANSLATE(UPPER('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') 
                          OR
                        TRANSLATE(UPPER(nombre_tercero), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU') LIKE TRANSLATE(UPPER('%$busqueda%'), 'ÁÀÉÈÍÌÓÒÚÙ', 'AAEEIIOOUU')
                      )`,
          }}
          tableProps={{
            columns: [
              { field: 'tercero', headerName: 'Número de documento de identidad' },
              { field: 'tipo', headerName: 'Tipo de documento' },
              { field: 'nombre_tercero', headerName: 'Nombre' },
              {
                field: 'options',
                headerName: '',
                width: 60,
                pinned: 'right',
                renderCell: () => (
                  <IconButton onClick={() => {}}>
                    <Edit />
                  </IconButton>
                ),
              },
            ],
          }}
        />
      </div>
    </div>
  )
}

export default Resume
