import { ClassicIconButton } from '@/libV4'
import { Edit } from '@mui/icons-material'
import { Box } from '@mui/material'

export const columnsPlanillaTable = (navigate) => {
  const handleEditNomina = (secuencia) => {
    navigate(
      `/applications/staticForms/humanResources/PUAutoliq/editPUAutoliq?secuence=${secuencia}`
    )
  }
  return [
    {
      field: 'secuencia',
      headerName: 'Secuencia',
      width: 100,
    },
    {
      field: 'nomplanilla',
      headerName: 'Nombre Planilla',
      width: 300,
    },
    {
      field: 'options',
      headerName: '',
      width: 150,
      sortable: false,
      pinned: 'right',
      renderCell: (params) => {
        return (
          <Box
            display='flex'
            alignContent='center'
            justifyContent='space-between'
            width='100%'
          >
            <ClassicIconButton
              onClick={() => handleEditNomina(params?.secuencia)}
              title='Editar usuario'
              placement='top'
              color='secondary'
            >
              <Edit />
            </ClassicIconButton>
          </Box>
        )
      },
      hideable: false,
      filterable: false,
    },
  ]
}
