import { sxSearchTables } from '@/app/applications/styles'
import { GenericTable, formatDateToCustomString } from '@/lib'
import { Box } from '@mui/material'

const CommitmentsAccordion = ({ dataCompromisosMesas }) => {
  const rows = dataCompromisosMesas?.map((row) => {
    return {
      id: crypto.randomUUID(),
      ...row,
    }
  })
  const columns = [
    { field: 'descripcion', headerName: 'Descripción', flex: 1 },
    {
      field: 'fecha_inicial_cumplimiento',
      headerName: 'Fecha inicial cumplimiento',
      flex: 1,
      valueGetter: (params) => `${formatDateToCustomString(params.row.fecha_inicial_cumplimiento)}`,
    },
    {
      field: 'fecha_real_cumplimiento',
      headerName: 'Fecha cumplimiento',
      flex: 1,
      valueGetter: (params) => `${formatDateToCustomString(params.row.fecha_real_cumplimiento)}`,
    },
    { field: 'mesa_identificador', headerName: 'Mesa', flex: 1 },
  ]
  return (
    <Box sx={sxSearchTables}>
      <GenericTable
        rows={rows ?? []}
        columns={columns}
      />
    </Box>
  )
}

export default CommitmentsAccordion
