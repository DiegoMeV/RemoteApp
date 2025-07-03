import { ClassicIconButton } from '@/libV4'
import { Edit } from '@mui/icons-material'
import { Box } from '@mui/material'

export const columnsPayrollTable = (navigate) => {
  const handleEditNomina = (periodo, vinculacion, nomina) => {
    navigate(
      `/applications/staticForms/humanResources/PayrollLiquidation/editPayrollLiquidation?periodo=${periodo}&vinculacion=${vinculacion}&nomina=${nomina}`
    )
  }
  return [
    {
      field: 'periodo',
      headerName: 'Periodo',
      width: 100,
    },
    {
      field: 'vinculacion',
      headerName: 'Vinculación',
      width: 100,
    },
    {
      field: 'nomina',
      headerName: 'Nómina',
      width: 200,
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      width: 400,
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
              onClick={() => handleEditNomina(params?.periodo, params?.vinculacion, params?.nomina)}
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
