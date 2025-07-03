import { ClassicIconButton, formatToLocaleDateString } from '@/libV4'
import { Edit } from '@mui/icons-material'
import { Box } from '@mui/material'

export const columnsAgreementsTable = (navigate) => {
  const handleEditAgreement = (id) => {
    navigate(`/applications/staticForms/agreements/editAgreements?module=V&agreement=${id}`)
  }
  return [
    {
      field: 'convenio',
      headerName: 'Acuerdo',
      minWidth: 200,
    },
    {
      field: 'fecha',
      headerName: 'Fecha (dd/mm/aaaa)',
      minWidth: 200,
      renderCell: (row) => formatToLocaleDateString(row?.fecha),
    },
    {
      field: 'cuotas',
      headerName: 'Cuotas',
      minWidth: 150,
    },
    {
      field: 'deuda',
      headerName: 'Deuda',
      minWidth: 150,
    },
    {
      field: 'options',
      headerName: '',
      // minWidth: 150,
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
              onClick={() => handleEditAgreement(params?.id)}
              title='Editar acuerdo'
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
